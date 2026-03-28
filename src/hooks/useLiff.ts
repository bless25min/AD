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

        // withLoginOnExternalBrowser: true 滿足要求
        await liff.init({
          liffId,
          withLoginOnExternalBrowser: true,
        });

        const isLoggedIn = liff.isLoggedIn();
        setIsLoggedIn(isLoggedIn);

        if (isLoggedIn) {
          // 取得使用者資料
          const profile = await liff.getProfile();
          setProfile({
            userId: profile.userId,
            displayName: profile.displayName,
            pictureUrl: profile.pictureUrl
          });

          // 呼叫後端 API 建立 Cookie Session，並記錄這個名單
          // 這樣 Profile/Session Security 就依賴 Server 端，不再依賴 LocalStorage
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
            console.warn("無法取得好友狀態（可能尚未授權 profile 或是發生網路錯誤）", friendErr);
            setFriendshipStatus('unknown');
          }
        } else {
          // 若 withLoginOnExternalBrowser 失敗或取消，可手動登入
          // 這裡雖然通常不會進來，但可做 fallback login
          // 沒有直接在 liff.login() 放 botPrompt 是因為 LINE Dev 控制台「Link official account」選單已包含此邏輯 (預設建議設定為 Aggressive)
          liff.login();
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
