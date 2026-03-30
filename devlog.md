# 專案開發日誌 (DevLog)
> **專案代號**：高轉換信任漏斗 (High-Conversion Sales Funnel with LINE LIFF)
> **核心技術**：React + TypeScript + Vite + Tailwind CSS v4 + Cloudflare Pages Functions

這份開發日誌記錄了專案從「基本服務頁」一路打磨到「具備頂級電銷能量的線上顧問分身」的每一個關鍵迭代 (Iteration) 與交付版本。

---

## 🟢 v0.1: 架構奠基與 MVP (Minimum Viable Product)
**發布重點**：完成軟體基礎設施建立，打通知名度到私域的數位橋樑。
* **技術棧部署**：初始化 ViteReact 環境，配置 Tailwind CSS v4，並設定架構支援後續部署至 Cloudflare Pages。
* **無伺服器後端 (Serverless)**：實作基於 Cloudflare Functions 的基本 API（`/api/session`, `/api/friendship` 等）。
* **UI 原型**：完成常見的「描述功能型」服務頁面結構（Hero, Pain Points, FAQ, CTA）。
* **LINE 整合破冰**：引入 `@line/liff` SDK，串通基礎的 LINE Auth 與好友驗證。

## 🟢 v0.2: 邊界防護與狀態邏輯強化
**發布重點**：解決真實世界流量進件可能發生的各種 LINE 授權阻路與斷線。
* **細緻化四態好友檢測**：捨棄粗暴的「加 / 沒加」二分法，升級為四種嚴格檢驗狀態：`friend`、`not_friend_or_blocked`、`checking`、`unknown`，能精準認出「已加但封鎖」的死胡同。
* **外部瀏覽器無縫支援**：強制啟用 `withLoginOnExternalBrowser: true`，確保從 Facebook/Instagram 投廣點擊進來的外部瀏覽器訪客也能順利在點擊 CTA 後觸發 LINE App 驗證。
* **阻擋牆 (Friend-Required) 開發**：針對未加好友/封鎖者建立極具安全感的 `/liff/friend-required` 強制檢驗承接頁面，加入「我好了，重新檢查」的功能。

## 🟢 v0.3: 部署優化與內容架構抽離
**發布重點**：解決 Cloudflare Pages 的自動部署錯誤，並準備進入文案快速優化期。
* **Cloudflare 建置適配**：校正 `npm run build` 指令與編譯輸出結構 (`dist`)，清除 Cloudflare 的部署報錯。
* **內容抽離 (Content Abstraction)**：全面將散落在元件中的寫死文案提取到 `src/content/*.ts` (包含 `siteContent`, `painPoints`, `faq`, `liffContent`)。讓日後修改文案不再需要動到 JSX，全面提升可維護性。

## 🟢 v0.4: CRO 升級 ── 從「說明」到「共鳴」 (The Psychology Shift)
**發布重點**：脫離一般落地頁的框架，導入行為心理學與結案焦慮的轉換導向優化 (Conversion Rate Optimization)。
* **進度感與結案焦慮 (`ProgressTracker`)**：拋開呆板的捲軸條，改採依據點擊深度跳轉的心理進度條（*你在哪裡 ➔ 找出問題 ➔ 給你解法*），在用戶還沒填單前就產生「未完成的焦慮」。
* **Hook Breakthrough 爆點結構**：在診斷區塊後方插入「黑底白字」的極簡重擊：打破「不是你廣告投不好」的歸因，直接講破「是沒人接住」。
* **LIFF 對談化重建**：拔除原先冷冰冰的「系統儀表板 (Dashboard)」，套用「真人顧問遞送報告」的動態對白與綠色在線燈號，把科技感完全隱藏。
* **全第一人稱訴求**：CTA 按鈕從客觀的「立即預約」轉換為自我主觀意識極高的「我想知道答案」。

