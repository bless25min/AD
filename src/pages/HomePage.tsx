import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronRight, MessageCircle, ArrowRight, Activity, TrendingDown, Target, HelpCircle } from 'lucide-react';
import { siteContent } from '../content/siteContent';
import { painPoints } from '../content/painPoints';
import { faqs } from '../content/faq';
import { useAppStore } from '../store/useAppStore';
import { ProgressTracker } from '../components/ProgressTracker';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { setPainPoint, selectedPainPoint } = useAppStore();
  const [activeFaq, setActiveFaq] = useState<string | null>(null);
  
  // Progress tracker state
  const [activeStep, setActiveStep] = useState(1);
  const [showProgress, setShowProgress] = useState(false);
  
  const heroRef = useRef<HTMLElement>(null);
  const hookRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // 1. 判斷是否離開 Hero，決定是否顯示 Progress Bar
      if (heroRef.current) {
        const heroBottom = heroRef.current.getBoundingClientRect().bottom;
        setShowProgress(heroBottom < 100);
      }
      
      // 2. 判斷是否進入 CTA 區域 (Step 3)
      if (ctaRef.current) {
        const ctaTop = ctaRef.current.getBoundingClientRect().top;
        if (ctaTop < window.innerHeight * 0.75) {
          setActiveStep(3);
        } else if (selectedPainPoint) {
          // 離開 CTA 且已選痛點，維持 Step 2
          setActiveStep(2);
        } else {
          setActiveStep(1);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // 初始化呼叫一次
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selectedPainPoint]);

  const handlePainPointClick = (id: string) => {
    setPainPoint(id);
    setActiveStep(2); // 痛點選擇後立刻進入 Step 2
    
    // 平滑滾動到「中段爆點」區塊 (延遲以確保動畫順暢)
    setTimeout(() => {
      hookRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 200);
  };

  const handleFinalCtaClick = () => {
    // 點擊後直接導向 LIFF
    navigate('/liff');
  };

  return (
    <div className="min-h-screen bg-dark-bg text-slate-100 font-sans selection:bg-brand-500 selection:text-white pb-20">
      <ProgressTracker currentStep={activeStep} isVisible={showProgress} />
      
      {/* 1. Hero 區塊 */}
      <section ref={heroRef} className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center min-h-[90vh] flex flex-col justify-center">
        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-500 text-sm font-medium tracking-wide">
            專為預約型產業與高客單價設計
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8 leading-tight">
            {siteContent.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-8 font-medium whitespace-pre-line leading-relaxed">
            {siteContent.hero.description}
          </p>
          
          <button 
            onClick={() => {
              document.getElementById('diagnostic')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-white transition-all duration-300 bg-brand-600 border border-transparent rounded-full hover:bg-brand-500 hover:scale-105 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] focus:outline-none"
          >
            {siteContent.hero.ctaText}
            <ChevronRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </section>

      {/* 2. 建立共同點區塊 (改為簡約黑底風格) */}
      <section className="py-20 bg-[#0a0f18] border-y border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center sm:text-left">
            <h2 className="text-2xl font-bold text-slate-400">{siteContent.affinity.title}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {siteContent.affinity.requirements.map((req, idx) => (
              <div key={idx} className="flex items-start">
                <CheckCircle2 className="w-6 h-6 text-brand-500 mr-4 flex-shrink-0 mt-0.5" />
                <span className="text-lg text-slate-200 leading-snug">{req}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 互動式診斷區 (核心分流) */}
      <section id="diagnostic" className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">先確認一下，<br className="sm:hidden"/>你現在卡在哪裡？</h2>
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
              <div
                key={pt.id}
                onClick={() => handlePainPointClick(pt.id)}
                className={`cursor-pointer group relative p-8 rounded-2xl border-2 transition-all duration-300 ${
                  isSelected 
                    ? 'border-brand-500 bg-brand-500/5 shadow-[0_0_30px_rgba(34,197,94,0.15)] scale-[1.02]' 
                    : 'border-slate-800 bg-slate-900/50 hover:border-brand-500/50 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-start">
                  <div className={`w-14 h-14 rounded-xl flex flex-shrink-0 items-center justify-center mr-6 border transition-colors ${isSelected ? 'bg-brand-500/20 border-brand-500' : 'bg-dark-bg border-slate-700 group-hover:border-brand-500/50'}`}>
                    <Icon className={`w-7 h-7 ${isSelected ? 'text-brand-400' : 'text-slate-400 group-hover:text-brand-400'}`} />
                  </div>
                  <div>
                    <h3 className={`text-2xl font-bold mb-3 transition-colors ${isSelected ? 'text-white' : 'text-slate-200 group-hover:text-brand-300'}`}>
                      {pt.title}
                    </h3>
                    <p className="text-slate-400 text-base leading-relaxed mb-4 whitespace-pre-line">
                      {pt.detailedDescription}
                    </p>
                    <div className={`flex items-center text-sm font-bold mt-6 ${isSelected ? 'text-brand-500' : 'text-slate-500 group-hover:text-brand-500'}`}>
                      <span>{isSelected ? '已選擇此狀況' : '點擊選擇此狀況'}</span>
                      <ArrowRight className={`w-4 h-4 ml-1 transition-transform ${isSelected ? 'translate-x-1' : 'group-hover:translate-x-1'}`} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. [新增] 中段轉折爆點區塊 (Hook Section) */}
      <section ref={hookRef} className="py-32 bg-black border-y border-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl sm:text-3xl text-slate-400 font-medium leading-relaxed mb-8">
              {siteContent.hookBreakthrough.layer1}
            </h2>
            <div className="text-3xl sm:text-5xl font-bold leading-tight text-white whitespace-pre-line">
              {siteContent.hookBreakthrough.layer2}
            </div>
            {/* 引導向下 */}
            <div className="mt-16 flex justify-center sm:justify-start">
               <div className="w-1 h-24 bg-gradient-to-b from-brand-500 to-transparent rounded-full animate-pulse"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. 新模型說明區 */}
      <section className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">{siteContent.newModel.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {siteContent.newModel.steps.map((step, idx) => (
             <div key={idx} className="bg-slate-900 p-8 rounded-2xl border border-slate-800 relative">
               <div className="text-6xl font-black text-slate-800 absolute top-4 right-4 opacity-30">0{idx+1}</div>
               <h3 className="text-2xl font-bold text-white mb-4 relative z-10">{step.name}</h3>
               <p className="text-slate-400 text-lg relative z-10">{step.desc}</p>
             </div>
          ))}
        </div>
        
        <div className="bg-[#0a0f18] rounded-2xl p-8 border border-slate-800">
           <h3 className="text-2xl font-bold mb-6">{siteContent.evidence.title}</h3>
           <p className="text-slate-300 text-lg leading-relaxed whitespace-pre-line">
             {siteContent.evidence.description}
           </p>
        </div>
      </section>

      {/* 6. FAQ 疑慮處理區 */}
      <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">你在找我的時候，<br className="sm:hidden" />可能會有的疑問</h2>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div 
              key={faq.id} 
              className="border-b border-slate-800 overflow-hidden"
            >
              <button
                className="w-full py-6 text-left flex justify-between items-start focus:outline-none group"
                onClick={() => setActiveFaq(activeFaq === faq.id ? null : faq.id)}
              >
                <span className="font-bold text-xl text-slate-200 group-hover:text-brand-400 transition-colors">{faq.question}</span>
                <ChevronRight 
                  className={`w-6 h-6 text-slate-500 transition-transform duration-300 mt-0.5 ${
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
                    <div className="pb-8 text-slate-400 text-lg leading-relaxed whitespace-pre-line">
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
      <section ref={ctaRef} className="py-32 bg-gradient-to-b from-dark-bg to-brand-900/10 border-t border-slate-800 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">{siteContent.finalCta.title}</h2>
          <p className="text-xl text-slate-300 mb-12 leading-relaxed whitespace-pre-line">
            {siteContent.finalCta.description}
          </p>
          <button 
            onClick={handleFinalCtaClick}
            className="group relative inline-flex flex-col sm:flex-row items-center justify-center px-10 py-6 w-full sm:w-auto text-2xl font-bold text-white transition-all duration-300 bg-[#00B900] border border-transparent rounded-2xl hover:bg-[#009900] shadow-[0_0_30px_rgba(0,185,0,0.2)] hover:shadow-[0_0_40px_rgba(0,185,0,0.4)] hover:-translate-y-1 focus:outline-none"
          >
            <div className="flex items-center">
              <MessageCircle className="w-8 h-8 mr-3 sm:mr-4" fill="currentColor" strokeWidth={0} />
              <span>{siteContent.finalCta.buttonText}</span>
            </div>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-slate-600 text-sm">
        <p>© {new Date().getFullYear()} 轉換架構系統 | 高客單信任漏斗</p>
      </footer>
    </div>
  );
};
