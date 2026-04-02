import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, BrainCircuit, CheckCircle2, ChevronRight, ChevronDown } from 'lucide-react';
import { painPoints } from '../content/painPoints';
import { siteContent } from '../content/siteContent';
import { faqs } from '../content/faq';
import { DualCTA } from '../components/DualCTA';
import { useAppStore } from '../store/useAppStore';
import { Footer } from '../components/Footer';

export const SituationPage = () => {
  const { painId, optionId } = useParams();
  const navigate = useNavigate();
  const [showStickyCta, setShowStickyCta] = useState(false);
  const [activeFaq, setActiveFaq] = useState<string | null>(null);
  const inlineCtaRef = useRef<HTMLDivElement>(null);

  const painPoint = painPoints.find((p) => p.id === painId);
  const option = painPoint?.followUp.options.find((o) => o.id === optionId);

  const progressDescriptions = [
    '先把客戶看到你時，心裡真正的判斷與退縮點攤開。',
    '再把真正吃掉成交的那一段，明確抓出來。',
    '最後才決定先動廣告、頁面，還是承接流程。'
  ];

  useEffect(() => {
    if (!painPoint || !option) {
      navigate('/');
    } else {
      useAppStore.getState().setPainPoint(painId || null);
      useAppStore.getState().setFollowUpOption(optionId || null);
    }
  }, [painPoint, option, navigate, painId, optionId]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        if (inlineCtaRef.current) {
          const rect = inlineCtaRef.current.getBoundingClientRect();
          if (rect.top <= window.innerHeight && rect.bottom >= 0) {
            setShowStickyCta(false);
          } else {
            setShowStickyCta(true);
          }
        } else {
          setShowStickyCta(true);
        }
      } else {
        setShowStickyCta(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!painPoint || !option) return null;

  return (
    <div className="min-h-screen bg-dark-bg text-slate-100 font-sans selection:bg-brand-500 selection:text-white pb-20 pt-10">
      {/* 頂部導航 */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <button
          onClick={() => navigate(`/path/${painId}`)}
          className="flex items-center text-slate-400 hover:text-white transition-colors font-medium border border-slate-700/50 bg-slate-800/20 px-4 py-2 rounded-full"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          回上一步
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. 接手點：不是單純安撫，而是接手成交問題 */}
        <section className="mb-12">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-brand-900/20 border border-brand-500/20 text-brand-300 text-sm font-medium tracking-wide">
            AI 模擬決策初步判斷
          </div>

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
            你選的不是一個選項。<br />
            這通常就是成交開始卡住的地方。
          </h1>

          <p className="text-lg md:text-xl text-slate-400 leading-relaxed whitespace-pre-line max-w-3xl">
            你剛剛選的是：
            <span className="text-slate-200 font-bold">「{option.text}」</span>
            {'\n'}
            這代表你現在遇到的，通常不是單一文案問題，而是某一段決策路徑正在漏掉成交。
          </p>

          <div className="mt-8 bg-slate-900/60 border border-slate-800 rounded-[2rem] p-8 md:p-10 shadow-xl">
            <div className="text-sm font-bold tracking-widest text-brand-500 mb-4 uppercase">
              目前比較像
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-5 leading-tight">
              {painPoint.title}
            </h2>
            <p className="text-xl md:text-2xl text-slate-200 font-bold leading-relaxed whitespace-pre-line mb-5">
              {painPoint.positiveFeedback}
            </p>
            <p className="text-lg text-slate-400 leading-relaxed whitespace-pre-line">
              {siteContent.progressHints[0]}
            </p>
          </div>
        </section>

        {/* 2. 診斷與轉折 */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-[#05080f] border border-brand-500/30 p-8 md:p-12 rounded-[2.5rem] relative shadow-2xl"
          >
            <h5 className="text-sm font-bold tracking-widest text-brand-500 mb-6 uppercase flex items-center">
              <BrainCircuit className="w-5 h-5 mr-3" />
              我現在先從這個成交卡點接手
            </h5>

            <p className="text-xl md:text-2xl text-brand-300 font-bold mb-8 whitespace-pre-line leading-relaxed border-b border-slate-800/60 pb-8">
              {painPoint.affirmativeGuidance}
            </p>

            <div className="space-y-6">
              <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 md:p-8">
                <div className="text-sm font-bold tracking-widest text-brand-500 mb-4 uppercase">
                  我看到的是
                </div>
                <p className="text-lg md:text-xl text-slate-200 leading-relaxed whitespace-pre-line font-medium">
                  {painPoint.microDiagnosis}
                </p>
              </div>

              {painPoint.microDiagnosisBridge && (
                <div className="bg-red-900/10 border-l-4 border-red-500/50 p-6 rounded-r-xl">
                  <p className="text-lg md:text-xl text-red-200 font-bold italic whitespace-pre-line leading-relaxed">
                    {painPoint.microDiagnosisBridge}
                  </p>
                </div>
              )}

              <div className="p-6 bg-brand-900/15 rounded-2xl border border-brand-500/20">
                <p className="text-lg md:text-xl text-brand-400 font-bold flex items-start leading-relaxed whitespace-pre-line">
                  <CheckCircle2 className="w-6 h-6 mr-3 flex-shrink-0 mt-0.5" />
                  {painPoint.progressSense}
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* 3. 把對方帶進下一步，不急著硬推 */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <p className="text-brand-400 font-bold text-lg mb-4">
              現在先不要急著做很多
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
              接下來，簡單的優化，先做這三件事
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed whitespace-pre-line max-w-3xl mx-auto">
              {siteContent.progressHints[1]}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {siteContent.progressSteps.map((step, idx) => (
              <div
                key={step.id}
                className="bg-slate-900/60 border border-slate-800 rounded-3xl p-7 shadow-xl"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-900/30 border border-brand-500/20 flex items-center justify-center text-brand-400 text-xl font-black mb-5">
                  {idx + 1}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 leading-snug">
                  {step.label}
                </h3>
                <p className="text-slate-400 text-lg leading-relaxed">
                  {progressDescriptions[idx]}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. 異議處理與收斂 */}
        <section className="mb-16 bg-slate-900/60 rounded-[2.5rem] p-8 md:p-12 border border-slate-800 text-center shadow-xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-slate-200 leading-tight whitespace-pre-line">
            {siteContent.frictionObjection.title}
          </h2>
          <p className="text-lg md:text-xl text-slate-400 leading-relaxed whitespace-pre-line mx-auto font-medium">
            {siteContent.frictionObjection.description}
          </p>
        </section>

        {/* 5. Inline CTA */}
        <div ref={inlineCtaRef}>
          <DualCTA />
        </div>
      </div>

      {/* 防禦性內容 */}
      <div className="mt-32 border-t border-slate-800/80 bg-dark-bg pt-20">
        {/* Core Proposition */}
        <section className="py-20 mb-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-xl sm:text-2xl text-slate-400 font-medium leading-relaxed mb-6 whitespace-pre-line">
              {siteContent.coreProposition.setup}
            </h2>
            <div className="text-2xl sm:text-4xl font-extrabold leading-tight text-white whitespace-pre-line">
              {siteContent.coreProposition.main}
            </div>
          </div>
        </section>

        {/* New Model */}
        <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center whitespace-pre-line leading-tight">
            {siteContent.newModel.title}
          </h2>
          <div className="space-y-6">
            {siteContent.newModel.steps.map((step, idx) => (
              <div
                key={idx}
                className="bg-[#0a0f18] p-8 rounded-2xl border border-slate-800 relative flex flex-col sm:flex-row items-start transition-colors"
              >
                <div className="text-4xl font-black text-slate-800 mr-6 mb-4 sm:mb-0">
                  0{idx + 1}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-brand-400 mb-3">
                    {step.name}
                  </h3>
                  <p className="text-slate-300 text-lg">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Evidence */}
        <section className="py-24 bg-[#05080f] border-y border-slate-800/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl text-center font-bold text-slate-400 mb-12">
              {siteContent.microEvidence.title}
            </h2>

            <details className="group bg-slate-900/50 border border-slate-800 rounded-2xl cursor-pointer shadow-lg overflow-hidden transition-all duration-300">
              <summary className="font-bold text-lg text-slate-400 py-6 px-8 flex justify-between items-center group-hover:text-slate-300 list-none">
                <span>看看這些背後的底層判斷邏輯</span>
                <ChevronDown className="w-5 h-5 text-slate-500 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="p-8 pt-4 border-t border-slate-800 text-left bg-dark-bg">
                <h3 className="text-2xl font-bold mb-6 text-white whitespace-pre-line">
                  {siteContent.evidence.title}
                </h3>
                <p className="text-slate-300 text-lg leading-relaxed whitespace-pre-line mb-8 font-medium">
                  {siteContent.evidence.description}
                </p>
                <p className="text-lg text-brand-400 font-bold leading-relaxed whitespace-pre-line mb-8">
                  {siteContent.evidence.supportLine}
                </p>
                <div className="p-6 bg-slate-900/80 rounded-xl border border-slate-700">
                  <p className="text-base text-slate-400 leading-relaxed whitespace-pre-line">
                    <span className="font-bold text-slate-200 block mb-2">
                      平台訊號與底層邏輯：
                    </span>
                    {siteContent.evidence.microProof}
                  </p>
                </div>
              </div>
            </details>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white">
              除了這些，<br className="sm:hidden" />
              你可能也正在想這些事
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.id} className="border-b border-slate-800 overflow-hidden">
                <button
                  className="w-full py-6 text-left flex justify-between items-start focus:outline-none group"
                  onClick={() => setActiveFaq(activeFaq === faq.id ? null : faq.id)}
                >
                  <span className="font-bold text-xl text-slate-200 group-hover:text-brand-400 transition-colors pr-8 leading-snug">
                    {faq.question}
                  </span>
                  <ChevronRight
                    className={`w-6 h-6 text-slate-500 transition-transform duration-300 mt-0.5 flex-shrink-0 ${activeFaq === faq.id ? 'rotate-90 text-brand-400' : 'rotate-0'
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
      </div>

      <Footer />

      {/* Sticky CTA */}
      <div
        className={`transition-all duration-300 ease-in-out pointer-events-none ${showStickyCta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
      >
        <DualCTA isSticky={true} />
      </div>
    </div>
  );
};