## 🟢 v0.5: 電銷腳本化 ── 多層漸進式診斷整合 (The Sales Persona)
**發布重點**：將這套頁面徹底打造成為「擁有實戰判斷標準」與「能拆解痛點」的頂級電銷分身。
* **三層微診斷 (Micro-Diagnosis)**：引入顛覆常規的一頁式邏輯，實作具備 Inline Expansion (無縫展開) 的對話機制。用戶點擊痛點後不僅不跳頁，反而當場拉出一個「追問」，並給予「微診斷回饋」，完美複刻了頂級顧問「挖出不吐露的恐懼，並一針見血」的成交法。
* **植入核心世界觀 (Worldview Modules)**：
  - 加裝 **「我不太看熱鬧，我比較看結果」** 區塊，建立強勢權威。
  - 加裝 **「越努力死越快 / 常常是被自己搞亂」** 區塊，直接否定現有錯誤解法。
  - 加裝 **「我知道你討厭多做一步」** 的終極降壓區塊緊貼最終 CTA。
* **同理異議處理 (Empathic FAQ)**：修正防備性問答，遵循「同理 (很正常...) ➔ 解構 (其實問題不在那...) ➔ 收斂 (而是...)」三段論，讓 FAQ 本身也成為推車滑軌。
* **「不講漂亮話」的承接法**：完全將歡迎頁的客服禮貌丟棄，以「好，我先不跟你講漂亮話，我幫你看...」極致接地氣的口吻承接，保證訪客覺得背後是一個真人在帶領。

## 🟢 v0.6: 深度成交心理學與抗拒解除 (The Deep Sales Empathy)
**發布重點**：將這套對白分身的「懂你感」推到極致，並截斷所有可能流失的逃避路線。
* **最小容許開場 (`softPermission`)**：在 Hero 首屏追加「你不用先相信我...」的降壓宣告，把防護罩完全拆除。
* **加深角色投射 (`closing2`)**：在 Affinity 與 Results Philosophy 新增進階共鳴，把「你明明有做事卻不知道漏在哪」以及「你看過別家熱鬧但沒結果」的挫敗感精準點出。
* **講破創意迷思 (`creativeTrap`)**：新增「許多人把希望賭在短影音創意團隊」的獨立警示區塊，直接截斷盲目迷信行銷創意的退路，逼迫正視漏斗承接問題。
* **微小承諾 (`microCommitment`)**：在 Final CTA 之前墊入「你不用現在決定，先答應自己花 1 分鐘看問題」的緩衝地帶，徹底消除最後點擊的神經阻力。
* **動態渲染層升級**：`HomePage.tsx` 完整重構以無縫渲染上述所有新增的對白與板塊，維持強大的順滑視覺。

## 🟢 v0.7: 主軸收斂與冷流量分流版 (The Core Convergence & Cold Traffic Fast-Track)
**發布重點**：透過全頁中樞金句統一核心主張、壓縮過長論點，並針對無耐心冷流量開發專屬的直球對決版本。
* **強勢金句收斂 (`coreProposition`)**：將「你不是不會成交。你只是還沒有一套前端獲客導流系統」昇華為全版面的視覺與心智能量中樞。
* **觀點降級與節奏壓縮 (`compressedViews`)**：將原本比重過大的三大說理區塊（結果哲學、短影音迷思、搞亂試錯）壓縮成並列的卡片，作為支撐主論點的基石，大幅加速閱讀與理解節奏。
* **部署冷流量專版 (`HomePageB.tsx`)**：針對直接點擊廣告、防備心極高且耐心極低的流量，釋出無深長對白、僅依賴強論述與低阻力電話 CTA 的快打版本。
* **引導式防備卸除**：
  - **Hero 邊界感**：首屏直接宣告「我不是要先說服你做什麼，如果問題不在頁面我也會直說」，即刻降壓。
  - **異議成熟化 (`faq`)**：不花心力「反駁」疑慮，而是將客戶的防備心（找過代操沒用、怕白做工）轉譯為「成熟決策者的警覺」，給予最高心理尊重。
  - **進展感注入 (`ProgressHint`)**：在長頁面的幾何中段克制地安插兩次「你距離答案更近了」、「焦慮開始下降」的陪跑提示，防止資訊疲乏。

