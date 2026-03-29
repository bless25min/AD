import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import liff from '@line/liff';
import { UserPlus, RefreshCw, AlertCircle } from 'lucide-react';
import { liffContent } from '../content/liffContent';
import { useAppStore } from '../store/useAppStore';

export const LiffFriendRequiredPage: React.FC = () => {
  const { setFriendshipStatus } = useAppStore();
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleAddFriend = async () => {
    try {
      // 優先使用 LIFF SDK 的加好友畫布
      await liff.requestFriendship();
    } catch (err) {
      console.warn("requestFriendship 未支援或取消，回退為 URL 開啟");
      // Fallback
      const oaUrl = import.meta.env.VITE_LINE_ADD_FRIEND_URL;
      if (oaUrl) {
        window.location.href = oaUrl;
      } else {
        setErrorMsg('無法開啟加好友畫面，請聯繫客服。');
      }
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setErrorMsg('');
    
    try {
      // 1. 嘗試直接用 LINE SDK 取得 (如果快取沒干擾)
      const friend = await liff.getFriendship();
      
      // 2. 呼叫後端刷新 API (依照要求)
      const res = await fetch('/api/friendship/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // 此處 Server 端會透過 Cookie Session 識別用戶，也可帶 idToken
        body: JSON.stringify({ idToken: liff.getIDToken() })
      });
      
      const data = await res.json();
      
      // 以 API 給的狀態為主，如果有 friendFlag 則覆蓋
      const isFriend = data.isFriend ?? friend.friendFlag;
      
      if (isFriend) {
        setFriendshipStatus('friend');
        const targetPath = (useAppStore.getState().entryPath && useAppStore.getState().entryPath !== '/' && useAppStore.getState().entryPath !== '/liff') 
          ? useAppStore.getState().entryPath 
          : '/liff/welcome';
        useAppStore.getState().setEntryPath('/');
        navigate(targetPath, { replace: true });
      } else {
        setErrorMsg('狀態未改變，請確認您已將官方帳號解除封鎖並加入好友。');
      }
    } catch (err: any) {
      setErrorMsg('更新狀態時出現錯誤，請稍後重試。');
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg text-slate-100 flex flex-col items-center justify-center p-6 text-center pt-10">
      <div className="w-20 h-20 bg-brand-500/10 rounded-full flex items-center justify-center mb-6 border border-brand-500/30">
        <UserPlus className="w-10 h-10 text-brand-500" />
      </div>
      
      <h1 className="text-2xl font-bold mb-4">{liffContent.fallback.title}</h1>
      <p className="text-slate-300 mb-8 max-w-sm leading-relaxed">
        {liffContent.fallback.description}
      </p>

      {errorMsg && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-lg mb-6 flex items-start max-w-sm">
          <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
          <span className="text-left">{errorMsg}</span>
        </div>
      )}

      <div className="w-full max-w-sm space-y-4">
        <button
          onClick={handleAddFriend}
          className="w-full bg-[#00B900] hover:bg-[#009900] text-white font-bold py-4 rounded-xl shadow-lg transition-transform active:scale-95"
        >
          {liffContent.fallback.addFriendButton}
        </button>
        
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="w-full flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold py-4 rounded-xl border border-slate-700 transition-all disabled:opacity-50"
        >
          <RefreshCw className={`w-5 h-5 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          {liffContent.fallback.refreshButton}
        </button>
      </div>

      <p className="mt-8 text-xs text-slate-500 max-w-sm">
        {liffContent.fallback.blockedMessage}
      </p>
    </div>
  );
};
