import React, { useEffect } from 'react';
import liff from '@line/liff';
import { useNavigate } from 'react-router-dom';
import { liffContent } from '../content/liffContent';
import { painPoints } from '../content/painPoints';
import { useAppStore } from '../store/useAppStore';
import { MessageCircle, FileText, Calendar, ShieldCheck, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export const LiffWelcomePage: React.FC = () => {
  const { profile, selectedPainPoint, friendshipStatus } = useAppStore();
  const navigate = useNavigate();

  // 若使用者狀態錯誤 (未加好友)，將其退回 required 頁面
  useEffect(() => {
    if (friendshipStatus !== 'friend' && friendshipStatus !== 'checking') {
      navigate('/liff/friend-required', { replace: true });
    }
  }, [friendshipStatus, navigate]);

  const matchedPainPoint = painPoints.find(p => p.id === selectedPainPoint);

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
    } else {
      // 傳送通知給使用者引導去對話，或打開外部報告頁面
    }
  };

  const closeLiff = () => {
    liff.closeWindow();
  };

  return (
    <div className="min-h-screen bg-dark-bg text-slate-100 p-4 md:p-8">
      <div className="max-w-md mx-auto">
        {/* Header: Profile */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center mt-6 mb-8 text-center"
        >
          {profile?.pictureUrl ? (
            <img src={profile.pictureUrl} alt="Avatar" className="w-20 h-20 rounded-full border-2 border-brand-500/50 shadow-lg object-cover mb-4" />
          ) : (
             <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center border-2 border-slate-700 mb-4">
               <span className="text-2xl text-slate-400">{profile?.displayName?.charAt(0) || 'Hi'}</span>
             </div>
          )}
          
          <h1 className="text-2xl font-bold mb-1">
            {profile?.displayName ? `${profile.displayName}，` : ''}{liffContent.welcome.greeting}
          </h1>
          <div className="flex items-center text-sm text-[#00B900] bg-[#00B900]/10 px-3 py-1 rounded-full mt-2">
            <ShieldCheck className="w-4 h-4 mr-1.5" />
            {liffContent.welcome.successMessage}
          </div>
        </motion.div>

        {/* Personalized Content */}
        {matchedPainPoint && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6 shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-brand-500"></div>
            <p className="text-brand-400 text-sm font-bold mb-2 uppercase tracking-wider">
              {liffContent.welcome.painPointPrefix}
            </p>
            <h3 className="text-xl font-bold text-white mb-3">「{matchedPainPoint.title}」</h3>
            <p className="text-slate-300 leading-relaxed mb-4 text-sm">
              {matchedPainPoint.detailedDescription}
            </p>
            <div className="bg-dark-bg border border-slate-700 p-4 rounded-xl">
              <span className="block text-xs text-slate-500 mb-1">我們的建議：</span>
              <p className="text-brand-300 text-sm font-medium">
                {matchedPainPoint.recommendedNextStep}
              </p>
            </div>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="space-y-3 mb-8"
        >
          {liffContent.welcome.callToActions.map((cta) => {
            const icons = {
              report: <FileText className="w-5 h-5 mr-3 flex-shrink-0" />,
              plans: <ExternalLink className="w-5 h-5 mr-3 flex-shrink-0" />,
              booking: <Calendar className="w-5 h-5 mr-3 flex-shrink-0" />
            };

            const styles = {
              primary: "bg-brand-600 hover:bg-brand-500 text-white shadow-lg border-transparent",
              secondary: "bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700",
              outline: "bg-transparent border-slate-600 text-slate-300 hover:bg-slate-800"
            };

            return (
              <button
                key={cta.id}
                onClick={() => handleCtaClick(cta.id)}
                className={`w-full flex items-center justify-center py-4 px-6 rounded-xl font-bold transition-all border ${
                  styles[cta.style as keyof typeof styles]
                }`}
              >
                {icons[cta.id as keyof typeof icons] || <ExternalLink className="w-5 h-5 mr-3" />}
                {cta.label}
              </button>
            )
          })}
        </motion.div>

        {/* Close to Chat */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="text-center bg-brand-500/5 text-brand-400 border border-brand-500/20 rounded-2xl p-5"
        >
          <p className="text-sm mb-4 leading-relaxed opacity-90">{liffContent.welcome.chatbotPrompt}</p>
          <button
            onClick={closeLiff}
            className="w-full flex justify-center items-center py-3 bg-[#00B900] text-white rounded-lg font-bold"
          >
            <MessageCircle className="w-5 h-5 mr-2" fill="currentColor" />
            {liffContent.welcome.chatButton}
          </button>
        </motion.div>
      </div>
    </div>
  );
};
