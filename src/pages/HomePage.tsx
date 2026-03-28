import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronRight, MessageCircle, ArrowRight, Activity, TrendingDown, Target, HelpCircle } from 'lucide-react';
import { siteContent } from '../content/siteContent';
import { painPoints } from '../content/painPoints';
import { faqs } from '../content/faq';
import { useAppStore } from '../store/useAppStore';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { setPainPoint, selectedPainPoint } = useAppStore();
  const [activeFaq, setActiveFaq] = useState<string | null>(null);

  // 當使用者點擊診斷選項或主 CTA 時，導向 LINE Login
  const handleCtaClick = (painPointId?: string) => {
    if (painPointId) {
      setPainPoint(painPointId);
    }
    // TODO: 可以加上 tracking event (如 quiz_select, cta_click)
    navigate('/liff');
  };

  return (
    <div className="min-h-screen bg-dark-bg text-slate-100 font-sans selection:bg-brand-500 selection:text-white">
      {/* 1. Hero 區塊 */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-500 text-sm font-medium tracking-wide">
            專為高信任門檻產業設計
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            {siteContent.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-4 font-medium">
            {siteContent.hero.subtitle}
          </p>
          <p className="text-base md:text-lg text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            {siteContent.hero.description}
          </p>
          
          <button 
            onClick={() => {
              document.getElementById('diagnostic')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-brand-600 border border-transparent rounded-full hover:bg-brand-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-600 focus:ring-offset-dark-bg"
          >
            {siteContent.hero.ctaText}
            <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </section>

      {/* 2. 建立共同點區塊 */}
      <section className="py-16 bg-slate-900 border-y border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold">{siteContent.affinity.title}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {siteContent.affinity.requirements.map((req, idx) => (
              <div key={idx} className="flex items-center p-4 bg-dark-bg rounded-xl border border-slate-800">
                <CheckCircle2 className="w-6 h-6 text-brand-500 mr-3 flex-shrink-0" />
                <span className="text-lg text-slate-200">{req}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 互動式診斷區 (核心分流) */}
      <section id="diagnostic" className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">你的漏斗現在卡在哪裡？</h2>
          <p className="text-slate-400 text-lg">選擇最符合你現狀的選項，我們將為你提供專屬的優化建議。</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {painPoints.map((pt) => {
            const icons = {
              high_cpa: TrendingDown,
              low_conversion: MessageCircle,
              unstable: Activity,
              no_idea: HelpCircle
            };
            const Icon = icons[pt.id as keyof typeof icons] || Target;
            const isSelected = selectedPainPoint === pt.id;

            return (
              <motion.div
                key={pt.id}
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCtaClick(pt.id)}
                className={`cursor-pointer group relative p-6 rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                  isSelected 
                    ? 'border-brand-500 bg-brand-500/10' 
                    : 'border-slate-800 bg-slate-900 hover:border-brand-500/50 hover:bg-slate-800'
                }`}
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-1/4 -translate-y-1/4 group-hover:scale-110 transition-transform duration-500">
                  <Icon className="w-32 h-32" />
                </div>
                
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-dark-bg flex items-center justify-center mb-4 border border-slate-700 group-hover:border-brand-500/50 transition-colors">
                    <Icon className="w-6 h-6 text-brand-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-brand-300 transition-colors">
                    {pt.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                    {pt.shortDescription}
                  </p>
                  
                  <div className="flex items-center text-brand-500 font-medium text-sm">
                    <span>取得診斷與策略</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 4 & 5. 舊框架拆解與新模型 */}
      <section className="py-24 bg-slate-900 border-y border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:gap-16">
            <div className="lg:w-1/2 mb-12 lg:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{siteContent.newModel.title}</h2>
              <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                {siteContent.newModel.description}
              </p>
              
              <div className="space-y-6">
                {siteContent.newModel.steps.map((step, idx) => (
                  <div key={idx} className="flex">
                    <div className="flex-shrink-0 mr-4 flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-brand-500 font-bold">
                        {idx + 1}
                      </div>
                      {idx !== siteContent.newModel.steps.length - 1 && (
                        <div className="w-px h-full bg-slate-800 mt-2"></div>
                      )}
                    </div>
                    <div className="pb-2">
                      <h4 className="text-xl font-bold text-slate-200 mb-1">{step.name}</h4>
                      <p className="text-slate-400">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <div className="bg-dark-bg rounded-2xl p-8 border border-slate-800 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-500 to-blue-500"></div>
                <h3 className="text-2xl font-bold mb-4">{siteContent.evidence.title}</h3>
                <p className="text-slate-300 leading-relaxed mb-8">
                  {siteContent.evidence.description}
                </p>
                <div className="bg-slate-900 rounded-lg p-6 border border-slate-800 shadow-inner">
                  <div className="text-sm text-slate-500 mb-2">真實數據結構：</div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400">廣告點擊 (流量)</span>
                      <span className="font-mono text-brand-400">100%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5"><div className="bg-slate-600 h-1.5 rounded-full w-full"></div></div>
                    
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400">登陸頁瀏覽 (建立信任)</span>
                      <span className="font-mono text-brand-400">45%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5"><div className="bg-brand-600 h-1.5 rounded-full w-[45%]"></div></div>
                    
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400">加入 LINE (準備轉換)</span>
                      <span className="font-mono text-brand-400">12%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5"><div className="bg-brand-500 h-1.5 rounded-full w-[12%] shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ 疑慮處理區 */}
      <section className="py-24 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">常見疑問</h2>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div 
              key={faq.id} 
              className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900 transition-all duration-200"
            >
              <button
                className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                onClick={() => setActiveFaq(activeFaq === faq.id ? null : faq.id)}
              >
                <span className="font-bold text-lg">{faq.question}</span>
                <ChevronRight 
                  className={`w-5 h-5 text-slate-500 transition-transform duration-200 ${
                    activeFaq === faq.id ? 'rotate-90' : 'rotate-0'
                  }`} 
                />
              </button>
              
              <AnimatePresence>
                {activeFaq === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-5 text-slate-400 leading-relaxed border-t border-slate-800/50 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Final CTA */}
      <section className="py-24 bg-gradient-to-b from-dark-bg to-brand-900/20 border-t border-slate-800 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">{siteContent.finalCta.title}</h2>
          <p className="text-xl text-slate-300 mb-10 leading-relaxed">
            {siteContent.finalCta.description}
          </p>
          <button 
            onClick={() => handleCtaClick()}
            className="group relative inline-flex items-center justify-center px-8 py-5 text-xl font-bold text-white transition-all duration-300 bg-[#00B900] border border-transparent rounded-full hover:bg-[#009900] shadow-[0_0_20px_rgba(0,185,0,0.3)] hover:shadow-[0_0_30px_rgba(0,185,0,0.5)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00B900] focus:ring-offset-dark-bg"
          >
            <MessageCircle className="w-6 h-6 mr-3" fill="currentColor" strokeWidth={0} />
            {siteContent.finalCta.buttonText}
          </button>
          <p className="mt-4 text-sm text-slate-500">
            預估流程時間：2 分鐘。無需填寫繁瑣表單。
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-black/50 text-center border-t border-slate-900">
        <p className="text-slate-600 text-sm">
          © {new Date().getFullYear()} 互動式顧問銷售模型 | 高門檻轉換系統
        </p>
      </footer>
    </div>
  );
};
