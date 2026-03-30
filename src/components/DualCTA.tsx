import { Phone } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

interface DualCTAProps {
  isSticky?: boolean;
}

export const DualCTA = ({ isSticky = false }: DualCTAProps) => {
  const containerBaseClass = "w-full px-4 sm:px-6 z-40 transition-all duration-500 ease-in-out";
  const stickyClass = isSticky 
    ? "fixed bottom-4 left-0 right-0 transform translate-y-0 opacity-100 max-w-4xl mx-auto" 
    : "relative mt-12 mb-8 max-w-4xl mx-auto opacity-100 transform translate-y-0";

  return (
    <div className={`${containerBaseClass} ${stickyClass}`} style={isSticky ? { pointerEvents: 'none' } : {}}>
      <div 
        className={`bg-slate-900/95 backdrop-blur-lg border border-slate-700/80 p-5 sm:p-6 rounded-[2rem] shadow-2xl ${isSticky ? 'pointer-events-auto' : ''}`}
      >
        <div className="flex flex-col sm:flex-row items-center gap-4">
          
          {/* 主按鈕 (LINE) */}
          <button 
            onClick={() => {
              if (typeof window !== 'undefined' && (window as any).fbq) {
                (window as any).fbq('track', 'Lead');
              }
              const liffId = import.meta.env.VITE_LIFF_ID;
              const { selectedPainPoint, selectedFollowUpOption } = useAppStore.getState();
              if (!liffId) {
                window.location.href = '/liff';
                return;
              }
              const params = new URLSearchParams();
              if (selectedPainPoint) params.append('painId', selectedPainPoint);
              if (selectedFollowUpOption) params.append('optionId', selectedFollowUpOption);
              
              const qs = params.toString();
              const liffUrl = `https://liff.line.me/${liffId}${qs ? `?${qs}` : ''}`;
              
              window.location.href = liffUrl;
            }}
            className="w-full relative inline-flex items-center justify-center px-4 py-3 sm:px-6 sm:py-4 text-[15px] sm:text-lg font-bold text-white transition-all duration-300 bg-[#06C755] border border-[#05b04b] rounded-2xl hover:bg-[#05b04b] shadow-[0_0_20px_rgba(6,199,85,0.2)] hover:shadow-[0_0_30px_rgba(6,199,85,0.4)] hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#06C755]/50 leading-snug"
          >
            {/* LINE icon */}
            <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 flex-shrink-0 fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.036 9.608.391.084.922.258 1.057.592.122.302.079.768.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.967 1.739-1.905 2.548-3.844 2.548-5.978zm-14.773 2.144c-.287 0-.518-.231-.518-.518v-3.793c0-.287.231-.518.518-.518s.518.231.518.518v3.275h2.241c.287 0 .518.231.518.518s-.231.518-.518.518h-2.759zm6.155 0c-.287 0-.518-.231-.518-.518v-3.793c0-.287.231-.518.518-.518.288 0 .519.231.519.518v3.793c0 .287-.231.518-.519.518zm3.83-2.617l-2.031-2.457c-.126-.153-.306-.239-.496-.239-.287 0-.518.231-.518.518v3.793c0 .287.231.518.518.518s.518-.231.518-.518v-2.617l2.031 2.457c.126.152.306.238.496.238.287 0 .518-.231.518-.518v-3.793c0-.287-.231-.518-.518-.518s-.518.231-.518.518v2.617zm-10.976-.658h-2.241v-1.159h2.241c.287 0 .518-.231.518-.518s-.231-.518-.518-.518h-2.759c-.287 0-.518.231-.518.518v3.793c0 .287.231.518.518.518h2.759c.287 0 .518-.231.518-.518s-.231-.518-.518-.518z"/>
            </svg>
            <span className="whitespace-normal">先加 LINE，拿你的下一步診斷</span>
          </button>
          
          {/* 次按鈕 (Phone) */}
          <a 
            href="tel:+88622724261"
            onClick={() => {
              if (typeof window !== 'undefined' && (window as any).fbq) {
                (window as any).fbq('track', 'Contact');
              }
            }}
            className="w-full relative inline-flex items-center justify-center px-4 py-3 sm:px-6 sm:py-4 text-[15px] sm:text-lg font-bold text-slate-800 transition-all duration-300 bg-white border border-slate-200 rounded-2xl hover:bg-slate-100 shadow-[0_4px_10px_rgba(255,255,255,0.1)] hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white/50 text-center leading-snug"
          >
            <Phone className="w-5 h-5 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-slate-700 flex-shrink-0" />
            <span className="whitespace-normal">直接打給我，15 分鐘先拆問題</span>
          </a>

        </div>
        
        {/* 低風險承諾 */}
        <div className="mt-4 text-center">
          <p className="text-sm font-medium text-slate-400">
            這通電話不是要你當下做決定，<br className="sm:hidden" />只是先幫你分清楚問題卡在哪。
          </p>
        </div>
      </div>
    </div>
  );
};
