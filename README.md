# 高轉換互動式服務頁 + LINE Login + LIFF 整合計畫

這是一個針對高信任門檻產業 (醫美、課程、高單價顧問) 設計的 **顧問式行銷轉換漏斗**。
此專案結合了 React + Zustand 前端技術，與 Cloudflare Pages Functions 的無伺服器後端架構，達成深度、高效能的 LINE 流量轉換器。

---

## 🚀 專案核心流程

1. **首頁 `/`**：引導對話式的互動銷售頁，完成使用者現況診斷與分流，並將選項存在 `LocalStorage`。
2. **LINE 登入 `/liff`**：引導進入 `liff.init({ withLoginOnExternalBrowser: true })`，並發起 **Cookie-based Session** API 呼叫。
3. **加好友防線 `/liff/friend-required`**：若偵測到未加官方帳號好友或被封鎖，觸發 `liff.requestFriendship()`，若回退則提供加入連結。點擊 **重新檢查** 即可呼叫 API 刷新狀態。
4. **個人化儀表板 `/liff/welcome`**：帶入使用者先前的痛點診斷並給予對應的專屬反饋解答，最終利用 `liff.openWindow()` 導向預約或聊天對話！

---

## 🛠️ 開發與部署指南

### 1. 本地開發設定 (Local Development)

由於 LIFF 與登入流程需 HTTPS 或註冊特定 Domain，建議本地使用 `ngrok` 開發：
1. 複製 `.env.example` 為 `.env`。
2. 填上 LINE Developers 建立的 `LIFF ID` (`VITE_LIFF_ID`)。
3. 如果要在本機測試後端 API (Functions)，需要放置變數於 `.dev.vars`。

```bash
npm install
npm run dev
```

### 2. Cloudflare Pages 部署 (Deployment)

本專案完美相容 Cloudflare Pages。
1. 上傳 / 連結至你的 GitHub Repo 分支。
2. 開啟 Cloudflare Dashboard，點選 **Workers & Pages** -> **Create application** -> **Pages** -> **Connect to Git**。
3. 設定 Framework 為 **React (Vite)**。
4. 於 Environment variables 區域必須填寫：
   - `VITE_LIFF_ID` (前台取得)
   - `VITE_LINE_ADD_FRIEND_URL` (備用防線加好友網址)
   - `COOKIE_SECRET` (後台用)

---

## 🟢 LINE Developers 設定檢查清單 (必做)

> [!WARNING]
> 若沒有完成以下設定，加好友流程將會失敗！

1. **建立 LINE Login Channel**：
   - 到 LINE 官方控制台建立 LINE Login Provider 與 Channel。
   - 在 `Basic settings` 的 **Link a LINE Official Account** -> 綁定你要加粉的官方帳號。
   - 設定 **LINE Login -> Bot prompt**：**Aggressive**（開啟時會主動邀請加入好友）。
2. **建立 LIFF App**：
   - `Size`: Full
   - `Endpoint URL`: `https://你的Cloudflare網域/liff/` (注意結尾要有斜線 /liff/，此專案在此統一控制路由)
   - `Scopes`: `profile`, `openid` (如有需要也可開啟 `chat_message.write` 等)
   - 將產生的 LIFF ID 填入 `.env` 及 Production Variables。
3. 此時 `/liff/welcome` 的好友防線 `getFriendship()` 才能正確取得。

---

## 🏗️ 目錄與架構

- `/src/content`: 全平台文案集中管理（schema typed），不將文案硬寫在元件內，以利未來切換 CMS 或執行 A/B Testing。
- `/src/hooks/useLiff.ts`: LIFF 初始化 Hook、跨瀏覽器支援、Cookie Session 交換。
- `/src/store/useAppStore.ts`: Zustand 狀態管理庫，管理診斷資料與用戶狀態 (UI)。
- `/functions/api/`: Cloudflare Functions，提供無伺服器 API 驗證、名單截取與事件追蹤。
