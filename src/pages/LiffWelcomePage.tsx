import { useEffect } from 'react';
import liff from '@line/liff';
import { useNavigate } from 'react-router-dom';
import { liffContent } from '../content/liffContent';
import { painPoints } from '../content/painPoints';
import { useAppStore } from '../store/useAppStore';
import { MessageCircle, FileText, Calendar, Link2, Download, Check } from 'lucide-react';
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
      // 假設這裡有對應的 PDF 下載或是外部網頁
    }
  };

  const closeLiff = () => {
    liff.closeWindow();
  };

  return (
    <div className="min-h-screen bg-dark-bg text-slate-100 p-4 sm:p-6 lg:p-8 flex flex-col items-center">
      <div className="w-full max-w-md mx-auto pt-6">
        
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
              <div className="text-sm text-slate-400 mb-0.5">來自系統的承接確認</div>
              <h1 className="text-xl font-bold tracking-tight">
                {profile?.displayName ? `${profile.displayName}，` : ''}{liffContent.welcome.greeting}
              </h1>
            </div>
          </div>
          
          <div className="inline-flex items-center bg-[#00B900]/10 text-[#00B900] px-4 py-2 rounded-full text-sm font-medium border border-[#00B900]/20">
            <Check className="w-4 h-4 mr-2" strokeWidth={3} />
            {liffContent.welcome.successMessage}
          </div>
        </motion.div>

        {/* Personalized Content (顧問式回饋) */}
        {matchedPainPoint && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="mb-8 relative"
          >
            {/* 視覺氣泡小尾巴 */}
            <div className="absolute -top-3 left-8 w-6 h-6 bg-slate-900 border-l border-t border-slate-800 rotate-45"></div>
            
            <div className="bg-slate-900 border border-slate-800 p-7 rounded-2xl rounded-tl-none relative z-10 shadow-lg">
              <span className="text-brand-400 block mb-2 font-medium">{liffContent.welcome.painPointPrefix}</span>
              <h3 className="text-xl font-bold text-white mb-4">「{matchedPainPoint.title}」</h3>
              
              <div className="text-slate-300 text-[15px] leading-relaxed mb-6 whitespace-pre-line opacity-90">
                {matchedPainPoint.detailedDescription}
              </div>
              
              <div className="border-t border-slate-800/60 pt-5">
                <span className="text-slate-500 text-sm block mb-2">我建議你接下來：</span>
                <p className="text-white font-medium whitespace-pre-line leading-relaxed">
                  {matchedPainPoint.recommendedNextStep}
                </p>
              </div>
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
              report: <Download className="w-5 h-5 mr-3 flex-shrink-0" />,
              plans: <FileText className="w-5 h-5 mr-3 flex-shrink-0" />,
              booking: <Calendar className="w-5 h-5 mr-3 flex-shrink-0" />
            };

            const styles = {
              primary: "bg-white text-black hover:bg-slate-200 border-transparent shadow-md",
              secondary: "bg-slate-800 text-white hover:bg-slate-700 border-slate-700",
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

        {/* Close to Chat (引導回 LINE 聊天) */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
        >
          <div className="text-center pb-8 border-t border-slate-800/80 pt-6">
            <p className="text-slate-400 text-[15px] mb-5 whitespace-pre-line leading-relaxed">
              {liffContent.welcome.chatbotPrompt}
            </p>
            <button
              onClick={closeLiff}
              className="inline-flex items-center text-sm font-bold text-slate-300 hover:text-white group"
            >
              <MessageCircle className="w-4 h-4 mr-2 group-hover:text-[#00B900] transition-colors" />
              {liffContent.welcome.chatButton}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
