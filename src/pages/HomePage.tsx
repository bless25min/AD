import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronRight, MessageCircle, Activity, TrendingDown, Target, HelpCircle, ChevronDown } from 'lucide-react';
import { siteContent } from '../content/siteContent';
import { painPoints } from '../content/painPoints';
import { faqs } from '../content/faq';
import { useAppStore } from '../store/useAppStore';
import { ProgressTracker } from '../components/ProgressTracker';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export const HomePage = () => {
  const navigate = useNavigate();
  const { setPainPoint, selectedPainPoint, setFollowUpOption, selectedFollowUpOption } = useAppStore();
  const [activeFaq, setActiveFaq] = useState<string | null>(null);
  
  // Progress tracker state
  const [activeStep, setActiveStep] = useState(1);
  const [showProgress, setShowProgress] = useState(false);
  
  const heroRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);
  const diagnosisRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const heroBottom = heroRef.current.getBoundingClientRect().bottom;
        setShowProgress(heroBottom < 100);
      }
      
      if (ctaRef.current) {
        const ctaTop = ctaRef.current.getBoundingClientRect().top;
        if (ctaTop < window.innerHeight * 0.75) {
          setActiveStep(3);
        } else if (selectedPainPoint) {
          setActiveStep(2);
        } else {
          setActiveStep(1);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selectedPainPoint]);

  const handlePainPointClick = (id: string) => {
    if (selectedPainPoint !== id) {
      setPainPoint(id);
      setActiveStep(2);
    } else {
      setPainPoint(null);
      setActiveStep(1);
    }
  };

  const handleFollowUpClick = (id: string) => {
    setFollowUpOption(id);
    setTimeout(() => {
      diagnosisRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 200);
  };

  const handleFinalCtaClick = () => {
    navigate('/liff');
  };

  return (
    <div className="min-h-screen bg-dark-bg text-slate-100 font-sans selection:bg-brand-500 selection:text-white pb-20">
      <ProgressTracker currentStep={activeStep} isVisible={showProgress} />
      
      {/* 1. Hero 區塊 */}
      <section ref={heroRef} className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center min-h-[85vh] flex flex-col justify-center">
        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 text-sm font-medium tracking-wide">
            致：需要高信任門檻的預約型服務
          </div>
          <p className="text-brand-400 font-bold text-lg md:text-xl mb-6 tracking-wide">
            {siteContent.hero.positioning}
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-8 leading-tight">
            {siteContent.hero.title}
          </h1>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-8 text-brand-400 whitespace-pre-line">
            {siteContent.hero.subtitle}
          </h2>
          <p className="text-lg md:text-xl text-slate-300 mb-8 font-medium whitespace-pre-line leading-relaxed max-w-3xl mx-auto">
            {siteContent.hero.description}
          </p>

          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 mb-8 max-w-2xl mx-auto">
            <p className="text-lg text-slate-300 font-medium whitespace-pre-line leading-relaxed">
              {siteContent.hero.boundary}
            </p>
          </div>

          <p className="text-lg md:text-xl text-brand-300/80 mb-12 font-bold whitespace-pre-line">
            {siteContent.hero.softPermission}
          </p>
          
          <button 
            onClick={() => {
              document.getElementById('diagnostic')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-xl font-bold text-white transition-all duration-300 bg-[#00B900] border border-transparent rounded-full hover:bg-[#009900] shadow-[0_0_20px_rgba(0,185,0,0.2)] hover:scale-105 focus:outline-none"
          >
            {siteContent.hero.ctaText}
            <ChevronDown className="w-6 h-6 ml-2 group-hover:translate-y-1 transition-transform" />
          </button>
        </motion.div>
      </section>

      {/* 2. Affinity (角色困境) */}
      <section className="py-20 bg-[#0a0f18] border-y border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center sm:text-left">
            <h2 className="text-2xl font-bold text-slate-400">{siteContent.affinity.title}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {siteContent.affinity.requirements.map((req, idx) => (
              <div key={idx} className="flex items-start">
                <CheckCircle2 className="w-6 h-6 text-brand-500 mr-4 flex-shrink-0 mt-0.5" />
                <span className="text-lg text-slate-200 leading-snug">{req}</span>
              </div>
            ))}
          </div>
          <div className="space-y-6">
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
              <p className="text-lg text-slate-300 leading-relaxed whitespace-pre-line">
                {siteContent.affinity.closing}
              </p>
            </div>
            <div className="p-6 bg-transparent border-l-4 border-brand-500">
              <p className="text-xl text-brand-400 font-bold leading-relaxed whitespace-pre-line">
                {siteContent.affinity.closing2}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Diagnostic */}
      <section id="diagnostic" className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[600px]">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            {selectedPainPoint ? "我們來往下拆解這個環節：" : "你現在通常卡在哪個環節？"}
          </h2>
        </div>

        <div className="flex flex-col gap-6 relative">
          <AnimatePresence mode="popLayout">
            {painPoints.map((pt) => {
              const icons = {
                high_cpa: TrendingDown,
                low_conversion: MessageCircle,
                unstable: Activity,
                no_idea: HelpCircle
              };
              const Icon = icons[pt.id as keyof typeof icons] || Target;
              const isSelected = selectedPainPoint === pt.id;

              if (selectedPainPoint && !isSelected) return null;

              return (
                <motion.div
                  layout
                  key={pt.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, height: 0, overflow: 'hidden' }}
                  transition={{ duration: 0.4 }}
                  className={`relative rounded-2xl border-2 transition-all duration-300 ${
                    isSelected 
                      ? 'border-brand-500 bg-slate-900 shadow-[0_0_30px_rgba(34,197,94,0.1)]' 
                      : 'border-slate-800 bg-slate-900/50 hover:border-brand-500/50 hover:bg-slate-800 cursor-pointer'
                  }`}
                >
                  <div 
                    onClick={() => !isSelected && handlePainPointClick(pt.id)}
                    className="p-8"
                  >
                    <div className="flex items-start">
                      <div className={`w-14 h-14 rounded-xl flex flex-shrink-0 items-center justify-center mr-6 border transition-colors ${isSelected ? 'bg-brand-500/20 border-brand-500' : 'bg-dark-bg border-slate-700'}`}>
                        <Icon className={`w-7 h-7 ${isSelected ? 'text-brand-400' : 'text-slate-400'}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className={`text-2xl font-bold mb-3 ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                            {pt.title}
                          </h3>
                          {isSelected && (
                            <button 
                              onClick={(e) => { e.stopPropagation(); handlePainPointClick(pt.id); }}
                              className="text-sm text-slate-500 hover:text-white underline underline-offset-4"
                            >
                              重選
                            </button>
                          )}
                        </div>
                        <p className="text-slate-400 text-base leading-relaxed mb-4 whitespace-pre-line">
                          {pt.detailedDescription}
                        </p>
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.4 }}
                        className="border-t border-slate-800 bg-slate-800/20 px-8 py-8 rounded-b-xl"
                      >
                        <div className="mb-6 bg-brand-900/10 border-l-2 border-brand-500 p-4 rounded-r-lg">
                           <p className="text-lg text-brand-300 font-medium">{pt.positiveFeedback}</p>
                        </div>
                        <h4 className="text-xl font-bold text-white mb-6 flex items-center">
                          <MessageCircle className="w-5 h-5 text-brand-400 mr-3" />
                          {pt.followUp.question}
                        </h4>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {pt.followUp.options.map((opt) => {
                            const isOptSelected = selectedFollowUpOption === opt.id;
                            return (
                              <button
                                key={opt.id}
                                onClick={() => handleFollowUpClick(opt.id)}
                                className={`text-left p-5 rounded-xl border transition-all duration-300 focus:outline-none ${
                                  isOptSelected 
                                   ? 'border-brand-500 bg-brand-500/10 text-white shadow-inner transform scale-[1.02]' 
                                   : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-brand-400/50 hover:bg-slate-700'
                                }`}
                              >
                                {opt.text}
                              </button>
                            );
                          })}
                        </div>

                        <AnimatePresence>
                          {selectedFollowUpOption && (
                            <motion.div
                              ref={diagnosisRef}
                              initial={{ opacity: 0, height: 0, marginTop: 0 }}
                              animate={{ opacity: 1, height: 'auto', marginTop: 32 }}
                              transition={{ duration: 0.5 }}
                              className="overflow-hidden"
                            >
                              <div className="bg-brand-900/10 border-l-4 border-brand-500 p-6 md:p-8 rounded-r-2xl">
                                <h5 className="text-sm font-bold tracking-widest text-brand-500 mb-3 uppercase">🔍 專屬診斷回饋</h5>
                                <p className="text-lg text-brand-300 font-medium mb-4 whitespace-pre-line">
                                  {pt.affirmativeGuidance}
                                </p>
                                <p className="text-lg text-slate-200 leading-relaxed whitespace-pre-line mb-6 font-medium">
                                  {pt.microDiagnosis}
                                </p>
                                
                                {pt.microDiagnosisBridge && (
                                   <p className="text-lg text-brand-300 italic mb-6 border-t border-slate-800/60 pt-4 whitespace-pre-line">
                                      {pt.microDiagnosisBridge}
                                   </p>
                                )}
                                
                                <div className="mb-8 p-4 bg-slate-800/40 rounded-xl border border-slate-700/50">
                                   <p className="text-slate-300 font-medium flex items-start leading-relaxed whitespace-pre-line">
                                      <CheckCircle2 className="w-5 h-5 text-brand-400 mr-3 flex-shrink-0 mt-0.5" />
                                      {pt.progressSense}
                                   </p>
                                </div>

                                <button
                                  onClick={() => {
                                    document.getElementById('results-philosophy')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                  }}
                                  className="mx-auto flex items-center justify-center text-sm font-bold text-slate-400 hover:text-brand-400 transition-colors py-2 px-4 rounded-full bg-slate-800 border border-slate-700 hover:border-brand-500/50"
                                >
                                  {pt.recommendedNextStep} <ChevronDown className="w-4 h-4 ml-2" />
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                      </motion.div>
                    )}
                  </AnimatePresence>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </section>

      {/* 4. Compressed Views (降級的舊三大觀點) */}
      <section id="results-philosophy" className="py-20 bg-[#05080f] border-t border-slate-800/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {siteContent.compressedViews.map((view, idx) => (
               <div key={idx} className="bg-slate-900/40 p-8 rounded-2xl border border-slate-800/60 hover:border-slate-700 transition-colors">
                 <h3 className="text-xl font-bold text-slate-200 mb-4 leading-snug">{view.title}</h3>
                 <p className="text-base text-slate-400 leading-relaxed font-medium whitespace-pre-line">{view.description}</p>
               </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Core Proposition (全頁中樞金句) */}
      <section className="py-28 bg-black border-y border-slate-800 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl sm:text-3xl text-slate-400 font-medium leading-relaxed mb-6 whitespace-pre-line">
              {siteContent.coreProposition.setup}
            </h2>
            <div className="text-3xl sm:text-5xl font-extrabold leading-tight text-white whitespace-pre-line">
              {siteContent.coreProposition.main}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5.1 Progress Hint 1 */}
      <div className="bg-brand-900/10 border-y border-brand-500/20 py-8 text-center px-4">
         <p className="text-brand-400 font-bold text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            {siteContent.progressHints[0]}
         </p>
      </div>

      {/* 8. New Model (新方法合理化) */}
      <section className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center whitespace-pre-line leading-tight">{siteContent.newModel.title}</h2>
        <div className="max-w-3xl mx-auto mb-16">
          <p className="text-xl text-slate-400 text-center whitespace-pre-line mb-12">
            {siteContent.newModel.description}
          </p>
          <div className="space-y-6">
            {siteContent.newModel.steps.map((step, idx) => (
               <div key={idx} className="bg-[#0a0f18] p-8 rounded-2xl border border-slate-800 relative text-center sm:text-left flex flex-col sm:flex-row items-center sm:items-start transition-colors hover:border-slate-700">
                 <div className="text-5xl font-black text-slate-800 mr-6 mb-4 sm:mb-0">0{idx+1}</div>
                 <div>
                   <h3 className="text-2xl font-bold text-white mb-3">{step.name}</h3>
                   <p className="text-slate-400 text-lg">{step.desc}</p>
                 </div>
               </div>
            ))}
          </div>
        </div>
        
        {/* 9. Evidence 區塊 (權威說服與平台訊號) */}
        <div className="bg-[#0a0f18] rounded-[2rem] p-8 sm:p-12 border border-slate-800 mt-10 max-w-4xl mx-auto shadow-xl">
           <h3 className="text-3xl font-bold mb-8 text-white whitespace-pre-line">{siteContent.evidence.title}</h3>
           <p className="text-slate-300 text-lg leading-relaxed whitespace-pre-line mb-10 border-b border-slate-800 pb-10">
             {siteContent.evidence.description}
           </p>
           
           <p className="text-xl text-brand-300 font-bold leading-relaxed whitespace-pre-line mb-10">
             {siteContent.evidence.supportLine}
           </p>

           <div className="mt-6 p-6 bg-slate-900/80 rounded-xl border border-slate-700/60 relative">
             <div className="absolute left-0 top-0 w-1 h-full bg-slate-600 rounded-l-xl"></div>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed whitespace-pre-line">
                <span className="font-bold text-slate-200 block mb-2">補充視角（平台訊號變更）</span>
                {siteContent.evidence.microProof}
              </p>
           </div>
        </div>

        {/* 9.1 Results Scenario (結果感模組) */}
        <div className="mt-16 text-center max-w-4xl mx-auto lg:px-0">
           <h2 className="text-3xl font-bold text-white mb-8">{siteContent.resultsScenario.title}</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {siteContent.resultsScenario.bullets.map((b, i) => (
                 <div key={i} className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 flex items-start text-left hover:border-slate-600 transition-colors">
                    <CheckCircle2 className="w-6 h-6 text-brand-500 mr-4 flex-shrink-0 mt-1" />
                    <span className="text-slate-300 text-lg leading-relaxed">{b}</span>
                 </div>
              ))}
           </div>
           <p className="text-xl text-brand-400 font-bold whitespace-pre-line leading-relaxed pb-8 border-b border-slate-800">{siteContent.resultsScenario.closing}</p>
        </div>

        {/* 9.2 Micro Evidence (微型真實證據) */}
        <div className="mt-16 max-w-4xl mx-auto">
           <h2 className="text-2xl text-center font-bold text-slate-400 mb-10">{siteContent.microEvidence.title}</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {siteContent.microEvidence.items.map((item, idx) => (
                 <div key={idx} className="bg-dark-bg p-6 rounded-2xl border-l-4 border-slate-700 flex flex-col justify-center text-left hover:border-brand-500 transition-colors">
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-3">真實切片 {idx + 1}</span>
                    <p className="text-lg text-slate-300 leading-relaxed font-medium">
                       {item.content}
                    </p>
                 </div>
              ))}
           </div>
        </div>

        {/* 9.3 Mid-Page Objections (中段異議處理) */}
        <div className="mt-24 max-w-4xl mx-auto rounded-[2rem] bg-slate-900/50 p-8 sm:p-12 border border-slate-800">
           <h3 className="text-2xl sm:text-3xl font-bold text-white mb-10 text-center">{siteContent.midPageObjections.title}</h3>
           <div className="space-y-8">
              {siteContent.midPageObjections.items.map((item, idx) => (
                 <div key={idx}>
                    <h4 className="text-xl font-bold text-slate-200 mb-3 flex items-start">
                       <HelpCircle className="w-6 h-6 text-slate-500 mr-3 mt-0.5 flex-shrink-0" />
                       {item.question}
                    </h4>
                    <p className="text-lg text-slate-400 pl-9 leading-relaxed whitespace-pre-line font-medium border-l-[3px] border-brand-500/30 ml-[11px] py-1">
                       {item.answer}
                    </p>
                 </div>
              ))}
           </div>
        </div>
      </section>

      {/* 10. FAQ (異議處理) */}
      <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800/50">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white">除了這些，<br className="sm:hidden" />你可能也有的疑問</h2>
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
                <span className="font-bold text-xl text-slate-200 group-hover:text-brand-400 transition-colors pr-8">{faq.question}</span>
                <ChevronRight 
                  className={`w-6 h-6 text-slate-500 transition-transform duration-300 mt-0.5 flex-shrink-0 ${
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
                    <div className="pb-8 pt-2 text-slate-400 text-lg leading-relaxed whitespace-pre-line">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* 11. CTA 降壓 + Micro Commitment + Final CTA 區塊 */}
      <section ref={ctaRef} className="pt-24 pb-32 bg-gradient-to-b from-dark-bg to-brand-900/5 text-center px-4 sm:px-6 lg:px-8 border-t border-slate-800/80">
        <div className="max-w-4xl mx-auto">
          {/* Friction Objection 降阻力段落 */}
          <div className="mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-slate-200 leading-tight">
              {siteContent.frictionObjection.title}
            </h2>
            <p className="text-xl text-slate-400 leading-relaxed whitespace-pre-line">
              {siteContent.frictionObjection.description}
            </p>
          </div>

          {/* 5.2 Progress Hint 2 */}
          <div className="bg-brand-900/10 border-y border-brand-500/20 py-8 text-center px-4 mb-14 -mx-4 sm:mx-0 sm:rounded-2xl">
             <p className="text-brand-400 font-bold text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                {siteContent.progressHints[1]}
             </p>
          </div>

          {/* Micro Commitment 承諾段落 */}
          <div className="mb-14 p-8 bg-slate-900/60 rounded-2xl border border-brand-500/20 shadow-[0_0_40px_rgba(0,185,0,0.05)] mx-auto max-w-2xl">
             <h3 className="text-2xl font-bold text-brand-400 mb-6">{siteContent.microCommitment.title}</h3>
             <p className="text-xl text-slate-200 leading-relaxed whitespace-pre-line font-medium">
               {siteContent.microCommitment.description}
             </p>
          </div>

          {/* 核心承諾區 */}
          <div className="py-12 px-6 sm:p-14 rounded-[2.5rem] relative overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl">
            <h3 className="text-3xl sm:text-4xl font-bold mb-6 text-white relative z-10">{siteContent.finalCta.title}</h3>
            
            <div className="bg-red-900/10 border-l-4 border-red-500/50 p-5 mb-10 text-left w-full max-w-2xl mx-auto relative z-10 rounded-r-xl">
              <p className="text-red-200 font-medium text-lg leading-relaxed">
                {siteContent.finalCta.directContactReason}
              </p>
            </div>

            <p className="text-lg sm:text-xl text-slate-300 mb-10 leading-relaxed whitespace-pre-line max-w-2xl mx-auto relative z-10">
              {siteContent.finalCta.description}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10 mb-8 mx-auto w-full max-w-3xl">
              <button 
                onClick={handleFinalCtaClick}
                className="group relative inline-flex items-center justify-center px-6 py-5 w-full sm:flex-1 text-lg sm:text-xl font-bold text-white transition-all duration-300 bg-[#00B900] border border-[#00B900] rounded-2xl hover:bg-[#009900] shadow-[0_0_20px_rgba(0,185,0,0.2)] hover:shadow-[0_0_40px_rgba(0,185,0,0.4)] hover:-translate-y-1 focus:outline-none"
              >
                <MessageCircle className="w-6 h-6 mr-3 flex-shrink-0" />
                <span className="truncate">{siteContent.finalCta.buttonText}</span>
              </button>
              
              <a 
                href="tel:0900000000"
                className="group relative inline-flex items-center justify-center px-5 py-5 w-full sm:w-[55%] text-lg font-bold text-slate-300 transition-all duration-300 bg-slate-800 border border-slate-700 rounded-2xl hover:bg-slate-700 hover:text-white hover:-translate-y-1 focus:outline-none text-center"
              >
                <span className="truncate">{siteContent.finalCta.phoneCtaText}</span>
              </a>
            </div>
            
            <p className="text-sm text-slate-500 whitespace-pre-line relative z-10 font-medium max-w-xl mx-auto">
               {siteContent.finalCta.lowRiskHint}
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-slate-600 text-sm">
        <p>© {new Date().getFullYear()} 轉換架構系統 | 陪伴式漏斗重構</p>
      </footer>
    </div>
  );
};
