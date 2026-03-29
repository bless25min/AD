import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, MessageCircle } from 'lucide-react';
import { siteContent } from '../content/siteContent';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export const HomePageB = () => {
  const navigate = useNavigate();
  const ctaRef = useRef<HTMLElement>(null);

  const handleFinalCtaClick = () => {
    navigate('/liff');
  };

  return (
    <div className="min-h-screen bg-dark-bg text-slate-100 font-sans selection:bg-brand-500 selection:text-white pb-20">
      {/* 1. Hero 區塊 */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center flex flex-col justify-center">
        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 text-sm font-medium tracking-wide">
            致：需要高信任門檻的預約型服務
          </div>
          <p className="text-brand-400 font-bold text-lg md:text-xl mb-6 tracking-wide">
            {siteContent.hero.positioning}
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight mb-8 leading-tight">
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

      {/* 3. 單一最強講破 (Core Proposition) */}
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

      {/* 4. Results Scenario (結果感模組) */}
      <section className="py-24 bg-[#05080f] border-t border-slate-800/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
           <h2 className="text-3xl font-bold text-white mb-8">{siteContent.resultsScenario.title}</h2>
           <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
              {siteContent.resultsScenario.bullets.map((b, i) => (
                 <div key={i} className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 flex items-start text-left hover:border-slate-600 transition-colors">
                    <CheckCircle2 className="w-6 h-6 text-brand-500 mr-4 flex-shrink-0 mt-1" />
                    <span className="text-slate-300 text-lg leading-relaxed">{b}</span>
                 </div>
              ))}
           </div>
           <p className="text-xl text-brand-400 font-bold whitespace-pre-line leading-relaxed pb-8 border-b border-slate-800 text-center">
             {siteContent.resultsScenario.closing}
           </p>
        </div>
      </section>

      {/* 5. CTA 區塊 */}
      <section ref={ctaRef} className="pt-16 pb-32 bg-gradient-to-b from-dark-bg to-brand-900/5 text-center px-4 sm:px-6 lg:px-8 border-t border-slate-800/80">
        <div className="max-w-4xl mx-auto">
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
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10 mb-8 mx-auto w-full max-w-3xl mt-12">
              <div className="w-full sm:flex-1 relative">
                <a 
                  href="tel:0900000000"
                  className="group relative inline-flex items-center justify-center px-6 py-5 w-full text-xl font-bold text-white transition-all duration-300 bg-[#00B900] border border-[#00B900] rounded-2xl hover:bg-[#009900] shadow-[0_0_20px_rgba(0,185,0,0.2)] hover:shadow-[0_0_40px_rgba(0,185,0,0.4)] hover:-translate-y-1 focus:outline-none"
                >
                  <MessageCircle className="w-6 h-6 mr-3 flex-shrink-0" />
                  <span className="truncate">{siteContent.finalCta.phoneCtaText}</span>
                </a>
                <p className="text-sm text-brand-200/80 font-medium mt-3 whitespace-pre-line leading-relaxed">
                  這通電話不是要你當下做決定。<br />只是先幫你分清楚，問題到底在哪一層。
                </p>
              </div>
              
              <button 
                onClick={handleFinalCtaClick}
                className="group relative self-start mt-0 sm:mt-0 inline-flex items-center justify-center px-5 py-5 w-full sm:w-[40%] text-lg font-bold text-slate-300 transition-all duration-300 bg-slate-800 border border-slate-700 rounded-2xl hover:bg-slate-700 hover:text-white hover:-translate-y-1 focus:outline-none text-center"
              >
                <span className="truncate">先看線上報告</span>
              </button>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
};
