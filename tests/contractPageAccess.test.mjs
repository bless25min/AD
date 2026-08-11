import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('一般合約與成果分潤合約可以匿名直接開啟', async () => {
  const [app, contract] = await Promise.all([
    read('src/App.tsx'),
    read('src/pages/ContractPage.tsx'),
  ]);

  assert.match(app, /path="\/contract" element={<ContractPage \/>}/);
  assert.match(contract, /searchParams\.get\('type'\)/);
  assert.match(contract, /'standard' \| 'profit-share'/);
  assert.match(contract, /成交優化與廣告成長合作合約書/);
  assert.match(contract, /成果分潤合作合約書/);

  assert.doesNotMatch(contract, /useLiff/);
  assert.doesNotMatch(contract, /if \(isInitializing\)/);
  assert.doesNotMatch(contract, /if \(!isLoggedIn\)/);
  assert.doesNotMatch(contract, /導向 LINE 登入|數位簽章授權|合約系統驗證中/);
});

test('匿名開啟不會把 LINE 合約通知改成公開呼叫', async () => {
  const contract = await read('src/pages/ContractPage.tsx');

  assert.match(contract, /if \(isLoggedIn && profile\?\.userId\)/);
  assert.match(contract, /fetch\('\/api\/notify-contract'/);
});

test('LINE Meta AI 合約深層網址有獨立頁面與分享網址路由', async () => {
  const app = await read('src/App.tsx');

  assert.match(app, /LineMetaAiContractPage/);
  assert.match(app, /path="\/contract\/line-meta-ai" element={<LineMetaAiContractPage \/>}/);
  assert.match(app, /path="\/c\/:shareId" element={<SharedLineMetaAiContractPage \/>}/);
});