## 🟢 v0.8: 頂級顧問式體驗重構 (The Consultative Flow Mastery)
**發布重點**：徹底顛覆一般著陸頁的規格導向，將全站打造為「懂你痛點、不給壓力、步步引導」的 15 階段線上顧問分身。
* **15 階段心理流動重排**：將互動診斷區塊向後推遲，主動在前半段（Hero -> 現場共鳴 -> 講破盲點 -> 結果預想）鋪墊極強的信任感，接著立即攔截防備心，最後才進入診斷，確保使用者在最高信任狀態下互動。
* **漸進式互動卡片 (Stepped PainPoint UI)**：破除「一展開就滿滿一堆字」的壓迫感。現在點開痛點卡片，只會先看到簡短回饋與提問；只有在用戶手動點擊選項後，才會揭露深層的診斷分析，創造完美的「微承諾」流動。
* **深層損失橋接 (`microDiagnosisBridge`)**：全面寫入四組痛點的底層損失分析（例如：不僅是跳出率高，而是錯失高意圖買家；不僅是客服回不完，而是失去自動化篩選的可能），狠踩痛點但保持成熟語氣。
* **異議處理雙軌化 (Two-Tier Objections)**：
  - **中段攔截**：在丟出解法後，立刻用 `Mid-Page Objections` 承接高敏警覺（你是不是另一家代操？問題不在頁面怎麼辦？）。
  - **末段兜底**：在最終 CTA 前，用 `FAQ` 處理成熟決策者的焦慮（同事不支持、怕做白工）。
* **終結阻力 CTA (Frictionless Final)**：將所有逼單字眼抽離，換為「繼續盲改只是浪費試錯」的理性建議，並以高對比區塊獨立展示「這通電話不是要你做決定，只是分清層次」的終極降壓保證。

## 🟢 v0.9: 連續回饋感與心理扶手 (The Psychological Feedback Loop)
**發布重點**：透過全頁「降壓句」與「閱讀肯定」，實現『被看懂 → 鬆一口氣 → 知道下一步』的連續心理回報體驗。
* **分區降壓收束 (`reliefFeedback`)**：在每一個核心論述段落尾部（Affinity, Views, New Model, Results）插入短句，例如「你現在先不用急著想怎麼改」，讓使用者每讀完一段都被接住一次。
* **痛點互動四層剝洋蔥 (4-Stage Diagnostic)**：
  - **L1**：只留標題與簡介（消除文字壓迫）
  - **L2**：點擊馬上給予「你不是唯一」的正向回饋
  - **L3**：點擊選項才跳出初步診斷
  - **L4**：點擊按鈕才給予「你真正損失什麼」的殘酷底層分析
* **情緒命名補刀 (`microDiagnosisBridge`)**：不再冷冰冰分析，直接寫入「你真正不甘心的不是沒有流量，而是有興趣的人滑走了」等精準情緒對白。
* **對白化 FAQ**：將常見問題改為「先承認防備心合理 → 幫助情緒命名 → 提供低風險下一步」的心理扶手。
* **行動完成感補強**：在 CTA 與 LIFF Welcome 第一步，補足「你看到這裡代表你不是憑感覺的人」以及「你已經完成最難的一步」的強烈肯定感。

## 🟢 v1.0: 數位合約與無縫收款 (The Frictionless Closer)
**發布重點**：打通漏斗最後一哩路，推出免紙本、免列印、秒請款的高級線上數位簽約頁面。
* **動態變數合約系統 (`contractTerms.ts`)**：將實體 `.docx` 條款程式化，未來能藉由 URL Query Params (`?amount=50000&months=6&project=專案名`) 自動產出客製化合約，無須重打文件。
* **一頁式數位同意 (Digital Consent)**：打造 `/contract` 隱藏路由，以深黑配色的高級版面呈現條文。客戶僅需打字輸入基本資料（甲方名稱、統編、負責人）並「打勾」，系統即壓印時間戳記完成簽署。
* **沉浸式請款展演 (Immersive Payment Card)**：當勾選同意後，下方以順滑的高質感動畫現身收款卡片（銀行代號、帳號、貳拾伍數據顧問企業社戶名），並附帶「一鍵複製」功能，創造 0 阻力的流暢體驗。

