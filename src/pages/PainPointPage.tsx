import { useParams, useNavigate } from 'react-router-dom';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { painPoints } from '../content/painPoints';

export const PainPointPage = () => {
  const { painId } = useParams();
  const navigate = useNavigate();

  const painPoint = painPoints.find(p => p.id === painId);

  // 防護: 找不到就回首頁
  if (!painPoint) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-dark-bg text-slate-100 font-sans selection:bg-brand-500 selection:text-white pb-20 pt-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 返回首頁 */}
        <button 
          onClick={() => navigate('/')}
          className="flex items-center text-slate-400 hover:text-white transition-colors mb-12 font-medium"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          重選其他狀況
        </button>

        <div className="mb-12">
          {/* 接住情緒 */}
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-brand-900/30 border border-brand-500/30 text-brand-300 text-sm font-medium tracking-wide">
            好，我們先抓出最卡的那一段
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-8 leading-tight">
            你現在比較像這個狀況：<br className="sm:hidden" />
            <span className="text-brand-400">{painPoint.title}</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 font-medium whitespace-pre-line leading-relaxed border-l-4 border-slate-700 pl-6">
            {painPoint.shortDescription}
          </p>
        </div>

        {/* 給兩個/多個 Follow Up 選項 */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl">
          <h3 className="text-2xl font-bold text-white mb-8 border-b border-slate-800 pb-6 whitespace-pre-line">
            {painPoint.followUp.question}
          </h3>
          <div className="space-y-4">
            {painPoint.followUp.options.map((opt) => (
              <button 
                key={opt.id}
                onClick={() => navigate(`/path/${painId}/${opt.id}`)}
                className="w-full text-left p-6 sm:px-8 sm:py-6 rounded-2xl border border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-brand-900/20 hover:border-brand-500/50 hover:text-white transition-all text-lg sm:text-xl font-bold group/btn flex justify-between items-center shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                <span>{opt.text}</span>
                <ChevronRight className="w-6 h-6 opacity-50 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 group-hover/btn:text-brand-400 transition-all flex-shrink-0 ml-4" />
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
