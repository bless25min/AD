import {
  CONTRACT_SHARE_ID_PATTERN,
  type ContractShareRecord,
  contractShareKey,
  validateContractParty,
  validateServicePeriod,
} from '../../lib/contractShare';

const JSON_HEADERS = {
  'cache-control': 'no-store',
  'content-type': 'application/json; charset=utf-8',
};

const jsonResponse = (body: unknown, status: number) => new Response(JSON.stringify(body), {
  status,
  headers: JSON_HEADERS,
});

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const id = context.params.id;
  if (typeof id !== 'string' || !CONTRACT_SHARE_ID_PATTERN.test(id)) {
    return jsonResponse({ error: '分享連結無效或已過期。' }, 404);
  }

  let stored: string | null;
  try {
    stored = await context.env.CONTRACT_SHARES.get(contractShareKey(id));
  } catch (error) {
    console.error(JSON.stringify({
      message: 'contract share read failed',
      error: error instanceof Error ? error.message : String(error),
    }));
    return jsonResponse({ error: '目前無法讀取分享連結，請稍後再試。' }, 500);
  }

  if (!stored) {
    return jsonResponse({ error: '分享連結無效或已過期。' }, 404);
  }

  try {
    const record = JSON.parse(stored) as ContractShareRecord;
    const validation = validateContractParty(record?.party);
    const periodValidation = validateServicePeriod(record?.servicePeriod);
    if (!validation.ok || !periodValidation.ok || typeof record.expiresAt !== 'string') {
      throw new Error('invalid record');
    }

    return jsonResponse({
      party: validation.party,
      servicePeriod: periodValidation.servicePeriod,
      expiresAt: record.expiresAt,
    }, 200);
  } catch (error) {
    console.error(JSON.stringify({
      message: 'contract share record invalid',
      error: error instanceof Error ? error.message : String(error),
    }));
    return jsonResponse({ error: '目前無法讀取分享連結，請稍後再試。' }, 500);
  }
};

