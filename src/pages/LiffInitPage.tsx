import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useLiff } from '../hooks/useLiff';
import { useAppStore } from '../store/useAppStore';
import liff from '@line/liff';

export const LiffInitPage: React.FC = () => {
  const { isInitializing, initError } = useLiff();
  const navigate = useNavigate();
  const { friendshipStatus, isLoggedIn } = useAppStore();

  useEffect(() => {
    // 當初始化完成且確定登入狀態後，進行路由拋轉
    if (!isInitializing && isLoggedIn) {
      if (friendshipStatus === 'friend') {
        // 如果是已被驗證的好友 ➜ 直接進入儀表板
        navigate('/liff/welcome', { replace: true });
      } else if (friendshipStatus === 'not_friend_or_blocked') {
        // 不是好友或被封鎖 ➜ 優先呼叫 liff.requestFriendship() API 彈出加入畫面
        // 如果失敗（不支援的瀏覽器或版本），直接跳到防線頁面
        try {
          // 注意：requestFriendship 通常在 LIFF 畫面中可用
          navigate('/liff/friend-required', { replace: true });
          
          if (liff.isInClient() || liff.getOS() !== 'web') {
              // 某些外部瀏覽器可能不支援，但仍可嘗試呼叫，有錯就 catch
              // 由於是在 redirect 之前或同時呼叫，建議交由 friend-required 頁面的 "一鍵加入按鈕" 或直接在此處嘗試
          }
        } catch (e) {
          navigate('/liff/friend-required', { replace: true });
        }
      } else if (friendshipStatus === 'unknown') {
        // 狀態不明，為了保險起見還是進防備頁面給予 Fallback
        navigate('/liff/friend-required', { replace: true });
      }
    }
  }, [isInitializing, isLoggedIn, friendshipStatus, navigate]);

  if (initError) {
    return (
      <div className="min-h-screen bg-dark-bg text-slate-100 flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-red-500/10 border border-red-500 rounded-xl p-6 max-w-md">
          <h2 className="text-xl font-bold text-red-500 mb-2">LINE 登入失敗</h2>
          <p className="text-slate-300 text-sm mb-4">{initError}</p>
          <p className="text-slate-400 text-sm">
            請確保網頁於 HTTPS 環境下執行，並確認 LIFF ID 設定正確。
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col items-center justify-center p-4">
      <Loader2 className="w-10 h-10 text-brand-500 animate-spin mb-4" />
      <h1 className="text-xl font-medium text-slate-200">
        正在連線至 LINE...
      </h1>
      <p className="text-sm text-slate-400 mt-2">
        請稍候，即將為您驗證並讀取專屬診斷報告
      </p>
    </div>
  );
};