## 🟢 v1.1: 互動式分流架構重生 (The Interactive Split-Flow Shift)
**發布重點**：徹底打破「由上連貫滑到底」的長頁框架，將資訊負載過重的漏斗，重建為多路由、漸進揭露的真正互動式對白路徑。
* **動態路由與架構拆解**：導入 React Router 動態參數 (`/path/:painId` 與 `/path/:painId/:optionId`)，讓每一次點擊都能確實換頁，為「漸進式揭露 (Progressive Disclosure)」打磨出物理分隔，杜絕同頁展開的跳針感。
* **極簡破冰首頁 (`HomePage`)**：大幅刪減超過半數的情緒鋪墊與防禦論點，僅保留 Hero、極短共鳴 (Affinity) 和明確的「情境選擇卡片」，讓前端流量在 3 秒內就受到點擊召喚。
* **兩階段對接漏斗 (`PainPointPage` & `SituationPage`)**：
  - **初階承接**：用 `PainPointPage` 快速接住情緒，單純讓來客做第二次微抉擇（例如：對，這最痛）。
  - **深層診斷與轉單**：把原本首頁的龐大說理板塊 (Core Proposition, New Model, Evidence, FAQ) 搬入 `SituationPage` 作為診斷後的底部防禦內容。讓使用者在最高信任時點，看見診斷、立刻看見解藥。
* **分流雙核 CTA (`DualCTA`)**：捨棄傳統單一按鈕，建立精準的「高低意圖分流」策略：
  - 高意圖：白底電話按鈕「直接打給我，15 分鐘先拆問題」。
  - 資訊收集低意圖：綠底 LINE 按鈕「先加 LINE，拿你的下一步診斷」。
  - 追加 Sticky Footer 混合邏輯：手機瀏覽深層內容時浮動置底，降低採取行動的硬體阻力。

---

