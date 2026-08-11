import assert from 'node:assert/strict';
import test from 'node:test';
import { createServer } from 'vite';

const createMockKv = () => {
  const values = new Map();
  const puts = [];

  return {
    values,
    puts,
    async get(key) {
      return values.get(key) ?? null;
    },
    async put(key, value, options) {
      puts.push({ key, value, options });
      values.set(key, value);
    },
  };
};

const createContext = (request, kv, params = {}) => ({
  request,
  env: { CONTRACT_SHARES: kv },
  params,
});

test('contract share API stores only validated party fields for 12 months', async () => {
  const vite = await createServer({ server: { middlewareMode: true, hmr: false }, appType: 'custom', optimizeDeps: { noDiscovery: true } });

  try {
    const { onRequestPost } = await vite.ssrLoadModule('/functions/api/contract-shares/index.ts');
    const kv = createMockKv();
    const request = new Request('https://ad.25min.co/api/contract-shares', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        companyName: ' 測試股份有限公司 ',
        vat: '12345678',
        representative: ' 王小明 ',
        serviceStartDate: '2026-09-01',
        serviceEndDate: '2027-08-31',
        address: '不應被儲存',
      }),
    });

    const response = await onRequestPost(createContext(request, kv));
    const result = await response.json();

    assert.equal(response.status, 201);
    assert.match(result.id, /^[A-Za-z0-9_-]{22}$/);
    assert.equal(result.url, `https://ad.25min.co/c/${result.id}`);
    assert.equal(kv.puts.length, 1);
    assert.equal(kv.puts[0].key, `contract-share:${result.id}`);
    assert.deepEqual(kv.puts[0].options, { expirationTtl: 31_536_000 });

    const stored = JSON.parse(kv.puts[0].value);
    assert.deepEqual(stored.party, {
      companyName: '測試股份有限公司',
      vat: '12345678',
      representative: '王小明',
    });
    assert.equal('address' in stored.party, false);
    assert.deepEqual(stored.servicePeriod, {
      startDate: '2026-09-01',
      endDate: '2027-08-31',
    });
    assert.equal(response.headers.get('cache-control'), 'no-store');
  } finally {
    await vite.close();
  }
});

test('contract share API rejects invalid party data without writing KV', async () => {
  const vite = await createServer({ server: { middlewareMode: true, hmr: false }, appType: 'custom', optimizeDeps: { noDiscovery: true } });

  try {
    const { onRequestPost } = await vite.ssrLoadModule('/functions/api/contract-shares/index.ts');
    const kv = createMockKv();
    const request = new Request('https://ad.25min.co/api/contract-shares', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ companyName: '測試公司', vat: '123', representative: '王小明' }),
    });

    const response = await onRequestPost(createContext(request, kv));
    const result = await response.json();

    assert.equal(response.status, 400);
    assert.match(result.error, /統一編號/);
    assert.equal(kv.puts.length, 0);
  } finally {
    await vite.close();
  }
});

test('contract share API reads an existing record and returns 404 for a missing one', async () => {
  const vite = await createServer({ server: { middlewareMode: true, hmr: false }, appType: 'custom', optimizeDeps: { noDiscovery: true } });

  try {
    const { onRequestGet } = await vite.ssrLoadModule('/functions/api/contract-shares/[id].ts');
    const kv = createMockKv();
    const id = 'AbCdEfGhIjKlMnOpQrStUv';
    kv.values.set(`contract-share:${id}`, JSON.stringify({
      party: { companyName: '測試公司', vat: '12345678', representative: '王小明' },
      servicePeriod: { startDate: '2026-09-01', endDate: '2027-08-31' },
      createdAt: '2026-08-10T00:00:00.000Z',
      expiresAt: '2027-08-10T00:00:00.000Z',
    }));

    const found = await onRequestGet(createContext(
      new Request(`https://ad.25min.co/api/contract-shares/${id}`),
      kv,
      { id },
    ));
    const foundResult = await found.json();
    assert.equal(found.status, 200);
    assert.deepEqual(foundResult.party, {
      companyName: '測試公司',
      vat: '12345678',
      representative: '王小明',
    });
    assert.deepEqual(foundResult.servicePeriod, {
      startDate: '2026-09-01',
      endDate: '2027-08-31',
    });
    assert.equal(found.headers.get('cache-control'), 'no-store');

    const missingId = 'ZyXwVuTsRqPoNmLkJiHgFe';
    const missing = await onRequestGet(createContext(
      new Request(`https://ad.25min.co/api/contract-shares/${missingId}`),
      kv,
      { id: missingId },
    ));
    assert.equal(missing.status, 404);
  } finally {
    await vite.close();
  }
});

test('contract share API keeps old links compatible and rejects an invalid service period', async () => {
  const vite = await createServer({ server: { middlewareMode: true, hmr: false }, appType: 'custom', optimizeDeps: { noDiscovery: true } });

  try {
    const { onRequestPost } = await vite.ssrLoadModule('/functions/api/contract-shares/index.ts');
    const { onRequestGet } = await vite.ssrLoadModule('/functions/api/contract-shares/[id].ts');
    const kv = createMockKv();
    const oldId = 'LmNoPqRsTuVwXyZaBcDeFg';
    kv.values.set(`contract-share:${oldId}`, JSON.stringify({
      party: { companyName: '舊資料公司', vat: '12345678', representative: '王小明' },
      createdAt: '2026-08-10T00:00:00.000Z',
      expiresAt: '2027-08-10T00:00:00.000Z',
    }));

    const oldResponse = await onRequestGet(createContext(
      new Request(`https://ad.25min.co/api/contract-shares/${oldId}`),
      kv,
      { id: oldId },
    ));
    const oldResult = await oldResponse.json();
    assert.equal(oldResponse.status, 200);
    assert.deepEqual(oldResult.servicePeriod, { startDate: '', endDate: '' });

    const invalidRequest = new Request('https://ad.25min.co/api/contract-shares', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        companyName: '測試公司',
        vat: '12345678',
        representative: '王小明',
        serviceStartDate: '2027-09-01',
        serviceEndDate: '2026-08-31',
      }),
    });
    const invalidResponse = await onRequestPost(createContext(invalidRequest, kv));
    const invalidResult = await invalidResponse.json();
    assert.equal(invalidResponse.status, 400);
    assert.match(invalidResult.error, /服務結束日期不得早於開始日期/);
  } finally {
    await vite.close();
  }
});

