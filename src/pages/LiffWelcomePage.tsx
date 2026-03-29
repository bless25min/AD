import React, { useEffect, useState } from 'react';
import liff from '@line/liff';
import { useNavigate } from 'react-router-dom';
import { liffContent } from '../content/liffContent';
import { painPoints } from '../content/painPoints';
import { useAppStore } from '../store/useAppStore';
import { Calendar, Link2, Check, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const LiffWelcomePage: React.FC = () => {
  const { profile, selectedPainPoint, selectedFollowUpOption, friendshipStatus } = useAppStore();
  const navigate = useNavigate();
  const [showCards, setShowCards] = useState(false);

  // 若使用者狀態錯誤 (未加好友)，將其退回 required 頁面
  useEffect(() => {
    if (friendshipStatus !== 'friend' && friendshipStatus !== 'checking') {
      navigate('/liff/friend-required', { replace: true });
    }
  }, [friendshipStatus, navigate]);

  const matchedPainPoint = painPoints.find(p => p.id === selectedPainPoint);
  const matchedOption = matchedPainPoint?.followUp.options.find(o => o.id === selectedFollowUpOption);

  const handleCtaClick = async (actionId: string) => {
    // 記錄點擊事件
    try {
      await fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: `${actionId}_click`,
          userId: profile?.userId,
        })
      });
    } catch (e) {}

    // 依據不同按鈕行為操作
    if (actionId === 'booking') {
      liff.openWindow({ url: 'https://calendly.com/', external: true });
    } else if (actionId === 'report') {
      setShowCards(true);
      setTimeout(() => {
        document.getElementById('cards-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg text-slate-100 p-4 sm:p-6 lg:p-8 flex flex-col items-center">
      <div className="w-full max-w-md mx-auto pt-6 pb-20">
        
        {/* Header: 對話式開場 */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="mb-8 pl-2"
        >
          <div className="flex items-center mb-6">
            <div className="relative">
              {profile?.pictureUrl ? (
                <img src={profile.pictureUrl} alt="Avatar" className="w-16 h-16 rounded-full border border-slate-700 object-cover" />
              ) : (
                 <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                   <span className="text-2xl text-slate-400">{profile?.displayName?.charAt(0) || 'Hi'}</span>
                 </div>
              )}
              {/* 綠點代表在線感 */}
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#00B900] rounded-full border-2 border-dark-bg"></div>
            </div>
            
            <div className="ml-4">
              <div className="text-sm text-slate-400 mb-0.5">來自系統的接手確認</div>
              <h1 className="text-xl font-bold tracking-tight">
                {profile?.displayName ? `${profile.displayName}，` : ''}{liffContent.welcome.greeting}
              </h1>
            </div>
          </div>
          
          <div className="inline-flex items-start bg-[#00B900]/10 text-[#00B900] px-5 py-4 rounded-2xl text-[15px] font-medium border border-[#00B900]/20 leading-relaxed whitespace-pre-line shadow-sm">
            <Check className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" strokeWidth={3} />
            {liffContent.welcome.successMessage}
          </div>
        </motion.div>

        {/* Dynamic Summary (個人化摘要) */}
        {matchedPainPoint && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="mb-8 relative"
          >
            {/* 視覺氣泡小尾巴 */}
            <div className="absolute -top-3 left-8 w-6 h-6 bg-slate-900 border-l border-t border-slate-800 rotate-45"></div>
            
            <div className="bg-slate-900 border border-slate-800 p-7 rounded-2xl rounded-tl-none relative z-10 shadow-lg">
              <span className="text-brand-400 block mb-2 font-medium">{liffContent.welcome.painPointPrefix}</span>
              <h3 className="text-xl font-bold text-white mb-2">「{matchedPainPoint.title}」</h3>
              
              {matchedOption && (
                <>
                  <span className="text-brand-400 block mb-2 font-medium mt-6 border-t border-slate-800/80 pt-5">
                    {liffContent.welcome.optionPrefix}
                  </span>
                  <div className="text-slate-300 text-[15px] leading-relaxed opacity-95 bg-dark-bg p-4 rounded-xl border border-slate-800/50">
                    「{matchedOption.text}」
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="space-y-3 mb-10"
        >
          {liffContent.welcome.callToActions.map((cta) => {
            const icons = {
              report: <FileText className="w-5 h-5 mr-3 flex-shrink-0" />,
              booking: <Calendar className="w-5 h-5 mr-3 flex-shrink-0" />
            };

            const styles = {
              primary: "bg-white text-black hover:bg-slate-200 border-transparent shadow-md",
              outline: "bg-transparent text-slate-300 border-slate-700 hover:border-slate-500 hover:text-white"
            };

            return (
              <button
                key={cta.id}
                onClick={() => handleCtaClick(cta.id)}
                className={`w-full flex items-center justify-center py-[18px] px-6 rounded-2xl font-bold transition-all border ${
                  styles[cta.style as keyof typeof styles]
                }`}
              >
                {icons[cta.id as keyof typeof icons] || <Link2 className="w-5 h-5 mr-3" />}
                {cta.label}
              </button>
            )
          })}
        </motion.div>

        {/* 3 Cards Section (Revealed on Click) */}
        <AnimatePresence>
          {showCards && matchedPainPoint && (
             <motion.div 
               id="cards-section" 
               initial={{ opacity: 0, y: 30, height: 0 }} 
               animate={{ opacity: 1, y: 0, height: 'auto' }} 
               transition={{ duration: 0.4 }}
               className="mb-10 space-y-4 pt-4 border-t border-slate-800/80"
             >
               {/* Card 1: 先接住 */}
               <div className="bg-brand-900/10 border-l-4 border-brand-500 py-5 px-6 rounded-r-2xl shadow-sm">
                  <p className="text-slate-200 leading-relaxed font-medium">
                    {matchedPainPoint.lineCard1}
                  </p>
               </div>
               
               {/* Card 2: 真正卡點 */}
               <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl relative">
                  <span className="absolute -top-3 left-6 bg-slate-800 text-brand-300 text-xs font-bold px-3 py-1 rounded-full border border-slate-700">真正卡點</span>
                  <p className="text-slate-300 leading-relaxed mt-2">
                    {matchedPainPoint.lineCard2}
                  </p>
               </div>
               
               {/* Card 3: 先補哪裡 */}
               <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-700 shadow-xl relative overflow-hidden mt-6">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
                  <span className="absolute -top-3 left-6 bg-brand-500/20 text-brand-400 text-xs font-bold px-3 py-1 rounded-full border border-brand-500/30">我們接下來補哪裡</span>
                  <p className="text-white leading-relaxed relative z-10 mt-2 font-medium">
                    {matchedPainPoint.lineCard3}
                  </p>
               </div>
               
             </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};