## 🟢 v1.2: 數位合約引擎升級與 PDF 存證 (The Dynamic Contract Engine)
**發布重點**：完善線上數位合約功能，將固定範本升級為可即時連動的互動表單，並賦予正式文件下載能力。
* **雙向綁定合約預覽 (Reactive Contract Preview)**：大幅翻新 `/contract` 頁面邏輯。將合約名稱、合約開始日與期間月數轉為可由客戶自訂的表單欄位。當客戶於表單修改資料時，上方合約預覽本文即時動態抽換，產生極強的「專屬客製化」感受。
* **價格與條款鎖定 (Pricing Consistency)**：將預設服務基準與提前終止合約的違約基準，同步且一致地鎖定在 7 萬元。
* **一鍵 PDF 數位封裝 (One-Click PDF Export)**：引入 \`html2pdf.js\` 技術。新增「下載合約 PDF」功能，該功能不僅擷取合約本文，更將包含時間標記、甲方名稱、負責人及同意狀態的「數位簽名紀錄」完整打包為一份可存檔的 PDF 文件，圓滿閉環數位信任。

---

## 🟢 v1.3: 企業級合約屏障與自動化通知 (Enterprise Contract Security & Automated Push)
**發布重點**：強制合約頁面實名登入，並實作透過後端 API 給予客戶自動化的 LINE 確認推播信件，完成簽署體驗閉環。
* **LIFF Auth Guard 權限鎖定 (Secure Access)**：大幅升級 `/contract` 安全性，匯入 `useLiff` 強制阻擋未授權存取。當探測到未登入狀態，將出現在地化 Loader 並直接引發 LINE 驗證程序，確保獲取的 `userId` 為合法真實身分。
* **無伺服器推播引擎 (Serverless Push Notifier)**：建置全新的 `functions/api/notify-contract.ts` 後端 API 節點。在使用者按下「正式簽署」時，以非同步背景執行的形式呼叫 LINE Messaging API 送出確認。
* **零時差確認推送**：客戶在畫面完成數位合約與生成 PDF 的瞬間，手機端 LINE 官方帳號也會同時收到推播。文案動態抓取「公司名稱、合約起訖日與月費」，並溫馨提示後續匯款事項，構成如真人般的專業顧問體驗。

---

## 🟢 v1.4: 高人味 LINE 承接文案系統 (The Humanized Post-LINE Flow)
**發布重點**：徹底將加 LINE 好友後的系統承接由「工具報告感」打磨成「具備溫度與同理心的真人顧問分身」。
* **動態接手微前端 (Dynamic Welcome Screen)**：重構 `/liff/welcome` 介面，拔除冗長的診斷報告，改版為極簡的「接手對話框」。系統會動態連動使用者前頁選擇的痛點，並首播「你剛剛先把最麻煩的一步做完了」的完成感金句。
* **無壓三卡牌架構 (3-Card Micro UI)**：將深層論述轉譯成三段極度白話的短卡（先接住 ➔ 真正卡點 ➔ 先補哪裡）。透過點選按鈕後以動畫滑出，消除長文壓迫感，並全數拔除「痛點、臉書設定、銷售」等高壓顧問詞彙。
* **行為分支推播矩陣 (Behavioral Branching Scripts)**：捨棄定時推播。導入並輸出一套完整的後端營運腳本（`line-chatbot-scripts.md`），針對「未點擊、沒看完、看過沒預約」三種行為停滯期，佈局不同的推進話術與低風險出口。
* **極致人工破冰點 (Human Intervention Hook)**：為漏斗補上最高轉換率的一刀。在使用者猶豫或完成瀏覽時，利用「沿襲前置痛點的精準二選一問句」啟動真正的 1-on-1 對話，達成無懈可擊的互動信任閉環。

---

## 🟢 v1.4.1: 原生版 LINE Tag 追蹤實裝 (LINE Tag Integration)
**發布重點**：為整套高轉換漏斗安裝最後一塊拼圖，精準捕捉高意圖使用者的行為歷程，以利後續的再行銷與受眾校正。
* **全站基礎追蹤 (Base Code & PV)**：於 `index.html` 的 `<head>` 底層實裝 LINE Tag 基本程式碼，捕捉所有由各個渠道流入首頁或子頁面的 `PV` 流量，確保不漏接任何名單點擊。
* **終點轉換埋設 (Conversion Event Tracking)**：針對 React SPA 的單頁生命週期特性，精準地將轉換代碼 (`cv`) 綁定於 `/contract` 頁面（`ContractPage.tsx`）的 `useEffect` 中。當潛在客戶成功走通漏斗、完成登入並進入合約準備階段時，系統才會向 LINE LAP 發送「轉換成功」的高意圖訊號。

## 🟢 v1.4.2: 跨環境狀態繼承與進站體驗補強 (Cross-Browser State Flow & Fallback)
**發布重點**：修復核心流程中 Safari/Chrome 跳轉至 LINE 內部瀏覽器時的斷點與 localStorage 遺失問題，並強化邊緣情境下的進站體驗。
* **LINE Universal Link 狀態投遞**：改造 `DualCTA`，捨棄不穩定的 `redirectUri` 機制。按鍵觸發時，將使用者的選擇 (`painId`, `optionId`) 直接夾帶於 `liff.line.me` 網址參數中，強制開啟 LINE App，確保跨瀏覽器跳轉時狀態 100% 存活。
* **前端記憶重構 (`useLiff.ts` & `LiffInitPage`)**：
  * 進站時秒速攔截 URL 參數並覆寫入 `useAppStore`，解決 In-App Browser 無法讀取外部 Safari/Chrome localStorage 的系統級限制。
  * 導入 `entryPath` 記憶羅盤，登入前鎖定用戶出發網址（如 `/contract`），跳轉後無縫精準歸位，徹底拔除容易引起 400 Bad Request 的 Callback URL 白名單相依性。
* **陌生客降落傘 (Fallback Selector)**：升級 `/liff/welcome`。當偵測到無參數直接空降的訪客時，不顯示破圖或生硬預設值，而是無縫展開「優雅的 4 張微診斷點擊卡」。客人點擊後，動態滑出完整對口白與短卡，維持 100% 沉浸式漏斗體驗。
* **預約行事曆回歸 (`VITE_CALENDAR_URL`)**：捨棄難以控制時間的 LINE 直接通話，改為引入外部行事曆（Calendly / Cal.com）變數，讓顧問能精準掌控閒置時段並無縫進行 15 分鐘的線上收單。

---

## 🟢 v1.5.0: 對話點火層與共識確認層 (The Chat Ignition & Consensus Layer)
**發布重點**：徹底解決「漏斗斷層問題」。把網頁單向閱讀的終點，翻轉為 LINE 聊天室內真實可回看的「雙向對話起點」，並建立最高強度的簽約前信任閉環。
* **sendMessages-First 點火引擎**：徹底移除了 `LiffWelcomePage` 原有的多項冗長閱讀卡片，改以極簡的交接文字搭配單一按鈕「💬 好，先從這裡開始聊」。按下後，系統會自動在 LINE 聊天室「以使用者的名義」發出前測的痛點摘要，製造強烈而自然的對話起始感。
* **無縫微過場動畫 (Micro-Handoff)**：在按鈕點擊後加入 600ms 的 Loading 鎖定狀態 (`正在把這段帶進對話…`)，隨後瞬間關閉 LIFF 視窗 (`liff.closeWindow()`)，讓使用者流暢地回到聊天室等待 Bot 回覆。
* **Fallback 記憶守護**：針對不支援 `sendMessages` 的外部瀏覽器，實裝強悍的 Fallback 機制。透過 `fetch('/api/track/push')` 把 `painId` / `optionId` 狀態精準送往後端，再將使用者導回官方帳號，確保網頁上的所有選項記憶 100% 存活。
* **狀態流轉與共識層腳本化**：擴充 `line_chatbot_flow.md` 營運腳本。新增高精度狀態如 `chat_started_at` 與 `consensus_confirmed_at`。最關鍵的是在推播合約前，加入了「如果你覺得方向對，是不是該先補這一段？」的**共識確認層**，逼使客戶在 LINE 內留下一句親口說出的『對』。

---

## 🟢 v1.5.1: 全漏斗轉換事件與行爲追蹤矩陣 (Full Funnel Tracking Matrix)
**發布重點**：不留死角地捕捉所有漏斗節點的高意圖訊號，並為後續廣告優化與 UI 改版提供最紮實的數據基底。
* **Meta Pixel (FBq) 標準事件佈署**：
  * **Lead (潛在顧客)**：綁定於前端 2 組主要 CTA (`DualCTA` 的 LINE 按鈕、`HomePageB` 的看報告按鈕)。
  * **Contact (聯絡我們)**：綁定於所有直撥電話 15 分鐘的 CTA，捕捉高意圖熱線行動。
  * **InitiateCheckout (進入結帳流程)**：綁定於 `LiffWelcomePage` 點火按鈕，精準抓出願意真正在 LINE 內開聊的高純度受眾。
  * **Purchase (購買/簽約)**：綁定於 `ContractPage` 的合約簽署完成按鈕，並傳遞動態 TWD 金額（根據客戶自訂的合約總額）。
* **Hotjar 全站錄影與熱區追蹤**：於 `index.html` 基礎部署 Hotjar 代碼，無縫攝取所有冷熱流量的滾動深度、游標游移與停留斷點，補足 GA4 無法看見的「心理猶豫區塊」。

---

## 🟢 v1.5.2: 漏斗斷層修復與 Fallback 智慧選單 (Funnel State Integrity & Smart Fallback)
**發布重點**：修復了 `liff.line.me` 外跳時容易丟失追蹤參數的致命瑕疵，確保潛在客戶一但選定痛點與情境，其選項就會像釘子一樣牢牢鎖死在漏斗深處。
* **Persistent Zustand 狀態回寫**：在 `SituationPage` 補上了前端狀態回血機制 (`useEffect` 強制回寫選單標籤)。確保 `DualCTA` 按鈕被點擊時，能 100% 精準附帶 `?painId=x&optionId=y` 給 LIFF SDK。
* **分層式 Fallback Selector**：大幅度重構了 `LiffWelcomePage` 針對「沒有帶參數空降」訪客的防護網。現在墜機選項不再只問「痛點」，只要選完痛點，系統會流暢地原地滑出「第二層情境選單」，確保所有人都必須完成微診斷，底部的「點火按鈕」才會有反應，徹底根絕按鈕失效的靜默 Bug。

---

## 🟢 v1.5.3: Chat Ignition 協議重構 - oaMessage Prefill (The oaMessage Protocol)
**發布重點**：解決了 LINE 官方對 `liff.sendMessages` 的嚴格環境限制 (該 API 僅限於從聊天室內點開 LIFF 時可用，而在外跳漏斗時必定觸發異常)。
* **自動退回 oaMessage 協議**：廢棄了空白死路的普通 Fallback。現在當程式偵測到 `sendMessages` 被 LINE 官方阻擋時，會自動切換為原生的 URL Scheme `https://line.me/R/oaMessage/{Basic_ID}/?{Encoded_Text}`。
* **文字預填體驗 (Prefill Text)**：這項改動成功實現了「無縫進入聊天室，且對話框已經自動打好『我先從這裡開始聊…』」的絕佳體驗，用戶只需動下手指點選送出。
* **VITE_LINE_OA_ID 全局變數**：在 `.env` 中正式納管這項必備環境變數。

