import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ChevronRight, MessageCircle, Activity, TrendingDown, Target } from 'lucide-react';
import { siteContent } from '../content/siteContent';
import { painPoints } from '../content/painPoints';

export const HomePage = () => {
  const navigate = useNavigate();

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
            <span className="tracking-wide">往下看看哪種狀況最像你</span>
            <ChevronRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </section>

      {/* 2. Affinity (精簡版) */}
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
        </div>
      </section>

      {/* 3. Diagnostic (只留四張卡，點擊直接換頁) */}
      <section id="diagnostic" className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
           <h2 className="text-3xl font-bold text-white mb-4">點擊一個你現在最有感的狀況：</h2>
        </div>
        <div className="space-y-6">
          {painPoints.map((pt) => {
             return (
              <div 
                key={pt.id}
                onClick={() => navigate(`/path/${pt.id}`)}
                className="group rounded-2xl transition-all duration-300 transform cursor-pointer border bg-slate-900/50 border-slate-800 hover:border-brand-500/50 hover:bg-slate-900/80 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="p-6 md:p-8 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-6 transition-transform duration-500 scale-100 group-hover:scale-110">
                      {getIcon(pt.id)}
                    </div>
                    <div className="text-left font-bold text-xl md:text-2xl text-slate-200 group-hover:text-white transition-colors">
                      {pt.title}
                    </div>
                  </div>
                  <ChevronRight className="w-8 h-8 text-slate-500 transition-transform duration-300 group-hover:translate-x-2 group-hover:text-brand-400" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-slate-600 text-sm">
        <p>© {new Date().getFullYear()} 獲客漏斗重建系統 | 成熟流量轉化</p>
      </footer>
    </div>
  );
};
