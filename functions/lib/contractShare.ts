export const CONTRACT_SHARE_TTL_SECONDS = 31_536_000;
export const CONTRACT_SHARE_ID_PATTERN = /^[A-Za-z0-9_-]{22}$/;

export type ContractParty = {
  companyName: string;
  vat: string;
  representative: string;
};

export type ServicePeriod = {
  startDate: string;
  endDate: string;
};

export type ContractShareRecord = {
  party: ContractParty;
  servicePeriod?: ServicePeriod;
  createdAt: string;
  expiresAt: string;
};

type ValidationResult =
  | { ok: true; party: ContractParty }
  | { ok: false; error: string };

type ServicePeriodValidationResult =
  | { ok: true; servicePeriod: ServicePeriod }
  | { ok: false; error: string };

type ContractShareValidationResult =
  | { ok: true; party: ContractParty; servicePeriod: ServicePeriod }
  | { ok: false; error: string };

const normalizeText = (value: unknown) => typeof value === 'string' ? value.trim() : '';
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

const isValidIsoDate = (value: string) => {
  if (!ISO_DATE_PATTERN.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
};

export const validateContractParty = (input: unknown): ValidationResult => {
  if (!input || typeof input !== 'object') {
    return { ok: false, error: '請填寫完整的甲方資料。' };
  }

  const data = input as Record<string, unknown>;
  const party: ContractParty = {
    companyName: normalizeText(data.companyName),
    vat: normalizeText(data.vat),
    representative: normalizeText(data.representative),
  };

  if (!party.companyName) {
    return { ok: false, error: '請輸入公司名稱。' };
  }
  if (party.companyName.length > 100) {
    return { ok: false, error: '公司名稱不可超過 100 個字。' };
  }
  if (!/^\d{8}$/.test(party.vat)) {
    return { ok: false, error: '統一編號必須是 8 碼數字。' };
  }
  if (!party.representative) {
    return { ok: false, error: '請輸入代表人。' };
  }
  if (party.representative.length > 50) {
    return { ok: false, error: '代表人不可超過 50 個字。' };
  }

  return { ok: true, party };
};

export const validateServicePeriod = (input: unknown): ServicePeriodValidationResult => {
  const data = input && typeof input === 'object'
    ? input as Record<string, unknown>
    : {};
  const servicePeriod: ServicePeriod = {
    startDate: normalizeText(data.startDate ?? data.serviceStartDate),
    endDate: normalizeText(data.endDate ?? data.serviceEndDate),
  };

  if (servicePeriod.startDate && !isValidIsoDate(servicePeriod.startDate)) {
    return { ok: false, error: '服務開始日期格式錯誤。' };
  }
  if (servicePeriod.endDate && !isValidIsoDate(servicePeriod.endDate)) {
    return { ok: false, error: '服務結束日期格式錯誤。' };
  }
  if (servicePeriod.startDate && servicePeriod.endDate && servicePeriod.endDate < servicePeriod.startDate) {
    return { ok: false, error: '服務結束日期不得早於開始日期。' };
  }

  return { ok: true, servicePeriod };
};

export const validateContractShareInput = (input: unknown): ContractShareValidationResult => {
  const partyValidation = validateContractParty(input);
  if (!partyValidation.ok) return partyValidation;

  const periodValidation = validateServicePeriod(input);
  if (!periodValidation.ok) return periodValidation;

  return {
    ok: true,
    party: partyValidation.party,
    servicePeriod: periodValidation.servicePeriod,
  };
};

export const createContractShareId = (): string => {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
  let output = '';
  let buffer = 0;
  let bitCount = 0;

  for (const byte of bytes) {
    buffer = (buffer << 8) | byte;
    bitCount += 8;
    while (bitCount >= 6) {
      bitCount -= 6;
      output += alphabet[(buffer >>> bitCount) & 63];
    }
  }

  if (bitCount > 0) {
    output += alphabet[(buffer << (6 - bitCount)) & 63];
  }

  return output;
};

export const contractShareKey = (id: string) => `contract-share:${id}`;

export const createContractShareRecord = (
  party: ContractParty,
  servicePeriod: ServicePeriod = { startDate: '', endDate: '' },
  now = new Date(),
): ContractShareRecord => ({
  party,
  servicePeriod,
  createdAt: now.toISOString(),
  expiresAt: new Date(now.getTime() + CONTRACT_SHARE_TTL_SECONDS * 1000).toISOString(),
});