---

## 🟢 v1.5.4: 智慧合約引擎與級距式計價 (Smart Contract Engine & Tiered Pricing)
**發布重點**：合約不再是死板的 PDF 翻版，而是能即時感應參數、自動重算交易額的「動態法務文件」。
* **多級距收費條款自動化**：於 `contractTerms.ts` (第 2 條服務費用) 正式寫入「月合約 90k、季合約 80k、年合約 70k」的級距式定價結構，並加上了第 8 條「若提前解約，將以單月計價重新回溯計算補差價」的高強度防偽與防跑單條文。
* **合約金額動態演算 (`deriveAmount`)**：優化了 `ContractPage.tsx`。當業務團隊僅設定 `&months=3` 給客戶時，系統會全自動解析為 NT$80,000 的合約總價。
* **精準 Facebook Pixel 綁定**：連同 `Purchase` 價值追蹤，也會跟著這套動態演算得出精確的交易金額報送給 FB 廣告做 ROAS 最佳化。

---

## 🟢 v1.5.5: 跨站域電話快速撥打優化 (Global Phone Number Re-routing)
**發布重點**：將全站（包含首頁及各層級落地頁）的 15 分鐘診斷按鈕，全面從預設測試電話替換為官方服務專線 `+88622724261`，確保所有的 `Contact` 轉換漏斗都具備真實的接聽出口。

