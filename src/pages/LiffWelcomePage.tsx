import React, { useEffect, useState } from 'react';
import liff from '@line/liff';
import { useNavigate } from 'react-router-dom';
import { liffContent } from '../content/liffContent';
import { painPoints } from '../content/painPoints';
import { useAppStore } from '../store/useAppStore';
import { Link2, MessageCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const LiffWelcomePage: React.FC = () => {
  const { profile, selectedPainPoint, selectedFollowUpOption, friendshipStatus } = useAppStore();
  const navigate = useNavigate();
  const [isSending, setIsSending] = useState(false);

  // 若使用者狀態錯誤 (未加好友)，將其退回 required 頁面
  useEffect(() => {
    if (friendshipStatus !== 'friend' && friendshipStatus !== 'checking') {
      navigate('/liff/friend-required', { replace: true });
    }
  }, [friendshipStatus, navigate]);

  const matchedPainPoint = painPoints.find(p => p.id === selectedPainPoint);
  const matchedOption = matchedPainPoint?.followUp.options.find(o => o.id === selectedFollowUpOption);

  const handleChatStart = async () => {
    if (!matchedPainPoint || !matchedOption) return;
    
    setIsSending(true);

    try {
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'InitiateCheckout');
      }

      // 1. 紀錄點擊事件
      await fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'chat_start_click',
          userId: profile?.userId,
          painId: matchedPainPoint.id,
          optionId: matchedOption.id
        })
      });
    } catch (e) {
      // 忽略追蹤錯誤
    }

    // 2. 準備送出的點火對白
    const messageText = `我先從這裡開始聊：\n\n我現在比較像卡在：\n【${matchedPainPoint.title}】\n\n而且最常發生的是：\n【${matchedOption.text}】`;

    // 3. 微過場動畫延遲 (Handoff 體感 600ms)
    await new Promise(resolve => setTimeout(resolve, 600));

    try {
      if (liff.isInClient() && liff.isApiAvailable('sendMessage')) {
        await liff.sendMessages([{ type: 'text', text: messageText }]);
        liff.closeWindow(); // 發出後瞬間關閉，直接露出聊天框！
      } else {
        throw new Error("Not in Client or sendMessage not available");
      }
    } catch (error) {
       // 4. Fallback: 外部瀏覽器或報錯
       // 戳後端紀錄，並嚴格保留 painId / optionId / ready_to_chat 記憶，導回官方帳號
       try {
         await fetch('/api/track/push', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({
             userId: profile?.userId,
             painId: matchedPainPoint.id,
             optionId: matchedOption.id,
             ready_to_chat: true
           })
         });
       } catch (e) {}
       
       const addFriendUrl = import.meta.env.VITE_LINE_ADD_FRIEND_URL;
       if (addFriendUrl) {
         window.location.href = addFriendUrl;
       } else {
         liff.closeWindow();
       }
    } finally {
      // 視窗將被關閉或網頁跳轉，只做狀態保險
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg text-slate-100 p-4 sm:p-6 lg:p-8 flex flex-col items-center">
      <div className="w-full max-w-md mx-auto pt-6 pb-20">
        
        {/* 狀態分歧點：判斷身上是否有攜帶選項點擊紀錄 */}
        {!matchedPainPoint ? (
          
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6 px-2 mt-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800 border border-slate-700 mb-4">
                <span className="text-2xl text-slate-400">{profile?.displayName?.charAt(0) || 'Hi'}</span>
              </div>
              <h2 className="text-xl font-bold text-white mb-2 tracking-wide">
                聽說你目前生意卡關了？
              </h2>
              <p className="text-slate-400 text-[15px] leading-relaxed">
                為了馬上切入重點，請快速告訴我，<br />底下哪一個是你現在最大的痛：
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {painPoints.map((pt) => (
                <button
                  key={pt.id}
                  onClick={() => {
                    useAppStore.getState().setPainPoint(pt.id);
                  }}
                  className="w-full text-left p-5 bg-slate-900/80 border border-slate-700/80 rounded-2xl hover:bg-brand-900/10 hover:border-brand-500/40 transition-all group shadow-sm relative overflow-hidden"
                >
                  <div className="text-white font-bold mb-1.5 text-[15px] flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {pt.title}
                  </div>
                  <div className="text-[13px] text-slate-400 leading-relaxed pr-4">
                    {pt.shortDescription}
                  </div>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-brand-500 transition-opacity">
                    <Link2 className="w-4 h-4" />
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

        ) : !matchedOption ? (

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6 px-2 mt-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800 border border-slate-700 mb-4">
                <span className="text-2xl text-slate-400">{profile?.displayName?.charAt(0) || 'Hi'}</span>
              </div>
              <h2 className="text-xl font-bold text-white mb-2 tracking-wide">
                好，針對這個狀況
              </h2>
              <p className="text-slate-400 text-[15px] leading-relaxed block mt-2 px-4 py-2 bg-slate-800/50 rounded-lg">
                底下哪一個情境最符合你的現況：
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {matchedPainPoint.followUp.options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    useAppStore.getState().setFollowUpOption(opt.id);
                  }}
                  className="w-full text-left p-5 bg-slate-900/80 border border-slate-700/80 rounded-2xl hover:bg-brand-900/10 hover:border-brand-500/40 transition-all group shadow-sm relative overflow-hidden"
                >
                  <div className="text-[15px] text-slate-200 leading-relaxed pr-4 font-medium transition-colors group-hover:text-white">
                    {opt.text}
                  </div>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-brand-500 transition-opacity">
                    <Link2 className="w-4 h-4" />
                  </div>
                </button>
              ))}
            </div>
            <button 
              onClick={() => useAppStore.getState().setPainPoint(null)}
              className="mt-6 w-full text-center text-sm text-slate-500 hover:text-slate-300 transition-colors"
            >
               重選其他狀況
            </button>
          </motion.div>

        ) : (
          
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            {/* Header: 對話式開場 (極簡) */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="mb-8 pl-2 flex items-center"
            >
              <div className="relative flex-shrink-0">
                {profile?.pictureUrl ? (
                  <img src={profile.pictureUrl} alt="Avatar" className="w-14 h-14 rounded-full border border-slate-700 object-cover" />
                ) : (
                   <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                     <span className="text-xl text-slate-400">{profile?.displayName?.charAt(0) || 'Hi'}</span>
                   </div>
                )}
                {/* 綠點代表在線感 */}
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#00B900] rounded-full border-2 border-dark-bg"></div>
              </div>
              
              <div className="ml-4">
                <div className="text-xs text-slate-400 mb-1">來自系統的接手確認</div>
                <h1 className="text-[17px] font-bold tracking-tight text-white leading-snug">
                  {profile?.displayName ? `${profile.displayName}，` : ''}{liffContent.welcome.greeting}
                </h1>
              </div>
            </motion.div>

            {/* Dynamic Summary (個人化摘要) */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              className="mb-8 relative mx-2"
            >
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative z-10 shadow-md">
                <span className="text-slate-400 block mb-1.5 font-medium text-[13px]">{liffContent.welcome.painPointPrefix}</span>
                <h3 className="text-[17px] font-bold text-white mb-2 leading-snug">【{matchedPainPoint.title}】</h3>
                
                {matchedOption && (
                  <>
                    <span className="text-slate-400 block mb-1.5 font-medium mt-6 text-[13px] border-t border-slate-800/80 pt-4">
                      {liffContent.welcome.optionPrefix}
                    </span>
                    <h3 className="text-[15px] font-bold text-slate-200 leading-snug">
                      【{matchedOption.text}】
                    </h3>
                  </>
                )}
              </div>
            </motion.div>

            {/* Completion Text */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="px-3 mb-10">
              <p className="text-[15px] text-slate-300 leading-relaxed font-medium">
                {liffContent.welcome.successMessage}
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="px-2"
            >
              <button
                onClick={handleChatStart}
                disabled={isSending}
                className="w-full relative flex items-center justify-center py-[18px] px-6 rounded-2xl font-bold transition-all bg-[#00B900] text-white hover:bg-[#009900] disabled:bg-[#00B900]/80 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(0,185,0,0.15)] focus:outline-none"
              >
                {isSending ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-3 flex-shrink-0 animate-spin" />
                    <span className="text-lg">正在把這段帶進對話…</span>
                  </>
                ) : (
                  <>
                    <MessageCircle className="w-5 h-5 mr-3 flex-shrink-0 fill-current" />
                    <span className="text-lg">💬 好，先從這裡開始聊</span>
                  </>
                )}
              </button>
            </motion.div>

          </motion.div>
        )}

      </div>
    </div>
  );
};
