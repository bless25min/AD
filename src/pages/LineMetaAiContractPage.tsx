import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AlertTriangle, Bot, Building2, Check, CheckCircle2, Copy, FileDown, Landmark, LoaderCircle, MessagesSquare, Share2, ShieldCheck } from 'lucide-react';
import { paymentInfo } from '../content/contractTerms';
import { lineMetaAiPricing, lineMetaAiSections } from '../content/lineMetaAiContract';

type ContractParty = {
  companyName: string;
  vat: string;
  representative: string;
};

type ServicePeriod = {
  startDate: string;
  endDate: string;
};

type LineMetaAiContractPageProps = {
  shareId?: string;
};

const emptyParty: ContractParty = {
  companyName: '',
  vat: '',
  representative: '',
};

const emptyServicePeriod: ServicePeriod = {
  startDate: '',
  endDate: '',
};

const formatServiceDate = (value: string) => {
  if (!value) return '＿＿年＿＿月＿＿日';
  const [year, month, day] = value.split('-');
  return `${year} 年 ${month} 月 ${day} 日`;
};

export const LineMetaAiContractPage = ({ shareId }: LineMetaAiContractPageProps) => {
  const [party, setParty] = useState<ContractParty>({
    companyName: '',
    vat: '',
    representative: '',
  });
  const [servicePeriod, setServicePeriod] = useState<ServicePeriod>(emptyServicePeriod);
  const [loadState, setLoadState] = useState<'idle' | 'loading' | 'loaded' | 'error'>('idle');
  const [loadError, setLoadError] = useState('');
  const [isSharing, setIsSharing] = useState(false);
  const [shareError, setShareError] = useState('');
  const [shareUrl, setShareUrl] = useState('');
  const [shareMessage, setShareMessage] = useState('');
  const handlePrint = () => window.print();

  useEffect(() => {
    if (!shareId) {
      setLoadState('idle');
      return;
    }

    const controller = new AbortController();
    const loadSharedContract = async () => {
      setLoadState('loading');
      setLoadError('');
      try {
        const response = await fetch(`/api/contract-shares/${encodeURIComponent(shareId)}`, {
          signal: controller.signal,
          headers: { accept: 'application/json' },
        });
        const result = await response.json() as {
          party?: ContractParty;
          servicePeriod?: ServicePeriod;
          error?: string;
        };
        if (!response.ok || !result.party) {
          throw new Error(result.error || '分享連結無效或已過期。');
        }
        setParty(result.party);
        setServicePeriod(result.servicePeriod ?? emptyServicePeriod);
        setLoadState('loaded');
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        setParty(emptyParty);
        setServicePeriod(emptyServicePeriod);
        setLoadError(error instanceof Error ? error.message : '目前無法讀取分享連結。');
        setLoadState('error');
      }
    };

    void loadSharedContract();
    return () => controller.abort();
  }, [shareId]);

  const updateParty = (field: keyof ContractParty, value: string) => {
    setParty((current) => ({ ...current, [field]: value }));
    setShareUrl('');
    setShareError('');
    setShareMessage('');
  };

  const updateServicePeriod = (field: keyof ServicePeriod, value: string) => {
    setServicePeriod((current) => ({ ...current, [field]: value }));
    setShareUrl('');
    setShareError('');
    setShareMessage('');
  };

  const copyShareUrl = async (url: string) => {
    if (!navigator.clipboard) {
      setShareMessage('請長按或選取下方連結後複製。');
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setShareMessage('分享連結已複製。');
    } catch {
      setShareMessage('請長按或選取下方連結後複製。');
    }
  };

  const shareCreatedUrl = async (url: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'LINE / Meta 顧客對話暨 AI 業務管理系統服務合約',
          text: '已填入甲方資料的服務合約',
          url,
        });
        setShareMessage('分享面板已開啟。');
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          setShareMessage('分享已取消，連結仍保留在下方。');
          return;
        }
      }
    }
    await copyShareUrl(url);
  };

  const handleCreateShare = async () => {
    const normalizedParty = {
      companyName: party.companyName.trim(),
      vat: party.vat.trim(),
      representative: party.representative.trim(),
    };
    const normalizedServicePeriod = {
      startDate: servicePeriod.startDate.trim(),
      endDate: servicePeriod.endDate.trim(),
    };
    if (!normalizedParty.companyName) {
      setShareError('請先輸入公司名稱。');
      return;
    }
    if (!/^\d{8}$/.test(normalizedParty.vat)) {
      setShareError('統一編號必須是 8 碼數字。');
      return;
    }
    if (!normalizedParty.representative) {
      setShareError('請先輸入代表人。');
      return;
    }
    if (normalizedServicePeriod.startDate && normalizedServicePeriod.endDate
      && normalizedServicePeriod.endDate < normalizedServicePeriod.startDate) {
      setShareError('服務結束日期不得早於開始日期。');
      return;
    }

    setIsSharing(true);
    setShareError('');
    setShareMessage('');
    try {
      const response = await fetch('/api/contract-shares', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          ...normalizedParty,
          serviceStartDate: normalizedServicePeriod.startDate,
          serviceEndDate: normalizedServicePeriod.endDate,
        }),
      });
      const result = await response.json() as { url?: string; error?: string };
      if (!response.ok || !result.url) {
        throw new Error(result.error || '目前無法建立分享連結。');
      }
      setParty(normalizedParty);
      setServicePeriod(normalizedServicePeriod);
      setShareUrl(result.url);
      await shareCreatedUrl(result.url);
    } catch (error) {
      setShareError(error instanceof Error ? error.message : '目前無法建立分享連結，請稍後再試。');
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07111f] text-slate-200 pb-24 print:bg-white print:text-slate-950">
      <style>{`
        @media print {
          body, #root { background: white !important; max-width: none !important; box-shadow: none !important; }
          .contract-print { max-width: none !important; padding: 0 !important; }
          .contract-card { background: white !important; color: #0f172a !important; border-color: #cbd5e1 !important; box-shadow: none !important; }
          .contract-card * { color: #0f172a !important; border-color: #cbd5e1 !important; }
          .print-hide { display: none !important; }
          .print-section { break-inside: avoid; }
          @page { margin: 1.4cm; }
        }
      `}</style>

      <header className="print-hide sticky top-0 z-30 border-b border-white/10 bg-[#07111f]/95 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-5 py-4">
          <div className="flex min-w-0 items-center gap-2 text-sm font-bold text-white">
            <ShieldCheck className="h-5 w-5 shrink-0 text-brand-400" />
            <span className="truncate">貳拾伍數據顧問｜服務合約</span>
          </div>
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-brand-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-brand-400"
          >
            <FileDown className="h-4 w-4" />
            列印／存成 PDF
          </button>
        </div>
      </header>

      <main className="contract-print mx-auto max-w-4xl px-4 pt-8">
        {loadState === 'loading' && (
          <div className="print-hide mb-6 flex items-center gap-3 rounded-2xl border border-brand-500/25 bg-brand-500/10 p-4 text-sm text-slate-200" role="status">
            <LoaderCircle className="h-5 w-5 animate-spin text-brand-400" />
            正在載入分享的合約資料…
          </div>
        )}
        {loadState === 'loaded' && (
          <div className="print-hide mb-6 flex items-start gap-3 rounded-2xl border border-emerald-400/25 bg-emerald-500/10 p-4 text-sm leading-6 text-emerald-100">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
            已載入分享資料。你可在本頁調整內容；修改不會改寫原分享連結，再按一次分享會建立新連結。
          </div>
        )}
        {loadState === 'error' && (
          <div className="print-hide mb-6 flex items-start gap-3 rounded-2xl border border-rose-400/25 bg-rose-500/10 p-4 text-sm leading-6 text-rose-100" role="alert">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-rose-400" />
            <div>
              <p className="font-bold">{loadError}</p>
              <a className="mt-2 inline-block font-bold text-white underline underline-offset-4" href="/contract/line-meta-ai">開啟空白合約</a>
            </div>
          </div>
        )}
        <section className="print-hide mb-6 rounded-3xl border border-brand-500/25 bg-slate-950 p-5 shadow-xl shadow-black/20">
          <div className="mb-5">
            <p className="text-xs font-bold tracking-[0.18em] text-accent-400">甲方資料</p>
            <h2 className="mt-2 text-xl font-black text-white">填寫後會同步到下方合約</h2>
            <p className="mt-2 text-xs leading-6 text-slate-400">未按分享前，資料只留在目前頁面。建立分享連結後，公司資料與服務期間會保存 12 個月。</p>
          </div>
          <div className="grid gap-4">
            <label className="grid gap-2 text-sm font-bold text-slate-300">
              公司名稱
              <input
                name="companyName"
                value={party.companyName}
                onChange={(event) => updateParty('companyName', event.target.value)}
                placeholder="請輸入公司或商號名稱"
                autoComplete="organization"
                maxLength={100}
                disabled={loadState === 'loading'}
                className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-base text-white outline-none transition placeholder:text-slate-600 focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20"
              />
            </label>
            <label className="grid gap-2 text-sm font-bold text-slate-300">
              統一編號
              <input
                name="vat"
                value={party.vat}
                onChange={(event) => updateParty('vat', event.target.value.replace(/\D/g, ''))}
                placeholder="請輸入 8 碼統一編號"
                inputMode="numeric"
                maxLength={8}
                disabled={loadState === 'loading'}
                className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-base text-white outline-none transition placeholder:text-slate-600 focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20"
              />
            </label>
            <label className="grid gap-2 text-sm font-bold text-slate-300">
              代表人
              <input
                name="representative"
                value={party.representative}
                onChange={(event) => updateParty('representative', event.target.value)}
                placeholder="請輸入公司代表人姓名"
                autoComplete="name"
                maxLength={50}
                disabled={loadState === 'loading'}
                className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-base text-white outline-none transition placeholder:text-slate-600 focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20"
              />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-bold text-slate-300">
                服務開始日期
                <input
                  type="date"
                  name="serviceStartDate"
                  value={servicePeriod.startDate}
                  onChange={(event) => updateServicePeriod('startDate', event.target.value)}
                  disabled={loadState === 'loading'}
                  className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-base text-white outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20"
                />
              </label>
              <label className="grid gap-2 text-sm font-bold text-slate-300">
                服務結束日期
                <input
                  type="date"
                  name="serviceEndDate"
                  value={servicePeriod.endDate}
                  min={servicePeriod.startDate || undefined}
                  onChange={(event) => updateServicePeriod('endDate', event.target.value)}
                  disabled={loadState === 'loading'}
                  className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-base text-white outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20"
                />
              </label>
            </div>
          </div>
          <div className="mt-5 border-t border-white/10 pt-5">
            <button
              type="button"
              onClick={handleCreateShare}
              disabled={isSharing || loadState === 'loading'}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-accent-500 px-5 py-4 font-black text-slate-950 transition hover:bg-accent-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSharing ? <LoaderCircle className="h-5 w-5 animate-spin" /> : <Share2 className="h-5 w-5" />}
              {isSharing ? '正在建立連結…' : '建立分享連結'}
            </button>
            <p className="mt-3 text-center text-xs leading-6 text-slate-400">連結有效 12 個月；任何取得連結的人可查看公司名稱、統編、代表人與服務期間。</p>
            {shareError && <p className="mt-3 rounded-xl bg-rose-500/10 p-3 text-sm font-bold text-rose-300" role="alert">{shareError}</p>}
            {shareUrl && (
              <div className="mt-4 rounded-2xl border border-emerald-400/25 bg-emerald-500/10 p-4">
                <label className="grid gap-2 text-xs font-bold text-emerald-200">
                  已建立分享連結
                  <input
                    readOnly
                    value={shareUrl}
                    onFocus={(event) => event.currentTarget.select()}
                    className="w-full rounded-xl border border-emerald-400/20 bg-slate-950 px-3 py-2.5 font-mono text-xs text-white outline-none"
                  />
                </label>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <button type="button" onClick={() => copyShareUrl(shareUrl)} className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-3 py-2.5 text-sm font-bold text-white hover:bg-white/5">
                    <Copy className="h-4 w-4" />複製連結
                  </button>
                  <button type="button" onClick={() => shareCreatedUrl(shareUrl)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-3 py-2.5 text-sm font-black text-slate-950 hover:bg-emerald-300">
                    <Share2 className="h-4 w-4" />再次分享
                  </button>
                </div>
                {shareMessage && <p className="mt-3 text-xs font-bold text-emerald-200" role="status">{shareMessage}</p>}
              </div>
            )}
          </div>
        </section>

        <article className="contract-card overflow-hidden rounded-3xl border border-white/10 bg-slate-950 shadow-2xl shadow-black/30">
          <section className="relative overflow-hidden border-b border-white/10 px-6 py-10">
            <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-brand-500/20 blur-3xl" />
            <div className="relative">
              <div className="mb-5 flex items-center gap-3 text-brand-400">
                <MessagesSquare className="h-7 w-7" />
                <Bot className="h-7 w-7" />
              </div>
              <p className="mb-2 text-sm font-bold tracking-[0.22em] text-accent-400">年度統包方案</p>
              <h1 className="text-3xl font-black leading-tight text-white">
                LINE / Meta 顧客對話暨 AI 業務管理系統
              </h1>
              <p className="mt-4 text-lg font-bold text-slate-300">服務合約書</p>
            </div>
          </section>

          <section className="grid gap-5 border-b border-white/10 px-6 py-8">
            <div className="flex items-start gap-3">
              <Building2 className="mt-1 h-5 w-5 shrink-0 text-brand-400" />
              <div className="space-y-2 text-sm leading-7 text-slate-300">
                <p><span className="font-bold text-white">立約人（甲方）：</span>{party.companyName || '________________________'}</p>
                <p><span className="font-bold text-white">立約人（乙方）：</span>貳拾伍數據顧問企業社</p>
              </div>
            </div>
            <p className="rounded-2xl border border-brand-500/25 bg-brand-500/10 p-4 text-sm leading-7 text-slate-300">
              甲乙雙方就「LINE / Meta 顧客對話暨 AI 業務管理系統」之導入、使用、持續客製開發與維運服務，約定以下合作內容與範圍。
            </p>
          </section>

          <section className="print-section border-b border-white/10 px-6 py-9">
            <div className="mb-6 flex items-center justify-between gap-4">
              <h2 className="text-xl font-black text-white">一、服務方案與費用</h2>
              <span className="rounded-full bg-accent-500/15 px-3 py-1 text-xs font-bold text-accent-400">服務期間：12 個月</span>
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/10">
              {lineMetaAiPricing.map((row) => (
                <div
                  key={row.item}
                  className={`flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3.5 last:border-b-0 ${row.total ? 'bg-brand-500/20' : row.highlighted ? 'bg-white/[0.04]' : ''}`}
                >
                  <span className={`text-sm ${row.total ? 'font-black text-white' : 'text-slate-300'}`}>{row.item}</span>
                  <span className={`shrink-0 text-right text-sm ${row.total ? 'text-lg font-black text-accent-400' : 'font-bold text-white'}`}>{row.price}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm font-bold text-accent-400">
              服務期間：自 {formatServiceDate(servicePeriod.startDate)} 起至 {formatServiceDate(servicePeriod.endDate)} 止，共 12 個月。
            </p>
          </section>

          <section className="print-section border-b border-white/10 px-6 py-9">
            <div className="mb-5 flex items-center gap-3">
              <Landmark className="h-6 w-6 text-brand-400" />
              <h2 className="text-xl font-black text-white">匯款資訊</h2>
            </div>
            <div className="grid gap-4 rounded-2xl border border-brand-500/25 bg-brand-500/10 p-5 text-sm leading-7 text-slate-300">
              <p><span className="font-bold text-white">收款銀行：</span>{paymentInfo.bankCode} {paymentInfo.bankName}</p>
              <p><span className="font-bold text-white">匯款帳號：</span><span className="font-mono text-base font-black tracking-wider text-accent-400">{paymentInfo.accountNumber}</span></p>
              <p><span className="font-bold text-white">收款戶名：</span>{paymentInfo.accountName}</p>
              <p><span className="font-bold text-white">本期含稅金額：</span>NT$315,000</p>
              <p><span className="font-bold text-white">付款方式：</span>年度費用一次支付。</p>
            </div>
            <p className="mt-4 text-xs leading-6 text-slate-400">年度費用採一次支付，甲方應於本合約簽訂後 7 日內完成付款，並提供匯款帳號後五碼供乙方核對。</p>
          </section>

          <div className="space-y-0">
            {lineMetaAiSections.map((section) => (
              <section key={section.title} className="print-section border-b border-white/10 px-6 py-9 last:border-b-0">
                <h2 className="mb-5 text-xl font-black text-white">{section.title}</h2>
                {section.intro && <p className="mb-5 text-sm leading-7 text-slate-300">{section.intro}</p>}
                {section.emphasis && (
                  <p className="mb-5 rounded-2xl border border-accent-400/25 bg-accent-500/10 p-4 text-sm leading-7 text-slate-300">
                    <strong className="text-base font-black text-accent-400">{section.emphasis}</strong>
                    {section.emphasisSuffix}
                  </p>
                )}
                {section.description && <p className="mb-5 text-sm leading-7 text-slate-300">{section.description}</p>}

                {section.groups && (
                  <div className="space-y-6">
                    {section.groups.map((group) => (
                      <div key={group.title}>
                        <h3 className="mb-3 font-bold text-brand-400">{group.title}</h3>
                        <ul className="grid gap-2">
                          {group.items.map((item) => (
                            <li key={item} className="flex gap-2.5 text-sm leading-6 text-slate-300">
                              <Check className="mt-1 h-4 w-4 shrink-0 text-accent-400" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                        {group.note && <p className="mt-3 rounded-xl bg-white/[0.04] p-3 text-xs leading-6 text-slate-400">{group.note}</p>}
                      </div>
                    ))}
                  </div>
                )}

                {section.items && (
                  <ul className="grid gap-2">
                    {section.items.map((item) => (
                      <li key={item} className="flex gap-2.5 text-sm leading-6 text-slate-300">
                        <Check className="mt-1 h-4 w-4 shrink-0 text-accent-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {section.note && <p className="mt-4 rounded-xl border-l-2 border-accent-400 bg-accent-500/5 p-3 text-xs leading-6 text-slate-400">{section.note}</p>}
              </section>
            ))}
          </div>

          <section className="print-section bg-white/[0.03] px-6 py-10">
            <h2 className="mb-8 text-center text-xl font-black text-white">立約人</h2>
            <div className="grid gap-8 text-sm leading-8 text-slate-300">
              <div className="space-y-3">
                <p>甲方：<strong className="text-white">{party.companyName || '________________________'}</strong></p>
                <p>統一編號：{party.vat || '____________________'}</p>
                <p>代表人：{party.representative || '______________________'}</p>
              </div>
              <div className="space-y-3">
                <p>乙方：<strong className="text-white">貳拾伍數據顧問企業社</strong></p>
                <p>統一編號：79808871</p>
                <p>代表人：廖天佑</p>
              </div>
            </div>
            <p className="mt-10 text-center text-sm tracking-widest text-slate-400">中華民國 ______ 年 ______ 月 ______ 日</p>
          </section>
        </article>

        <button
          type="button"
          onClick={handlePrint}
          className="print-hide mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-500 px-5 py-4 font-black text-white shadow-lg shadow-brand-500/20 transition hover:bg-brand-400"
        >
          <FileDown className="h-5 w-5" />
          列印合約／另存為 PDF
        </button>
      </main>
    </div>
  );
};

export const SharedLineMetaAiContractPage = () => {
  const { shareId } = useParams<{ shareId: string }>();
  return <LineMetaAiContractPage shareId={shareId} />;
};