---

## 🟢 v1.5.6: 品牌信任感結尾 - 全域頁尾導入 (Global Footer Component Integration)
**發布重點**：為各級頁面加入了標準化且具備高度信任感的版權宣告頁尾。
* **共用元件 `Footer.tsx`**：將 Email、實體地址、可點擊的聯絡電話、製作人宣告以及 `Privacy Policy` 外連，封裝為高擴充性的共享視圖。
* **無痛嵌入**：已成功注入 `HomePage.tsx`、`HomePageB.tsx` 與最關鍵的閱讀區塊 `SituationPage.tsx`，在不影響核心漏斗視覺的前提下補足正規品牌感。

---

## 🟢 v1.5.7: 網域驗證與社群分享優化 (Facebook Domain & Meta Registry)
**發布重點**：為正式銜接 Meta Business Manager (企業管理平台) 的網域主權與廣告追蹤打好地基。
* **Domain Verification Meta Tag**：在系統的絕對進入點 `index.html` 的 `<head>` 區段植入了 `facebook-domain-verification` 原生標籤，免除了因 SPA 動態渲染可能導致 Facebook 抓取失敗的隱患。

---

## 🟢 v1.5.8: 官方 15 條顧問合約全量導入 (Official 15-Clause Contract Deployment)
**發布重點**：合約中心不再是範例檔，正式替換為具備實戰性與法律定義嚴謹的 15 條「廣告投放與成交優化顧問服務約定」。
* **結構化轉譯**：從官方提供的 `.docx` 精準對齊至 `contractTerms.ts` 的 JSON Array 中，保留了動態代碼如 `${params.startDate}` 與 `${params.amount}`。
* **情境客製化條款**：完善了第 8 條保密協定、第 11 條合約修改方式、第 13 條解約罰款防護條例與最終第 15 條的數位簽署電子合意效力聲明，將顧問服務合約武裝到牙齒。

