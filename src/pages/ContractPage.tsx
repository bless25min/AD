import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Copy, ShieldCheck, Building2, User, FileText, Download } from 'lucide-react';
import { getContractTerms, paymentInfo } from '../content/contractTerms';

export const ContractPage = () => {
  const [searchParams] = useSearchParams();
  
  // Format dates or fallback
  const getTodayFormatted = () => {
    const d = new Date();
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
  };

  const getFutureFormatted = (months: number) => {
    const d = new Date();
    d.setMonth(d.getMonth() + months);
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
  };

  const urlMonths = searchParams.get('months') || '6';
  const defaultStartDate = searchParams.get('startDate') || getTodayFormatted();
  const defaultEndDate = searchParams.get('endDate') || getFutureFormatted(parseInt(urlMonths, 10));

  const contractParams = {
    amount: searchParams.get('amount') || '50,000',
    months: urlMonths,
    project: searchParams.get('project') || '社群內容產製與行銷顧問',
    startDate: defaultStartDate,
    endDate: defaultEndDate,
  };

  const terms = getContractTerms(contractParams);

  // Form State
  const [formData, setFormData] = useState({
    companyName: '',
    vat: '',
    representative: ''
  });
  const [isAgreed, setIsAgreed] = useState(false);
  const [isSigned, setIsSigned] = useState(false);
  const [signedDate, setSignedDate] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName || !formData.representative || !isAgreed) return;
    
    // Lock the form and show payment
    setIsSigned(true);
    
    const now = new Date();
    setSignedDate(`${now.getFullYear()}/${String(now.getMonth()+1).padStart(2,'0')}/${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`);
    
    // Scroll to payment card
    setTimeout(() => {
      document.getElementById('payment-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(paymentInfo.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0a0f18] text-slate-200 font-sans selection:bg-brand-500 selection:text-white pb-32">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center text-brand-400 font-bold text-xl">
            <ShieldCheck className="w-6 h-6 mr-2" />
            數位顧問合約簽署
          </div>
          {isSigned && (
            <div className="flex items-center text-[#00B900] text-sm font-bold bg-[#00B900]/10 px-3 py-1 rounded-full border border-[#00B900]/20">
              <CheckCircle2 className="w-4 h-4 mr-1.5" /> 已完成簽署
            </div>
          )}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        {/* Document Container */}
        <div className="bg-slate-900 border border-slate-700/60 rounded-2xl shadow-2xl overflow-hidden mb-8 relative">
          
          <div className="p-8 sm:p-12 border-b border-slate-800">
            <h1 className="text-3xl md:text-4xl font-black text-white mb-8 text-center tracking-wide">
              數據顧問服務合約書
            </h1>
            <div className="flex flex-col md:flex-row justify-between text-slate-400 text-lg mb-8 font-medium space-y-4 md:space-y-0">
              <div>立約人 (甲方)：下附數位簽署人</div>
              <div>立約人 (乙方)：貳拾伍數據顧問企業社</div>
            </div>
            <p className="text-slate-300 leading-relaxed mb-8">
              甲方茲委任乙方提供數據顧問服務，為保障雙方權利與確認雙方義務，特立本數位合約，並同意訂定下列服務條款：
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
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 sm:p-10 shadow-xl overflow-hidden relative">
          
          {isSigned && (
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] z-10 flex items-center justify-center">
              <div className="bg-slate-800/90 border border-slate-700 p-6 rounded-2xl shadow-2xl transform -rotate-3 border-l-4 border-l-[#00B900]">
                <div className="text-[#00B900] font-black text-2xl mb-1 flex items-center">
                  <CheckCircle2 className="w-6 h-6 mr-2" /> 數位簽署完成
                </div>
                <div className="text-slate-400 text-sm font-mono">{signedDate}</div>
              </div>
            </div>
          )}

          <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
            <Building2 className="w-6 h-6 text-brand-500 mr-3" />
            請填寫甲方立約資訊
          </h2>

          <form onSubmit={handleSign} className="space-y-6">
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
              <label className="block text-sm font-medium text-slate-400 mb-2">代表人 / 簽署人姓名 <span className="text-red-500">*</span></label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  type="text"
                  required
                  disabled={isSigned}
                  placeholder="請輸入簽署人真實姓名"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 disabled:opacity-50 transition-colors"
                  value={formData.representative}
                  onChange={(e) => setFormData({...formData, representative: e.target.value})}
                />
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
                    我已詳細閱讀，並同意代表甲方簽署以上顧問服務合約條款。
                  </span>
                  <p className="text-sm text-slate-500 mt-1">本數位勾選具備與紙本簽章同等之法律效力。</p>
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
                確認無誤，正式簽署合約
              </button>
            )}
          </form>
        </div>

        {/* Payment Section (Unlocks after signed) */}
        <AnimatePresence>
          {isSigned && (
            <motion.div
              id="payment-section"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-12 bg-gradient-to-br from-slate-900 to-black border border-brand-500/30 rounded-3xl p-8 sm:p-12 shadow-[0_0_50px_rgba(0,185,0,0.05)] relative overflow-hidden"
            >
              {/* Decorative background flair */}
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="text-center mb-10 relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 mb-6">
                  <Download className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-black text-white mb-4">合約已成立，準備邁出第一步</h2>
                <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto">
                  請將首期服務款項匯至以下指定帳戶。<br/>匯款完成後，我將立刻為您啟動後續工作流程。
                </p>
              </div>

              <div className="max-w-xl mx-auto bg-slate-800/50 border border-slate-700 rounded-2xl p-6 sm:p-8 backdrop-blur-sm relative z-10">
                <div className="space-y-6">
                  
                  <div>
                    <div className="text-sm font-medium text-slate-500 mb-1">銀行代號</div>
                    <div className="text-xl text-white font-bold tracking-wide">
                      {paymentInfo.bankCode} ({paymentInfo.bankName})
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
  );
};
