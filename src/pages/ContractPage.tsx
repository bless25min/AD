import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Copy, ShieldCheck, Building2, User, FileText, Download, Loader2, Phone } from 'lucide-react';
import { getContractTerms, paymentInfo } from '../content/contractTerms';
import { useLiff } from '../hooks/useLiff';
import { useAppStore } from '../store/useAppStore';




export const ContractPage = () => {
  const [searchParams] = useSearchParams();
  const { isInitializing } = useLiff();
  const { isLoggedIn, profile } = useAppStore();


  // LINE Tag 轉換追蹤代碼 (載入合約頁即視為轉換)
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any)._lt) {
      (window as any)._lt('send', 'cv', {
        type: 'Conversion'
      }, ['2eb550c6-34c8-4379-8ffa-677e5e51038f']);
    }
  }, []);
  const formatTwDate = (dateStr: string) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
  };

  const calcEndDate = (startDateStr: string, monthsStr: string) => {
    if (!startDateStr || !monthsStr) return '';
    const d = new Date(startDateStr);
    d.setMonth(d.getMonth() + parseInt(monthsStr, 10));
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
  };

  // Form State
  const [formData, setFormData] = useState({
    companyName: searchParams.get('companyName') || '',
    vat: searchParams.get('vat') || '',
    representative: searchParams.get('representative') || '',
    contactName: searchParams.get('contactName') || '',
    contactPhone: searchParams.get('contactPhone') || '',
    months: searchParams.get('months') || '6',
    startDate: searchParams.get('startDate') 
      ? new Date(searchParams.get('startDate')!).toISOString().split('T')[0] 
      : new Date().toISOString().split('T')[0],
  });

  const deriveAmount = (m: string) => {
    const num = parseInt(m, 10);
    if (num === 1) return '90,000';
    if (num === 3) return '80,000';
    if (num >= 6) return '70,000';
    return searchParams.get('amount') || '70,000';
  };

  const contractParams = {
    amount: searchParams.get('amount') || deriveAmount(formData.months),
    months: formData.months,
    project: searchParams.get('project') || '社群內容產製與行銷顧問',
    startDate: formatTwDate(formData.startDate),
    endDate: calcEndDate(formData.startDate, formData.months),
    companyName: formData.companyName || '下附數位簽署人',
  };

  const terms = getContractTerms(contractParams);

  const [isAgreed, setIsAgreed] = useState(false);
  const [isSigned, setIsSigned] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName || !formData.representative || !isAgreed) return;
    
    // Lock the form and show payment
    setIsSigned(true);

    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Purchase', { 
        currency: 'TWD', 
        value: parseInt(contractParams.amount.replace(/,/g, ''), 10) 
      });
    }

    // Generate permanent contract link
    const queryParams = new URLSearchParams({
      months: formData.months,
      startDate: formData.startDate,
      companyName: formData.companyName,
      vat: formData.vat,
      representative: formData.representative,
      contactName: formData.contactName,
      contactPhone: formData.contactPhone
    });
    const contractUrl = `${window.location.origin}${window.location.pathname}?${queryParams.toString()}`;
    
    // Scroll to payment card
    setTimeout(() => {
      document.getElementById('payment-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);

    // Notify backend
    if (isLoggedIn && profile?.userId) {
      try {
        await fetch('/api/notify-contract', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: profile.userId,
            companyName: formData.companyName,
            contactName: formData.contactName,
            contactPhone: formData.contactPhone,
            startDate: contractParams.startDate,
            endDate: contractParams.endDate,
            amount: contractParams.amount,
            contractUrl: contractUrl
          })
        });
      } catch (err) {
        console.error('Failed to send notification:', err);
      }
    }
  };

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(paymentInfo.accountNumber);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = paymentInfo.accountNumber;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Clipboard error:', err);
      alert("複製失敗，請手動複製帳號：\n" + paymentInfo.accountNumber);
    }
  };

  const handlePrintPdf = () => {
    window.print();
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-[#0a0f18] flex flex-col items-center justify-center p-4">
        <Loader2 className="w-10 h-10 text-brand-500 animate-spin mb-4" />
        <h1 className="text-xl font-medium text-slate-200">合約系統驗證中...</h1>
        <p className="text-sm text-slate-400 mt-2">正在讀取您的 LINE 數位簽章授權</p>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0a0f18] flex flex-col items-center justify-center p-4">
        <Loader2 className="w-10 h-10 text-brand-500 animate-spin mb-4" />
        <h1 className="text-xl font-medium text-slate-200">請稍候...</h1>
        <p className="text-sm text-slate-400 mt-2">正在導向 LINE 登入以確保合約安全性</p>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @media print {
          body {
            background-color: white !important;
            color: black !important;
            margin: 0;
            padding: 0;
          }
          body * {
            visibility: hidden;
          }
          #contract-document, #contract-document * {
            visibility: visible;
          }
          #contract-document {
            position: absolute;
            left: 0;
            top: 0;
            width: 100vw !important;
            padding: 2cm !important;
            background: white !important;
            color: black !important;
            border: none !important;
            box-shadow: none !important;
          }
          #contract-document p, 
          #contract-document h1, 
          #contract-document h3, 
          #contract-document span,
          #contract-document div {
            color: black !important;
            border-color: #333 !important;
          }
          #contract-document section {
            page-break-inside: avoid;
            margin-bottom: 24px;
          }
          .print-hide {
            display: none !important;
          }
          @page {
            margin: 0;
          }
        }
      `}</style>
      <div className="min-h-screen bg-[#0a0f18] text-slate-200 font-sans selection:bg-brand-500 selection:text-white pb-32">
        {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center text-brand-400 font-bold text-xl">
            <ShieldCheck className="w-6 h-6 mr-2" />
            成交優化與廣告成長合作合約書
          </div>
          {isSigned && (
            <div className="flex items-center text-[#00B900] text-sm font-bold bg-[#00B900]/10 px-3 py-1 rounded-full border border-[#00B900]/20">
              <CheckCircle2 className="w-4 h-4 mr-1.5" /> 合約已為您準備就緒
            </div>
          )}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        <div className="flex flex-col-reverse gap-8">
          {/* Document Container */}
          <div id="contract-document" className="bg-slate-900 border border-slate-700/60 rounded-2xl shadow-2xl overflow-hidden relative">
          
          <div className="p-8 sm:p-12 border-b border-slate-800">
            <h1 className="text-3xl md:text-4xl font-black text-white mb-8 text-center tracking-wide">
              成交優化與廣告成長合作合約書
            </h1>
            <div className="flex flex-col md:flex-row justify-between text-slate-400 text-lg mb-8 font-medium space-y-4 md:space-y-0">
              <div>立約人 (甲方)：{formData.companyName || '下附數位簽署人'}</div>
              <div>立約人 (乙方)：貳拾伍數據顧問企業社</div>
            </div>
            <p className="text-slate-300 leading-relaxed mb-8">
              甲方茲與乙方簽訂成交優化與廣告成長合作，為保障雙方權利與確認雙方義務，特立本合約，並同意訂定下列服務條款：
            </p>
          </div>

          <div className="p-8 sm:p-12 bg-[#0d131f]">
            <div className="space-y-12">
              {terms.map((term, idx) => (
                <section key={idx}>
                  <h3 className="text-xl font-bold text-slate-100 mb-4 tracking-wide">{term.title}</h3>
                  <p className="text-slate-400 leading-relaxed whitespace-pre-line text-[1.05rem]">
                    {term.content}
                  </p>
                </section>
              ))}
            </div>
            <div className="mt-20 pt-12 border-t-2 border-slate-700">
              <h3 className="text-xl font-bold text-white mb-10 text-center tracking-widest">立約人</h3>
              
              <div className="flex flex-col md:flex-row justify-between gap-16 text-slate-300">
                <div className="flex-1 space-y-8">
                  <div className="flex items-end border-b border-slate-700 pb-2">
                    <span className="w-24 shrink-0 text-slate-400">甲方：</span>
                    <span className="flex-1 font-bold text-white text-lg">{formData.companyName}</span>
                    <span className="shrink-0 text-sm text-slate-500">（公司章）</span>
                  </div>
                  <div className="flex items-end border-b border-slate-700 pb-2 mt-auto">
                    <span className="w-24 shrink-0 text-slate-400">統一編號：</span>
                    <span className="flex-1 font-mono tracking-wider">{formData.vat || ' '}</span>
                  </div>
                  <div className="flex items-end border-b border-slate-700 pb-2 mt-auto">
                    <span className="w-24 shrink-0 text-slate-400">代表人：</span>
                    <span className="flex-1">{formData.representative}</span>
                    <span className="shrink-0 text-sm text-slate-500">（負責人章）</span>
                  </div>
                  <div className="flex items-end border-b border-slate-700 pb-2 mt-8">
                    <span className="w-24 shrink-0 text-slate-400">聯絡人：</span>
                    <span className="flex-1">{formData.contactName || ' '}</span>
                  </div>
                  <div className="flex items-end border-b border-slate-700 pb-2">
                    <span className="w-24 shrink-0 text-slate-400">聯絡電話：</span>
                    <span className="flex-1 font-mono tracking-wider">{formData.contactPhone || ' '}</span>
                  </div>
                </div>

                <div className="flex-1 space-y-8">
                  <div className="flex items-end border-b border-slate-700 pb-2">
                    <span className="w-24 shrink-0 text-slate-400">乙方：</span>
                    <span className="flex-1 font-bold text-white text-lg">貳拾伍數據顧問企業社</span>
                    <span className="shrink-0 text-sm text-slate-500">（公司章）</span>
                  </div>
                  <div className="flex items-end border-b border-slate-700 pb-2">
                    <span className="w-24 shrink-0 text-slate-400">統一編號：</span>
                    <span className="flex-1 font-mono tracking-wider">52467800</span>
                  </div>
                  <div className="flex items-end border-b border-slate-700 pb-2 mt-auto">
                    <span className="w-24 shrink-0 text-slate-400">代表人：</span>
                    <span className="flex-1">廖天佑</span>
                    <span className="shrink-0 text-sm text-slate-500">（負責人章）</span>
                  </div>
                  <div className="flex items-end border-b border-slate-700 pb-2 mt-8">
                    <span className="w-24 shrink-0 text-slate-400">聯絡人：</span>
                    <span className="flex-1">廖天佑</span>
                  </div>
                  <div className="flex items-end border-b border-slate-700 pb-2">
                    <span className="w-24 shrink-0 text-slate-400">聯絡電話：</span>
                    <span className="flex-1 font-mono tracking-wider">02-2272-4261</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-24 text-center text-slate-400 font-medium">
                中　華　民　國　　　　　年　　　　　月　　　　　日
              </div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 sm:p-10 shadow-xl overflow-hidden relative">
          
          {isSigned && (
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] z-10 flex items-center justify-center print-hide">
              <div className="bg-slate-800/90 border border-slate-700 p-6 rounded-2xl shadow-2xl transform -rotate-3 border-l-4 border-l-[#00B900]">
                <div className="text-[#00B900] font-black text-2xl mb-1 flex items-center">
                  <CheckCircle2 className="w-6 h-6 mr-2" /> 合約已產生完畢
                </div>
                <div className="text-slate-400 text-sm font-mono mt-2">請向下滑動列印 / 存成 PDF 進行用印</div>
              </div>
            </div>
          )}

          <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
            <Building2 className="w-6 h-6 text-brand-500 mr-3" />
            合約期間與立約資訊設定
          </h2>

          <form onSubmit={handleSign} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 border-b border-slate-800 pb-8">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">合約開始日期 <span className="text-red-500">*</span></label>
                <input
                  type="date"
                  required
                  disabled={isSigned}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 disabled:opacity-50 transition-colors [&::-webkit-calendar-picker-indicator]:invert"
                  value={formData.startDate}
                  onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">合約長度 (月數) <span className="text-red-500">*</span></label>
                <div className="relative">
                  <select
                    required
                    disabled={isSigned}
                    className="w-full appearance-none bg-slate-800 border border-slate-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 disabled:opacity-50 transition-colors cursor-pointer"
                    value={formData.months}
                    onChange={(e) => setFormData({...formData, months: e.target.value})}
                  >
                    <option value="1">1 個月 (月合約)</option>
                    <option value="3">3 個月 (季合約)</option>
                    <option value="6">6 個月 (半年約)</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-400">
                    <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">甲方公司名稱 <span className="text-red-500">*</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Building2 className="h-5 w-5 text-slate-500" />
                  </div>
                  <input
                    type="text"
                    required
                    disabled={isSigned}
                    placeholder="請輸入完整公司名稱"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 disabled:opacity-50 transition-colors"
                    value={formData.companyName}
                    onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">統一編號</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FileText className="h-5 w-5 text-slate-500" />
                  </div>
                  <input
                    type="text"
                    disabled={isSigned}
                    placeholder="8位數統一編號 (選填)"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 disabled:opacity-50 transition-colors"
                    value={formData.vat}
                    onChange={(e) => setFormData({...formData, vat: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">代表人 / 負責人姓名 <span className="text-red-500">*</span></label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  type="text"
                  required
                  disabled={isSigned}
                  placeholder="請輸入公司負責人真實姓名"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 disabled:opacity-50 transition-colors"
                  value={formData.representative}
                  onChange={(e) => setFormData({...formData, representative: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">日常聯絡人姓名 <span className="text-red-500">*</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-500" />
                  </div>
                  <input
                    type="text"
                    required
                    disabled={isSigned}
                    placeholder="請輸入聯絡窗口姓名"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 disabled:opacity-50 transition-colors"
                    value={formData.contactName}
                    onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">聯絡人行動電話 <span className="text-red-500">*</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-slate-500" />
                  </div>
                  <input
                    type="tel"
                    required
                    disabled={isSigned}
                    placeholder="例如：0912-345-678"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 disabled:opacity-50 transition-colors"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({...formData, contactPhone: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800">
              <label className="flex items-start cursor-pointer group">
                <div className="relative flex items-center justify-center mt-1">
                  <input
                    type="checkbox"
                    required
                    disabled={isSigned}
                    className="peer sr-only"
                    checked={isAgreed}
                    onChange={(e) => setIsAgreed(e.target.checked)}
                  />
                  <div className="w-6 h-6 border-2 border-slate-600 rounded bg-slate-800 peer-checked:bg-brand-500 peer-checked:border-brand-500 transition-colors flex items-center justify-center">
                    <CheckCircle2 className={`w-4 h-4 text-white transition-opacity ${isAgreed ? 'opacity-100' : 'opacity-0'}`} />
                  </div>
                </div>
                <div className="ml-4">
                  <span className={`text-lg font-bold transition-colors ${isAgreed ? 'text-brand-400' : 'text-slate-300 group-hover:text-white'}`}>
                    我已確認上方資訊填寫無誤，並同意將其帶入合約中。
                  </span>
                  <p className="text-sm text-slate-500 mt-1">點擊下方按鈕即可產生專屬您的實體合約 PDF 檔案供雙方後續用印。</p>
                </div>
              </label>
            </div>

            {!isSigned && (
              <button
                type="submit"
                className={`w-full mt-8 py-5 rounded-xl font-bold text-lg transition-all flex justify-center items-center shadow-lg ${
                  isAgreed && formData.companyName && formData.representative 
                    ? 'bg-brand-600 hover:bg-brand-500 text-white shadow-brand-500/20' 
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                }`}
              >
                確認無誤，產生實體合約 PDF
              </button>
            )}
          </form>
        </div>
        </div>

        {/* Payment Section (Unlocks after signed) */}
        <AnimatePresence>
          {isSigned && (
            <motion.div
              id="payment-section"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-12 bg-gradient-to-br from-slate-900 to-black border border-brand-500/30 rounded-3xl p-8 sm:p-12 shadow-[0_0_50px_rgba(0,185,0,0.05)] relative z-30 overflow-hidden"
            >
              {/* Decorative background flair */}
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="text-center mb-10 relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 mb-6">
                  <Download className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-black text-white mb-4">合約已為您產生，準備邁出第一步</h2>
                <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto mb-6">
                  請點擊下方按鈕開啟列印畫面，您可直接列印實體合約，或在印表機選項點選「另存為 PDF」。請將首期服務款項匯至下方帳戶。<br/>雙方確認款項及合約後，我將立刻為您啟動工作流程。
                </p>
                <button
                  onClick={handlePrintPdf}
                  className="inline-flex items-center px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl transition-colors shadow-lg shadow-brand-500/20"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  列印合約 / 存成 PDF
                </button>
              </div>

              <div className="max-w-xl mx-auto bg-slate-800/50 border border-slate-700 rounded-2xl p-6 sm:p-8 backdrop-blur-sm relative z-10">
                <div className="space-y-6">
                  
                  <div>
                    <div className="text-sm font-medium text-slate-500 mb-1">收款銀行</div>
                    <div className="text-xl text-white font-bold tracking-wide">
                      {paymentInfo.bankCode} ({paymentInfo.bankName})
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium text-slate-500 mb-1">收款人戶名</div>
                    <div className="text-xl text-white font-bold tracking-wide">
                      {paymentInfo.accountName}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-slate-500 mb-1">匯款帳號</div>
                    <div className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-xl p-4 group hover:border-brand-500/50 transition-colors">
                      <span className="text-2xl font-mono text-brand-400 tracking-wider">
                        {paymentInfo.accountNumber}
                      </span>
                      <button 
                        onClick={handleCopy}
                        className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-brand-600 transition-colors focus:outline-none"
                        title="複製帳號"
                      >
                        {copied ? <CheckCircle2 className="w-5 h-5 text-[#00B900]" /> : <Copy className="w-5 h-5" />}
                      </button>
                    </div>
                    <AnimatePresence>
                      {copied && (
                        <motion.span 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-[#00B900] text-sm font-bold absolute mt-2"
                        >
                          已複製到剪貼簿！
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>

                  <div>
                    <div className="text-sm font-medium text-slate-500 mb-1">戶名</div>
                    <div className="text-xl text-slate-200 font-bold tracking-wide">
                      {paymentInfo.accountName}
                    </div>
                  </div>

                </div>
              </div>

              <div className="mt-10 text-center relative z-10">
                <div className="bg-blue-900/10 border-l-4 border-blue-500 p-5 rounded-r-xl inline-block max-w-xl text-left">
                  <p className="text-blue-300 font-bold leading-relaxed">
                    👉 匯款完成後，請透過 LINE 回傳「帳號後五碼」。<br/>核對無誤後，我們會立即展開第一階段的籌備與溝通群組。
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>
      </div>
    </>
  );
};
