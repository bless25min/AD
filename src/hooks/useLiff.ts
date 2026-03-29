import { useState, useEffect, useRef } from 'react';
import liff from '@line/liff';
import { useAppStore } from '../store/useAppStore';

export const useLiff = () => {
  const { setProfile, setFriendshipStatus, setIsLoggedIn, selectedPainPoint } = useAppStore();
  const [initError, setInitError] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const initializeLiff = async () => {
      try {
        const liffId = import.meta.env.VITE_LIFF_ID;
        if (!liffId) throw new Error("VITE_LIFF_ID is not defined.");

        await liff.init({
          liffId,
          // 移除 withLoginOnExternalBrowser 讓我們先取得主控權
        });

        const isLoggedIn = liff.isLoggedIn();
        setIsLoggedIn(isLoggedIn);

        if (!isLoggedIn) {
          // 動態抓取當下的網址 (例如 /liff 或 /contract)，讓 LINE 登入後精準跳回目前頁面
          liff.login({ redirectUri: window.location.href });
          return; // 因為會重新導向，所以中斷後續執行
        }

        // 以下為已登入 (isLoggedIn = true) 的處理邏輯
        // 取得使用者資料
        const profile = await liff.getProfile();
        setProfile({
          userId: profile.userId,
          displayName: profile.displayName,
          pictureUrl: profile.pictureUrl
        });

        // 呼叫後端 API 建立 Cookie Session，並記錄這個名單
        try {
          const idToken = liff.getIDToken();
          await fetch('/api/session/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              idToken,
              painPoint: selectedPainPoint,
              entryPath: window.location.pathname
            })
          });
        } catch (apiErr) {
          console.error('Session establishment failed', apiErr);
        }

        // 確認好友狀態
        try {
          const friend = await liff.getFriendship();
          setFriendshipStatus(friend.friendFlag ? 'friend' : 'not_friend_or_blocked');
        } catch (friendErr) {
          console.warn("無法取得好友狀態", friendErr);
          setFriendshipStatus('unknown');
        }

      } catch (err: any) {
        console.error('LIFF Init Error:', err);
        setInitError(err.message || 'LIFF Initialization Failed');
        setFriendshipStatus('unknown');
      } finally {
        setIsInitializing(false);
      }
    };

    initializeLiff();
  }, [setProfile, setFriendshipStatus, setIsLoggedIn, selectedPainPoint]);

  return { isInitializing, initError, liff };
};
