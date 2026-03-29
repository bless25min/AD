import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronRight, MessageCircle, Activity, TrendingDown, Target, HelpCircle, ChevronDown } from 'lucide-react';
import { siteContent } from '../content/siteContent';
import { painPoints } from '../content/painPoints';
import { faqs } from '../content/faq';

export const HomePage = () => {
  const navigate = useNavigate();
  const ctaRef = useRef<HTMLElement>(null);
  
  const [expandedPoint, setExpandedPoint] = useState<string | null>(null);
  const [deepExpanded, setDeepExpanded] = useState<Record<string, boolean>>({});
  const [activeFaq, setActiveFaq] = useState<string | null>(null);

  const handleFinalCtaClick = () => {
    navigate('/liff');
  };

  const handlePointClick = (id: string) => {
    if (expandedPoint === id) {
      setExpandedPoint(null);
      setDeepExpanded(prev => ({ ...prev, [id]: false }));
    } else {
      setExpandedPoint(id);
    }
  };

  const handleDeepExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeepExpanded(prev => ({ ...prev, [id]: true }));
  };

  const getIcon = (id: string) => {
    switch(id) {
      case 'traffic_drop': return <TrendingDown className="w-8 h-8 md:w-10 md:h-10 text-brand-400" />;
      case 'high_bounce': return <Activity className="w-8 h-8 md:w-10 md:h-10 text-brand-400" />;
      case 'no_booking': return <Target className="w-8 h-8 md:w-10 md:h-10 text-brand-400" />;
      default: return <MessageCircle className="w-8 h-8 md:w-10 md:h-10 text-brand-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg text-slate-100 font-sans selection:bg-brand-500 selection:text-white pb-20">
      
      {/* 1. Hero */}
      <section className="relative pt-24 md:pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center flex flex-col justify-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
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
          
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 mb-8 max-w-2xl mx-auto transition-colors hover:border-slate-700">
            <p className="text-lg text-slate-300 font-medium whitespace-pre-line leading-relaxed">
              {siteContent.hero.boundary}
            </p>
          </div>
          
          <p className="text-lg md:text-xl text-brand-300/80 mb-12 font-bold whitespace-pre-line">
            {siteContent.hero.softPermission}
          </p>

          <button 
            onClick={() => document.getElementById('diagnostic')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-white transition-all duration-300 bg-brand-600 border border-brand-500 rounded-2xl hover:bg-brand-500 shadow-[0_0_20px_rgba(var(--brand-500),0.3)] hover:shadow-[0_0_40px_rgba(var(--brand-500),0.5)] hover:-translate-y-1 focus:outline-none"
          >
            <span className="tracking-wide">{siteContent.hero.ctaText}</span>
            <ChevronRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </section>

      {/* 2. Affinity */}
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
              <p className="text-lg text-slate-300 leading-relaxed whitespace-pre-line font-medium mb-6">
                {siteContent.affinity.closing}
              </p>
              <p className="text-xl text-brand-400 font-bold whitespace-pre-line leading-relaxed">
                {siteContent.affinity.closing2}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Compressed Views */}
      <section className="py-20 bg-[#05080f] border-b border-slate-800/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {siteContent.compressedViews.map((view, idx) => (
               <div key={idx} className="bg-slate-900/40 p-8 rounded-2xl border border-slate-800/60 hover:border-slate-700 transition-colors">
                 <h3 className="text-xl font-bold text-brand-400 mb-4 leading-snug">{view.title}</h3>
                 <p className="text-base text-slate-300 leading-relaxed font-medium whitespace-pre-line">{view.description}</p>
               </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Core Proposition */}
      <section className="py-28 bg-black border-b border-slate-800 relative shadow-2xl">
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

      {/* 5. Progress Hint 1 */}
      <div className="bg-brand-900/10 border-b border-brand-500/20 py-8 text-center px-4">
         <p className="text-brand-400 font-bold text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            {siteContent.progressHints[0]}
         </p>
      </div>

      {/* 6. New Model */}
      <section className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center whitespace-pre-line leading-tight">{siteContent.newModel.title}</h2>
        <div className="max-w-3xl mx-auto">
          <p className="text-xl text-slate-400 text-center whitespace-pre-line mb-12 font-medium">
            {siteContent.newModel.description}
          </p>
          <div className="space-y-6">
            {siteContent.newModel.steps.map((step, idx) => (
               <div key={idx} className="bg-[#0a0f18] p-8 rounded-2xl border border-slate-800 relative text-center sm:text-left flex flex-col sm:flex-row items-center sm:items-start transition-colors hover:border-slate-700">
                 <div className="text-5xl font-black text-slate-800 mr-6 mb-4 sm:mb-0">0{idx+1}</div>
                 <div>
                   <h3 className="text-2xl font-bold text-brand-400 mb-3">{step.name}</h3>
                   <p className="text-slate-300 text-lg">{step.desc}</p>
                 </div>
               </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Results Scenario */}
      <section className="py-24 bg-[#05080f] border-y border-slate-800/50">
        <div className="text-center max-w-5xl mx-auto px-4 lg:px-8">
           <h2 className="text-3xl font-bold text-white mb-10">{siteContent.resultsScenario.title}</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {siteContent.resultsScenario.bullets.map((b, i) => (
                 <div key={i} className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 flex items-start text-left hover:border-slate-600 transition-colors">
                    <CheckCircle2 className="w-6 h-6 text-brand-500 mr-4 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300 text-lg leading-relaxed">{b}</span>
                 </div>
              ))}
           </div>
           <p className="text-2xl text-brand-400 font-bold whitespace-pre-line leading-relaxed pb-8">{siteContent.resultsScenario.closing}</p>
        </div>
      </section>

      {/* 8. Mid-Page Objections */}
      <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900/50 rounded-[2rem] p-8 sm:p-12 border border-slate-800">
           <h3 className="text-2xl sm:text-3xl font-bold text-white mb-10 text-center">{siteContent.midPageObjections.title}</h3>
           <div className="space-y-8">
              {siteContent.midPageObjections.items.map((item, idx) => (
                 <div key={idx}>
                    <h4 className="text-xl font-bold text-slate-200 mb-3 flex items-start">
                       <HelpCircle className="w-6 h-6 text-slate-500 mr-3 mt-0.5 flex-shrink-0" />
                       {item.question}
                    </h4>
                    <p className="text-lg text-slate-400 pl-9 leading-relaxed whitespace-pre-line font-medium border-l-[3px] border-brand-500/30 ml-[11px] py-2">
                       {item.answer}
                    </p>
                 </div>
              ))}
           </div>
        </div>
      </section>

      {/* 9. Friction Objection */}
      <section className="pt-24 pb-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center border-t border-slate-800/50">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-slate-200 leading-tight">
          {siteContent.frictionObjection.title}
        </h2>
        <p className="text-xl text-slate-400 leading-relaxed whitespace-pre-line max-w-3xl mx-auto font-medium">
          {siteContent.frictionObjection.description}
        </p>
      </section>

      {/* 10. Diagnostic (painPoints 互動診斷) */}
      <section id="diagnostic" className="pb-32 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {painPoints.map((pt) => {
             const isExpanded = expandedPoint === pt.id;
             const isDeep = deepExpanded[pt.id];

             return (
              <div 
                key={pt.id}
                onClick={() => handlePointClick(pt.id)}
                className={`group rounded-2xl transition-all duration-300 transform cursor-pointer border ${
                  isExpanded ? 'bg-slate-900 border-brand-500/50 shadow-lg' : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
                }`}
              >
                <div className="p-6 md:p-8 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`mr-6 transition-transform duration-500 ${isExpanded ? 'scale-110' : 'scale-100 group-hover:scale-110'}`}>
                      {getIcon(pt.id)}
                    </div>
                    <div className="text-left font-bold text-xl md:text-2xl text-slate-200 group-hover:text-white transition-colors">
                      {pt.title}
                    </div>
                  </div>
                  <ChevronDown className={`w-8 h-8 text-slate-500 transition-transform duration-500 ${isExpanded ? 'rotate-180 text-brand-400' : ''}`} />
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="border-t border-slate-800 bg-slate-800/20 px-8 py-8 rounded-b-xl cursor-default"
                      onClick={(e) => e.stopPropagation()} // Prevent collapse when clicking inside
                    >
                      {/* Layer 1: Short Desc + Positive Feedback */}
                      <p className="text-xl text-slate-200 font-medium mb-6 leading-relaxed">
                        {pt.shortDescription}
                      </p>
                      <div className="mb-8 bg-brand-900/10 border-l-4 border-brand-500 p-5 rounded-r-lg">
                         <p className="text-lg text-brand-300 font-bold">{pt.positiveFeedback}</p>
                      </div>
                      
                      {/* FollowUp Question -> Deep Expand trigger */}
                      {!isDeep && (
                        <div>
                          <h4 className="text-xl font-bold text-white mb-6 flex items-center">
                            <MessageCircle className="w-5 h-5 text-brand-400 mr-3" />
                            {pt.followUp.question}
                          </h4>
                          <div className="space-y-4">
                            {pt.followUp.options.map((opt, oIdx) => (
                              <button 
                                key={oIdx}
                                onClick={(e) => handleDeepExpand(pt.id, e)}
                                className="w-full text-left p-4 rounded-xl border border-slate-700 bg-slate-800 text-slate-300 hover:bg-brand-900/20 hover:border-brand-500/50 hover:text-white transition-all text-lg font-medium group/btn flex justify-between items-center"
                              >
                                {opt}
                                <ChevronRight className="w-5 h-5 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Layer 2: Deep Dive (Micro-Diagnosis) */}
                      <AnimatePresence>
                        {isDeep && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                          >
                             <div className="bg-[#05080f] border border-brand-500/30 p-6 md:p-8 rounded-2xl relative shadow-xl">
                               <h5 className="text-sm font-bold tracking-widest text-brand-500 mb-5 uppercase flex items-center">
                                 <Target className="w-4 h-4 mr-2" /> 深入診斷回饋
                               </h5>
                               <p className="text-lg text-brand-300 font-bold mb-5 whitespace-pre-line leading-relaxed">
                                 {pt.affirmativeGuidance}
                               </p>
                               <p className="text-lg text-slate-200 leading-relaxed whitespace-pre-line mb-6 font-medium">
                                 {pt.microDiagnosis}
                               </p>
                               
                               <p className="text-lg text-slate-400 italic mb-8 border-t border-slate-700/60 pt-6 whitespace-pre-line font-medium leading-relaxed">
                                 {pt.microDiagnosisBridge}
                               </p>
                               
                               <div className="mb-10 p-5 bg-brand-900/10 rounded-xl border border-brand-500/20">
                                  <p className="text-brand-400 font-bold flex items-start leading-relaxed whitespace-pre-line">
                                     <CheckCircle2 className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
                                     {pt.progressSense}
                                  </p>
                               </div>

                               <button
                                 onClick={(e) => {
                                   e.stopPropagation();
                                   document.getElementById('micro-evidence')?.scrollIntoView({ behavior: 'smooth' });
                                 }}
                                 className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-5 px-6 rounded-xl flex items-center justify-center transition-colors shadow-lg"
                               >
                                 <span className="text-lg">{pt.recommendedNextStep}</span>
                                 <ChevronRight className="w-5 h-5 ml-2" />
                               </button>
                             </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* 11. Micro Evidence */}
      <section id="micro-evidence" className="py-24 bg-dark-bg border-y border-slate-800/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-2xl text-center font-bold text-slate-400 mb-12">{siteContent.microEvidence.title}</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {siteContent.microEvidence.items.map((item, idx) => (
                 <div key={idx} className="bg-slate-900 p-8 rounded-2xl border-l-4 border-slate-700 flex flex-col justify-center text-left hover:border-brand-500 transition-colors shadow-md">
                    <span className="text-xs text-brand-500 font-bold uppercase tracking-wider mb-4 pb-4 border-b border-slate-800">現場切片 {idx + 1}</span>
                    <p className="text-lg text-slate-300 leading-relaxed font-medium">
                       {item.content}
                    </p>
                 </div>
              ))}
           </div>
           
           {/* Folded Long Evidence (Downgraded) */}
           <div className="max-w-3xl mx-auto">
             <details className="group bg-slate-900/50 border border-slate-800 rounded-2xl cursor-pointer shadow-lg overflow-hidden transition-all duration-300">
               <summary className="font-bold text-lg text-slate-400 py-5 px-6 flex justify-between items-center group-hover:text-slate-300 list-none">
                 <span>看看這些破口背後的底層判斷邏輯</span>
                 <ChevronDown className="w-5 h-5 text-slate-500 group-open:rotate-180 transition-transform" />
               </summary>
               <div className="p-6 pt-2 border-t border-slate-800 text-left bg-dark-bg">
                 <h3 className="text-2xl font-bold mb-6 text-white whitespace-pre-line">{siteContent.evidence.title}</h3>
                 <p className="text-slate-300 text-lg leading-relaxed whitespace-pre-line mb-8">
                   {siteContent.evidence.description}
                 </p>
                 <p className="text-lg text-brand-400 font-bold leading-relaxed whitespace-pre-line mb-8">
                   {siteContent.evidence.supportLine}
                 </p>
                 <div className="p-5 bg-slate-900/80 rounded-xl border border-slate-700">
                   <p className="text-sm md:text-base text-slate-400 leading-relaxed whitespace-pre-line">
                     <span className="font-bold text-slate-200 block mb-2">平台訊號與底層邏輯：</span>
                     {siteContent.evidence.microProof}
                   </p>
                 </div>
               </div>
             </details>
           </div>
        </div>
      </section>

      {/* 12. FAQ (異議處理) */}
      <section id="faq" className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white">除了這些，<br className="sm:hidden" />你可能也有的心理掙扎</h2>
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
                <span className="font-bold text-xl text-slate-200 group-hover:text-brand-400 transition-colors pr-8 leading-snug">{faq.question}</span>
                <ChevronRight 
                  className={`w-6 h-6 text-slate-500 transition-transform duration-300 mt-0.5 flex-shrink-0 ${
                    activeFaq === faq.id ? 'rotate-90 text-brand-400' : 'rotate-0'
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
                    <div className="pb-8 pt-2 text-slate-400 text-lg leading-relaxed whitespace-pre-line font-medium border-l-[3px] border-brand-500/20 pl-4 ml-2">
                       {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* 13. Progress Hint 2 */}
      <div className="bg-brand-900/10 border-y border-brand-500/20 py-8 text-center px-4">
         <p className="text-brand-400 font-bold text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            {siteContent.progressHints[1]}
         </p>
      </div>

      {/* 14. Micro Commitment + 15. Final CTA */}
      <section ref={ctaRef} className="pt-20 pb-32 bg-gradient-to-b from-dark-bg to-brand-900/5 text-center px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-4xl mx-auto">
          {/* Micro Commitment */}
          <div className="mb-14 p-8 bg-slate-900/60 rounded-2xl border border-brand-500/20 shadow-[0_0_40px_rgba(0,185,0,0.05)] mx-auto max-w-2xl bg-gradient-to-b from-slate-900/80 to-slate-900/40">
             <h3 className="text-2xl font-bold text-brand-400 mb-6">{siteContent.microCommitment.title}</h3>
             <p className="text-xl text-slate-200 leading-relaxed whitespace-pre-line font-bold">
               {siteContent.microCommitment.description}
             </p>
          </div>

          {/* Final CTA */}
          <div className="py-12 px-6 sm:p-14 rounded-[2.5rem] relative overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl">
            <h3 className="text-3xl sm:text-4xl font-bold mb-6 text-white relative z-10">{siteContent.finalCta.title}</h3>
            
            <p className="text-xl sm:text-2xl text-slate-200 mb-10 leading-relaxed whitespace-pre-line max-w-2xl mx-auto relative z-10 font-bold">
              {siteContent.finalCta.description}
            </p>

            <div className="bg-red-900/10 border-l-4 border-red-500/50 p-5 mb-10 text-left w-full max-w-2xl mx-auto relative z-10 rounded-r-xl">
              <p className="text-red-200 font-medium text-lg leading-relaxed">
                {siteContent.finalCta.directContactReason}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10 mb-8 mx-auto w-full max-w-3xl">
              <button 
                onClick={handleFinalCtaClick}
                className="group relative inline-flex items-center justify-center px-6 py-5 w-full sm:flex-1 text-lg sm:text-xl font-bold text-white transition-all duration-300 bg-brand-600 border border-brand-500 rounded-2xl hover:bg-brand-500 shadow-[0_0_20px_rgba(var(--brand-500),0.3)] hover:-translate-y-1 focus:outline-none"
              >
                <Target className="w-6 h-6 mr-3 flex-shrink-0" />
                <span className="truncate">{siteContent.finalCta.buttonText}</span>
              </button>
              
              <div className="w-full sm:flex-1 relative mt-4 sm:mt-0">
                <a 
                  href="tel:0900000000"
                  className="group relative inline-flex items-center justify-center px-5 py-5 w-full text-lg font-bold text-slate-300 transition-all duration-300 bg-slate-800 border border-slate-700 rounded-2xl hover:bg-slate-700 hover:text-white hover:-translate-y-1 focus:outline-none text-center"
                >
                  <MessageCircle className="w-5 h-5 mr-3" />
                  <span className="truncate">{siteContent.finalCta.phoneCtaText}</span>
                </a>
              </div>
            </div>
            
            <div className="mt-8 p-5 bg-slate-800/40 rounded-xl max-w-2xl mx-auto relative z-10">
               <p className="text-base text-brand-300/80 font-bold whitespace-pre-line leading-relaxed">
                 {siteContent.finalCta.lowRiskHint}
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-slate-600 text-sm">
        <p>© {new Date().getFullYear()} 獲客漏斗重建系統 | 成熟流量轉化</p>
      </footer>
    </div>
  );
};