## 🟢 v1.5.9: 實體合約產出流程轉型與功能擴充 (Physical Contract Generation Workflow)
**發布重點**：為因應高單價 B2B 法人合作的合規需求，將網頁從「數位簽章工具」全面轉型為「企業專屬合約 PDF 產生系統」，去除數位效力爭議，回歸實體用印流程。
* **合約防呆限制**：將合約長度輸入框替換為下拉選單（鎖定 1、3、6 個月），並於程式底層自動配對 9 萬、8 萬、7 萬之價格級距。
* **介面邏輯翻轉 (`flex-col-reverse`)**：利用 CSS 技術將表單填寫區塊移至合約文件的上方，讓客戶「先填寫參數」，下方即可即時預覽合約變化，大幅優化操作體驗。
* **條款去數位化與實體用印預留**：移除《條款十五》的「數位點擊同意條款」，回溯為標準的「一式兩份、雙方執憑」。重新排版 PDF 尾端區塊，新增甲乙雙方的「公司章」、「負責人章」專屬視覺用印空間。
* **雙向聯絡資訊收集**：於表單與合約尾端雙雙追加「聯絡人姓名」及「聯絡人行動電話」欄位，讓列印下來的實體合約具備明確的對接窗口。
* **非同步 PDF 產出防呆**：解決因高階畫質 PDF 產算耗時 2~4 秒導致的操作當機感。實裝了 `async/await` 與 `isDownloading` 等待狀態 (Loading spinner)，防止客戶重複點擊。
* **通訊管道同步重整**：更新 `notify-contract.ts` 後端 API，將發送給團隊的 LINE 通知文案由「簽署完成」修正為「產生合約等待用印」，並自動夾帶最新加入的客戶聯絡人資訊。

---

## 🟢 v1.6.0: 穩定化列印與專屬合約動態連結 (Native Print & Dynamic Contract URL)
**發布重點**：為徹底解決 LINE 內建瀏覽器 (LIFF / WebView) 對檔案下載 (Blob) 的嚴格防堵問題，去除了第三方算圖套件，改走「高保真原生列印」路線，並賦予每份合約「無限期讀寫」的保存能力。
* **原生列印架構 (Native Print API)**：全面捨棄容易因複雜 DOM 結構而當機的 `html2pdf.js`，改採 JavaScript 內建的 `window.print()`。配合全新的 `@media print` 專屬樣式表，實行了「印表機黑白高反差、隱藏按鈕與表單、禁止跨頁截斷條款」等多維度的列印體驗優化。
* **專屬動態連結 (URL SearchParams State)**：將合約的狀態儲存機制，從網頁的單次生命週期，進化為透過 `URLSearchParams` 直接綁定。客戶填寫完成後會自動產生打包所有參數的 `contractUrl`，不僅防呆，更改變了「只能一次性產出」的先天限制。
* **LINE 推播整合擴充**：於 Cloudflare API 中，成功將產出的 `contractUrl` 與「中國信託轉帳資訊」雙雙灌入 LINE 的提醒卡片。不只方便團隊追蹤，更讓客戶可以直接在 LINE 內無腦重開專屬合約，體驗大幅升級。
* **乙方統編校正**：修正了 `ContractPage.tsx` 預設的 25min 乙方統編為正確的 `52467800`。

---

**未來發展建議 (Next Steps)**：
- 對接前端真實 Analytics (如 PostHog) 以驗證每個微診斷節點的點擊留存率。
- 後端資料庫串接 (D1 / KV) 將蒐集到的 Session 與 PainPoint 偏好實體化保存。
- LINE Messaging API (如 Make / n8n) 實作對接，正式將點火訊息與第 1 輪 Quick Reply 動態串聯。

