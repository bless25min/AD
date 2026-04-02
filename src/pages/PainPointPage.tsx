import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BrainCircuit, CheckCircle2, ChevronRight } from 'lucide-react';
import { painPoints } from '../content/painPoints';
import { siteContent } from '../content/siteContent';

export const PainPointPage = () => {
  const { painId } = useParams();
  const navigate = useNavigate();

  const painPoint = painPoints.find((p) => p.id === painId);

  const stepDescriptions = [
    '先把客戶看到你時，心裡真正的判斷與退縮點攤開。',
    '再把真正吃掉成交的那一段，往更精準的現場收斂。',
    '最後才決定先動廣告、頁面，還是承接流程。'
  ];

  useEffect(() => {
    if (!painPoint) {
      navigate('/', { replace: true });
    }
  }, [painPoint, navigate]);

  if (!painPoint) return null;

  return (
    <div className="min-h-screen bg-dark-bg text-slate-100 font-sans selection:bg-brand-500 selection:text-white pb-20 pt-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-slate-400 hover:text-white transition-colors mb-10 font-medium border border-slate-700/50 bg-slate-800/20 px-4 py-2 rounded-full"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          回首頁重新看
        </button>

        {/* 1. Header */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-10"
        >
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-brand-900/20 border border-brand-500/20 text-brand-300 text-sm font-medium tracking-wide">
            AI 模擬決策正在收斂
          </div>

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
            先別急著改東西。<br />
            你現在比較像卡在：<br className="sm:hidden" />
            <span className="text-brand-400">{painPoint.title}</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-300 font-medium whitespace-pre-line leading-relaxed max-w-3xl">
            {painPoint.shortDescription}
          </p>
        </motion.section>

        {/* 2. 接手感 */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mb-12 bg-slate-900/60 border border-slate-800 rounded-[2rem] p-8 md:p-10 shadow-2xl"
        >
          <div className="flex items-start">
            <div className="w-12 h-12 rounded-2xl bg-brand-900/20 border border-brand-500/20 flex items-center justify-center mr-4 flex-shrink-0">
              <BrainCircuit className="w-6 h-6 text-brand-400" />
            </div>

            <div>
              <div className="text-sm font-bold tracking-widest text-brand-500 mb-3 uppercase">
                初步判斷
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                這還不是最後答案，<br className="sm:hidden" />
                但方向已經很接近了
              </h2>
              <p className="text-xl md:text-2xl text-slate-200 font-bold leading-relaxed whitespace-pre-line mb-5">
                {painPoint.positiveFeedback}
              </p>
            </div>
          </div>

          <div className="mt-8 border-t border-slate-800 pt-8">
            <p className="text-lg md:text-xl text-slate-400 leading-relaxed whitespace-pre-line">
              {painPoint.detailedDescription}
            </p>
          </div>
        </motion.section>

        {/* 3. 方法感 */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <div className="mb-8 text-center">
            <p className="text-brand-400 font-bold text-lg mb-4">
              我不會看到問題就立刻叫你重做
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
              先把這段成交問題收斂到更準
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed whitespace-pre-line max-w-3xl mx-auto">
              {siteContent.progressHints[0]}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {siteContent.progressSteps.map((step, idx) => (
              <div
                key={step.id}
                className="bg-[#0a0f18] border border-slate-800 rounded-3xl p-7 shadow-xl"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-900/30 border border-brand-500/20 flex items-center justify-center text-brand-400 text-xl font-black mb-5">
                  {idx + 1}
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 leading-snug">
                  {step.label}
                </h3>

                <p className="text-slate-400 text-lg leading-relaxed">
                  {stepDescriptions[idx]}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* 4. Follow-up options */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="bg-[#05080f] border border-brand-500/20 rounded-[2rem] p-8 md:p-10 shadow-2xl"
        >
          <div className="mb-8">
            <div className="inline-flex items-center mb-5 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-sm font-medium tracking-wide">
              先把現場收斂得更精準
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight whitespace-pre-line">
              {painPoint.followUp.question}
            </h3>

            <p className="text-lg text-slate-400 leading-relaxed whitespace-pre-line">
              同樣叫做「{painPoint.title}」，背後真正卡住的位置不一定一樣。
              {'\n'}
              我先幫你把現場分得更細一點，後面才不會亂改。
            </p>
          </div>

          <div className="space-y-4">
            {painPoint.followUp.options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => navigate(`/path/${painId}/${opt.id}`)}
                className="w-full text-left p-6 sm:px-8 sm:py-6 rounded-2xl border border-slate-700 bg-slate-900/50 text-slate-300 hover:bg-slate-800 hover:border-brand-500/50 hover:text-white transition-all group/btn flex flex-col md:flex-row justify-between items-start md:items-center shadow-md hover:shadow-lg hover:-translate-y-1 gap-6 md:gap-4"
              >
                <div>
                  <div className="mb-2 flex items-center text-brand-400 text-sm font-bold tracking-wide">
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    這比較像我現在的現場
                  </div>
                  <span className="text-lg sm:text-xl font-bold leading-snug">{opt.text}</span>
                </div>

                <div className="inline-flex items-center justify-center px-6 py-3 md:px-5 md:py-2.5 rounded-full border border-brand-500/30 bg-brand-900/10 group-hover/btn:bg-brand-600 group-hover/btn:border-brand-500 transition-all w-full md:w-auto relative overflow-hidden flex-shrink-0 text-brand-400 group-hover/btn:text-white">
                  <span className="text-sm md:text-base font-bold mr-2">選擇此現況</span>
                  <ChevronRight className="w-5 h-5 md:w-4 md:h-4 group-hover/btn:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={() => navigate('/')}
            className="mt-8 w-full text-center text-sm text-slate-500 hover:text-slate-300 transition-colors"
          >
            這個不太像，回去重看其他狀況
          </button>
        </motion.section>
      </div>
    </div>
  );
};