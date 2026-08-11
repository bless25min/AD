import {
  CONTRACT_SHARE_TTL_SECONDS,
  contractShareKey,
  createContractShareId,
  createContractShareRecord,
  validateContractShareInput,
} from '../../lib/contractShare';

const MAX_BODY_BYTES = 2_048;
const JSON_HEADERS = {
  'cache-control': 'no-store',
  'content-type': 'application/json; charset=utf-8',
};

const jsonResponse = (body: unknown, status: number) => new Response(JSON.stringify(body), {
  status,
  headers: JSON_HEADERS,
});

const readBoundedJson = async (request: Request): Promise<unknown> => {
  const contentType = request.headers.get('content-type') ?? '';
  if (!contentType.toLowerCase().includes('application/json')) {
    throw new Error('請使用 JSON 格式送出資料。');
  }

  const declaredLength = Number(request.headers.get('content-length') ?? 0);
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    throw new Error('送出的資料過大。');
  }

  if (!request.body) {
    throw new Error('請填寫完整的甲方資料。');
  }

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let received = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    received += value.byteLength;
    if (received > MAX_BODY_BYTES) {
      await reader.cancel();
      throw new Error('送出的資料過大。');
    }
    chunks.push(value);
  }

  const bytes = new Uint8Array(received);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  try {
    return JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    throw new Error('JSON 格式無法解析。');
  }
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  let input: unknown;
  try {
    input = await readBoundedJson(context.request);
  } catch (error) {
    return jsonResponse({ error: error instanceof Error ? error.message : '資料格式錯誤。' }, 400);
  }

  const validation = validateContractShareInput(input);
  if (!validation.ok) {
    return jsonResponse({ error: validation.error }, 400);
  }

  const id = createContractShareId();
  const record = createContractShareRecord(validation.party, validation.servicePeriod);

  try {
    await context.env.CONTRACT_SHARES.put(
      contractShareKey(id),
      JSON.stringify(record),
      { expirationTtl: CONTRACT_SHARE_TTL_SECONDS },
    );
  } catch (error) {
    console.error(JSON.stringify({
      message: 'contract share write failed',
      error: error instanceof Error ? error.message : String(error),
    }));
    return jsonResponse({ error: '目前無法建立分享連結，請稍後再試。' }, 500);
  }

  const origin = new URL(context.request.url).origin;
  return jsonResponse({
    id,
    url: `${origin}/c/${id}`,
    expiresAt: record.expiresAt,
  }, 201);
};

