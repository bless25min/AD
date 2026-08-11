Goal: 讓陌生企業主在首頁五秒內理解 AI 導入、系統整合與企業專訪的合作價值。

User-visible batch: 生成雜誌成果圖首屏、三步合作流程、企業與軟體開發商入口、直接聯絡 CTA、搜尋與 AI 回答語意。

In scope: 首頁 React 元件、首頁內容、首頁 CSS、首頁 metadata/JSON-LD/llms.txt、主視覺資產、首頁契約測試。

Protected / out of scope: 不改 LINE Tag、Meta Pixel、Hotjar、Pages Functions、合約頁、案例內頁、Cloudflare bindings；不發送訊息或執行客戶工作流。

Acceptance: 首屏明確說明服務並顯示成果圖；LINE CTA 直達正確聯絡方式；桌機與手機可讀；合作流程與兩種入口清楚；結構化資料與可見內容一致。

Verification: 新增契約測試先失敗再通過；完整 Node tests、lint、TypeScript/Vite build、桌機與手機視覺、production HTTP/DOM/asset 驗證。

Production authorization: 使用者已明確要求修改並部署上線；授權僅限新版靜態頁面與現有 Pages Functions 一併部署，不包含訊息發送或資料寫入。

Completed: 已完成成果導向首頁、桌機與手機主視覺、三步流程、兩種合作入口、直接聯絡 CTA、metadata、JSON-LD 與 llms.txt；36/36 契約測試、目標 ESLint、production build、桌機與手機視覺檢查均通過。

Remaining: Cloudflare Pages production 部署與線上 HTTP／DOM／圖片資產驗證。

Evidence: 36/36 Node tests；目標 ESLint exit 0；Vite production build exit 0；390×844 手機版無水平溢出，專訪成果圖位於首屏；Cloudflare project `ad` production branch 為 `main`。
