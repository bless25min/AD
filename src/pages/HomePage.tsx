import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  ChevronRight,
  MessageCircle,
  Activity,
  TrendingDown,
  Target,
  BrainCircuit
} from 'lucide-react';
import { siteContent } from '../content/siteContent';
import { painPoints } from '../content/painPoints';
import { Footer } from '../components/Footer';

export const HomePage = () => {
  const navigate = useNavigate();

  const getIcon = (id: string) => {
    switch (id) {
      case 'traffic_drop':
        return <TrendingDown className="w-8 h-8 md:w-10 md:h-10 text-brand-400" />;
      case 'high_bounce':
        return <Activity className="w-8 h-8 md:w-10 md:h-10 text-brand-400" />;
      case 'no_booking':
        return <Target className="w-8 h-8 md:w-10 md:h-10 text-brand-400" />;
      default:
        return <MessageCircle className="w-8 h-8 md:w-10 md:h-10 text-brand-400" />;
    }
  };

  const engineSteps = [
    {
      icon: <BrainCircuit className="w-8 h-8 text-brand-400" />,
      title: '先模擬客戶怎麼想',
      description:
        '不是先猜，也不是先改頁面。先看懂客戶看到你時，第一眼怎麼判斷、怎麼懷疑、怎麼退縮。'
    },
    {
      icon: <Activity className="w-8 h-8 text-brand-400" />,
      title: '再找成交卡在哪',
      description:
        '把問題分清楚：是前端切入失焦、頁面第一眼沒接住、最後一步太重，還是 LINE 前教育根本不夠。'
    },
    {
      icon: <CheckCircle2 className="w-8 h-8 text-brand-400" />,
      title: '最後決定先動哪一段',
      description:
        '先決定最值得先改的地方，再去動廣告、頁面、承接流程。不是亂改一輪，看有沒有運氣。'
    }
  ];

  return (
    <div className="min-h-screen bg-dark-bg text-slate-100 font-sans selection:bg-brand-500 selection:text-white pb-20">
      {/* 1. Hero */}
      <section className="relative pt-24 md:pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 text-sm font-medium tracking-wide">
            {siteContent.hero.positioning}
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-8 leading-tight whitespace-pre-line">
            {siteContent.hero.title}
          </h1>

          <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-8 text-brand-400 whitespace-pre-line leading-relaxed">
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

      {/* 2. Engine Intro */}
      <section className="py-16 bg-[#0a0f18] border-y border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-brand-400 font-bold text-lg mb-4">
              不需要猜測亂改碰運氣
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
              先看懂客戶怎麼想，再決定怎麼做
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed max-w-3xl mx-auto">
              很多公司是每次都從錯的地方補問題。你現在需要的是先把客戶心裡想法看清楚。
            </p>
          </div>

          {/* AI Persona Screenshots Demo Block */}
          <div className="mb-20">
             <div className="relative group rounded-3xl overflow-hidden border border-slate-700/50 shadow-[0_0_40px_rgba(100,116,139,0.1)] bg-slate-900/40 p-6 md:p-10">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-600 via-brand-400 to-transparent opacity-50 block"></div>
                <h3 className="text-xl md:text-2xl font-bold text-slate-200 mb-8 text-center flex flex-col sm:flex-row items-center justify-center">
                   <BrainCircuit className="w-6 h-6 text-brand-500 mb-2 sm:mb-0 sm:mr-3" />
                   AI 模擬不同客群視角的內心劇場 (系統真實運算截圖)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <div className="rounded-xl overflow-hidden border border-slate-700/80 shadow-lg group-hover:-translate-y-1 transition-transform duration-500 delay-75 relative bg-slate-800">
                     <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent pointer-events-none z-10"></div>
                     <img src="/ai-persona-1.png" alt="AI模擬對話-群像1" className="w-full h-auto object-cover relative z-0" />
                   </div>
                   <div className="rounded-xl overflow-hidden border border-slate-700/80 shadow-lg group-hover:-translate-y-1 transition-transform duration-500 delay-150 relative bg-slate-800">
                     <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent pointer-events-none z-10"></div>
                     <img src="/ai-persona-2.png" alt="AI模擬對話-群像2" className="w-full h-auto object-cover relative z-0" />
                   </div>
                   <div className="rounded-xl overflow-hidden border border-slate-700/80 shadow-lg group-hover:-translate-y-1 transition-transform duration-500 delay-200 relative bg-slate-800">
                     <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent pointer-events-none z-10"></div>
                     <img src="/ai-persona-3.png" alt="AI模擬對話-群像3" className="w-full h-auto object-cover relative z-0" />
                   </div>
                </div>
                <p className="text-center text-slate-400 text-sm md:text-base mt-8 font-medium">看見客戶的猶豫與痛點，我們才能對症下藥，修正成交流程。</p>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {engineSteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-slate-900/60 border border-slate-800 rounded-3xl p-7 shadow-xl"
              >
                <div className="mb-5">{step.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4 leading-snug">
                  {step.title}
                </h3>
                <p className="text-slate-400 text-lg leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Affinity */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center sm:text-left">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-300 whitespace-pre-line leading-tight">
            {siteContent.affinity.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {siteContent.affinity.requirements.map((req, idx) => (
            <div key={idx} className="flex items-start bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
              <CheckCircle2 className="w-6 h-6 text-brand-500 mr-4 flex-shrink-0 mt-0.5" />
              <span className="text-lg text-slate-200 leading-snug">{req}</span>
            </div>
          ))}
        </div>

        <div className="border-l-4 border-brand-500/40 pl-6 py-2">
          <p className="text-xl md:text-2xl text-slate-200 font-bold leading-relaxed whitespace-pre-line mb-4">
            {siteContent.affinity.closing}
          </p>
          <p className="text-lg text-slate-400 font-medium leading-relaxed whitespace-pre-line">
            {siteContent.affinity.closing2}
          </p>
        </div>
      </section>

      {/* 4. Old Method Breakdown */}
      <section className="py-20 bg-[#05080f] border-y border-slate-800/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-brand-400 font-bold text-lg mb-4">
              在錯的地方補問題，卻祈求獲得好的結果是很困難的
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white whitespace-pre-line leading-tight">
              {siteContent.coreProposition.main}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {siteContent.compressedViews.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-900/50 border border-slate-800 rounded-3xl p-7 shadow-lg"
              >
                <h3 className="text-2xl font-bold text-slate-200 mb-4 leading-snug">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-lg leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Diagnostic */}
      <section id="diagnostic" className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-brand-400 font-bold text-lg mb-4">
            先別急著換廣告素材、換行銷公司
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">
            先看你的成交，對客戶來說卡在哪一段
          </h2>
          <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-3xl mx-auto">
            先幫你分清楚，你現在最該優化的是哪裡。
          </p>
        </div>

        <div className="space-y-6">
          {painPoints.map((pt) => (
            <div
              key={pt.id}
              onClick={() => navigate(`/path/${pt.id}`)}
              className="group rounded-2xl transition-all duration-300 transform cursor-pointer border bg-slate-900/50 border-slate-800 hover:border-brand-500/50 hover:bg-slate-900/80 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center">
                  <div className="mb-4 sm:mb-0 sm:mr-6 transition-transform duration-500 scale-100 group-hover:scale-110">
                    {getIcon(pt.id)}
                  </div>
                  <div>
                    <div className="text-left font-bold text-xl md:text-2xl text-slate-200 group-hover:text-white transition-colors mb-2">
                      {pt.title}
                    </div>
                    <div className="text-left text-slate-400 text-base md:text-lg leading-relaxed max-w-3xl">
                      {pt.shortDescription}
                    </div>
                  </div>
                </div>

                <div className="inline-flex items-center justify-center px-6 py-3 md:px-5 md:py-2.5 rounded-full border border-brand-500/30 bg-brand-900/20 group-hover:bg-brand-600 group-hover:border-brand-500 transition-all w-full md:w-auto flex-shrink-0 text-brand-400 group-hover:text-white">
                  <span className="text-sm md:text-base font-bold mr-2">點擊開始檢測</span>
                  <ChevronRight className="w-5 h-5 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Final CTA */}
      <section className="pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-slate-900/60 border border-slate-800 rounded-[2rem] p-8 md:p-12 shadow-2xl">
            <p className="text-slate-400 text-lg md:text-xl font-medium whitespace-pre-line leading-relaxed mb-4">
              {siteContent.finalCta.description}
            </p>

            <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
              {siteContent.finalCta.title}
            </h3>

            <p className="text-lg text-slate-300 whitespace-pre-line leading-relaxed max-w-3xl mx-auto mb-10">
              {siteContent.finalCta.lowRiskHint}
            </p>

            <button
              onClick={() => document.getElementById('diagnostic')?.scrollIntoView({ behavior: 'smooth' })}
              className="group inline-flex items-center justify-center px-8 py-4 text-lg md:text-xl font-bold text-white transition-all duration-300 bg-brand-600 border border-brand-500 rounded-2xl hover:bg-brand-500 shadow-[0_0_20px_rgba(var(--brand-500),0.25)] hover:shadow-[0_0_40px_rgba(var(--brand-500),0.45)] hover:-translate-y-1 focus:outline-none"
            >
              <span>{siteContent.finalCta.buttonText}</span>
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}; 