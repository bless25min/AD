export type AssetPath = {
  id: string;
  shortLabel: string;
  title: string;
  gap: string;
  outcome: string;
  evidence: string[];
};

export type CollaborationEntrance = {
  number: string;
  title: string;
  partnerBrings: string;
  blessAdds: string;
  outputs: string[];
  firstStep: string;
};

export type EvidenceCase = {
  name: string;
  label: string;
  thesis: string;
  contribution: string;
  outputs: string[];
  href?: string;
  image?: string;
};

export type CollaborationPath = {
  id: string;
  eyebrow: string;
  title: string;
  introduction: string;
  partnerBrings: string;
  blessAdds: string;
  sharedOutcomes: string[];
};

export const hero = {
  eyebrow: '企業客製 AI 系統',
  title: '客人從 LINE 進來，\n誰接、接到哪裡，老闆應該隨時看得到。',
  description:
    '我把散落在 LINE、Meta、門市、Excel 與員工腦中的資料接起來，照你們現在的做法，做成團隊每天真的會用的系統。',
  assurance: '先挑最常漏單、最花時間的一段做，不用整間公司砍掉重練。',
  primaryCta: '跟我說現在最容易漏在哪裡',
  secondaryCta: '看系統怎麼運作',
  microcopy: '不用準備規格書。把你們現在怎麼做、哪裡最煩，直接講給我聽就好。',
  identity: '企業客製 AI 系統與營運流程合作',
  englishIdentity: 'Custom AI Systems for Business Operations',
};

export const enterpriseProblems = [
  {
    number: '01',
    title: '名單進來了，沒人知道輪到誰接',
    description: 'LINE 一批、Meta 一批、門市又一批。人一忙，客人就安靜地不見。',
    loss: '廣告費花了，連為什麼沒成交都沒有留下。',
  },
  {
    number: '02',
    title: '月底看到業績掉，已經來不及補',
    description: '是名單變少、沒聯絡、預約沒到，還是現場沒成交？報表只告訴你少了多少。',
    loss: '老闆需要的不是更多表格，而是今天該修哪一段。',
  },
  {
    number: '03',
    title: '公司最會賣的人一請假，整組人跟著卡住',
    description: '他怎麼問、怎麼判斷客人有沒有興趣、幾天後再追，別人只能自己猜。',
    loss: '這些做法沒有留在公司裡，就很難教、很難複製。',
  },
];

export const operatingLoop = [
  { number: '01', title: '客人從哪裡來', detail: 'LINE、Meta、網站或哪一家門市' },
  { number: '02', title: '現在輪到誰', detail: '分派、預約、提醒、追蹤與真人接手' },
  { number: '03', title: '卡在哪一關', detail: '沒聯絡、沒到店，還是沒有成交' },
  { number: '04', title: '下次怎麼更好', detail: '留下客人問什麼、為什麼買或沒買' },
];

export const foundationCapabilities = [
  '把 LINE、Meta 的對話和名單放在一起',
  '分派、預約、提醒和追蹤',
  '多品牌、多門市和主管權限',
  '看得到來源、到店、成交和流失',
];

export const customCapabilities = [
  '你們習慣用的欄位和判斷方式',
  '什麼時候提醒、誰要接手',
  '主管真正想看的數字和權限',
  '接回原本的 CRM、ERP 或其他工具',
];

export const collaborationSteps = [
  {
    number: '01',
    title: '先看你們現在怎麼做',
    description: '不用先寫規格，我會從第一線的做法把問題找出來。',
  },
  {
    number: '02',
    title: '挑一段最值得先做',
    description: '先看它能不能多成交、少流失，或讓主管少追著人問。',
  },
  {
    number: '03',
    title: '做出來，讓真的會用的人試',
    description: '先在一個品牌、門市或團隊跑，不好用就直接改。',
  },
  {
    number: '04',
    title: '有結果，再寫成一篇好故事',
    description: '只寫已經發生、能確認的改變，讓客戶也看得懂。',
  },
];

export const collaborationOutcomes = [
  {
    number: '01',
    title: '團隊每天會打開的系統',
    description: '名單進來後誰接、追到哪、哪裡卡住，主管不用再一個一個問。',
    image: '/images/line-chat-manager-dashboard.png',
  },
  {
    number: '02',
    title: '客戶願意轉傳給老闆看的專訪',
    description: '不只說「我們用了 AI」，而是讓人看懂這家公司做了什麼，合作起來為什麼更放心。',
    image: '/images/home/ai-transformation-business-story.jpg',
  },
];

export const riskReversals = [
  '先做一個流程、一家店，跑得動再擴大。',
  '能接原本的 CRM、ERP 或表單，就不要求全部重來。',
  'AI 能做什麼、誰看得到資料、何時交給真人，由你決定。',
  '客戶資料和營運資料都是你的。',
];

export const collaborationPaths: CollaborationPath[] = [
  {
    id: 'enterprise',
    eyebrow: 'FOR ENTERPRISES',
    title: '企業合作',
    introduction: '從一個影響訂單、客戶信任或營運效率的真實問題開始。',
    partnerBrings: '真實問題、流程、資料與決策者參與',
    blessAdds: '目標定義、流程盤點、AI 導入、系統整合、營運落地與專訪製作',
    sharedOutcomes: ['客戶真正完成導入', '可對外使用的企業專訪', '可持續使用的業務內容資產'],
  },
  {
    id: 'software-partner',
    eyebrow: 'FOR SOFTWARE PARTNERS',
    title: '軟體開發商合作',
    introduction: '把一次客製導入，變成客戶、開發商與市場都能繼續使用的成果。',
    partnerBrings: '產品、技術能力、客戶關係與交付資源',
    blessAdds: '應用情境、導入規劃、跨系統整合、客戶訪談與成果內容',
    sharedOutcomes: ['客戶真正完成導入', '可重複使用的 B2B 成功案例', '開發商與企業共同取得市場信任'],
  },
];

export const collaborationFit = [
  '企業有一個影響客戶信任、營運效率或成長的重要問題。',
  '決策者願意參與，並提供流程、資料與必要的整合條件。',
  '完成後願意在確認事實與權利邊界後，對外分享轉型成果。',
];

export const assetPaths: AssetPath[] = [
  {
    id: 'product',
    shortLabel: '產品／技術',
    title: '我有產品／技術，缺市場證據',
    gap: '技術做得出來，買方卻只看到功能，無法理解導入後會改變什麼。',
    outcome: '共同完成可被驗證、被轉述、也能交給業務使用的產業案例。',
    evidence: ['line-chat-manager', 'RoleFit'],
  },
  {
    id: 'brand',
    shortLabel: '品牌／客戶',
    title: '我有品牌／客戶，缺新的產品形式',
    gap: '既有內容和通路成熟，但缺少能讓客戶參與、留下資料或持續營運的數位體驗。',
    outcome: '把品牌議題做成互動產品、AI 應用、LINE 流程或新服務入口。',
    evidence: ['FightNight', 'dr-julia'],
  },
  {
    id: 'delivery',
    shortLabel: '共同交付',
    title: '我有客戶需求，缺共同交付能力',
    gap: '單一團隊難以同時處理產品定義、前後台、資料、追蹤、上線與營運。',
    outcome: '以清楚責任邊界完成一個可使用、可測試、可交接的 vertical slice。',
    evidence: ['line-chat-manager', 'TALO'],
  },
  {
    id: 'proof',
    shortLabel: '成功案例',
    title: '我有成功案例，但尚未被整理與傳播',
    gap: '成果只在內部簡報或對話裡，每次成交仍要從頭解釋。',
    outcome: '把導入證據轉成專訪、案例頁、業務素材、短內容與可追蹤入口。',
    evidence: ['AI 導入成功案例共創', 'TALO'],
  },
  {
    id: 'distribution',
    shortLabel: '內容／通路',
    title: '我有內容／通路，想找可信的產品與案例',
    gap: '有觸及，卻缺少具實際產品、人物與商業改變的深度題材。',
    outcome: '共同策劃能被查證、可延伸成系列內容的產業故事。',
    evidence: ['dr-julia', 'FightNight'],
  },
  {
    id: 'idea',
    shortLabel: '尚未成形的構想',
    title: '我有一個尚未成形的合作構想',
    gap: '方向有潛力，但還沒有清楚對象、交換價值、第一批產出或停止條件。',
    outcome: '先完成資產、受益者、風險與最小合作地圖，再決定是否投入開發。',
    evidence: ['RoleFit', 'Senior'],
  },
];

export const flywheel = [
  { number: '01', label: '既有資產', detail: '產品、客戶、品牌、技術或通路' },
  { number: '02', label: '共同定義機會', detail: '誰的問題、誰會受益、如何驗證' },
  { number: '03', label: '產品／AI 落地', detail: '做出真正能被使用的最小版本' },
  { number: '04', label: '驗證成果', detail: '把觀察、證據與限制分清楚' },
  { number: '05', label: '故事與內容', detail: '專訪、案例、銷售與發布素材' },
  { number: '06', label: '新信任與商機', detail: '讓一次交付成為下一次合作入口' },
];

export const entrances: CollaborationEntrance[] = [
  {
    number: 'A',
    title: '品牌合作',
    partnerBrings: '品牌、產品、客群或通路',
    blessAdds: '新產品形式、互動體驗、AI／LINE 應用、營運流程與成效證據',
    outputs: ['聯名產品', '品牌專題', '互動活動', '新獲客體驗'],
    firstStep: '選一個既有品牌資產，畫出它還能為哪些人創造新價值。',
  },
  {
    number: 'B',
    title: '開發合作',
    partnerBrings: '工程、平台、既有產品或客戶關係',
    blessAdds: '需求 discovery、產品定義、跨系統體驗、營運介面與市場轉譯',
    outputs: ['客製系統', 'AI workflow', '產品模組', '可複製方案'],
    firstStep: '選一個正在卡住的客戶流程，完成一個可驗證 vertical slice。',
  },
  {
    number: 'C',
    title: '行銷合作',
    partnerBrings: '真實產品、導入成果或產業觀點',
    blessAdds: '訪談、證據梳理、敘事、發布路徑、landing page 與轉換追蹤',
    outputs: ['企業專訪', '客戶成功案例', '業務素材', 'SEO／短內容'],
    firstStep: '挑一個願意公開的成果，先確認證據、權利與受眾。',
  },
];

export const blueprintParties = [
  { name: '軟體開發商', asset: '技術、產品、導入經驗、客戶關係', return: '客戶證言、業務素材、SEO、產業定位與新商機' },
  { name: '企業客戶', asset: '真實問題、使用歷程、成果與產業觀點', return: '創新能見度、雇主品牌與內部成果 recognition' },
  { name: 'Bless', asset: '訪談、產品梳理、證據驗證、內容與轉換設計', return: '合作收入、可信案例、產業關係與後續共創' },
  { name: '內容／媒體夥伴', asset: '觸及、編輯與議題能力', return: '有實際成果的題材與系列專題機會' },
];

export const blueprintSteps = [
  '選出具代表性且願意公開的客戶',
  '訪談決策者、執行者與實際使用者',
  '梳理問題、選擇、阻力、解法與改變',
  '驗證可公開數據、引用、畫面與名稱',
  '製作案例頁、專訪、短內容與業務素材',
  '區分自有發布、新聞稿、付費刊登與自然報導',
  '加入詢問入口與來源追蹤',
  '把內容交回各方，形成下一次合作資產',
];

export const evidenceCases: EvidenceCase[] = [
  {
    name: 'line-chat-manager',
    label: 'CUSTOM OPERATIONS SYSTEM',
    thesis: '把散落在 LINE、名單與人工判斷裡的工作，做成可追蹤、可操作的客製系統。',
    contribution: '流程盤點、資料骨幹、LINE／API 整合、營運介面與人工接手。',
    outputs: ['客製系統', '營運流程', '資料證據'],
    image: '/images/line-chat-manager-dashboard.png',
  },
  {
    name: 'TALO',
    label: 'BRAND × COMMERCE INFRASTRUCTURE',
    thesis: '把內容、LINE、結帳、付款與後續營運串成能判斷真實成果的商業路徑。',
    contribution: '品牌敘事、漏斗、追蹤、付款狀態、會員與管理端。',
    outputs: ['品牌入口', '成交路徑', '營運真相'],
    href: 'https://tolokah.25min.co/',
    image: '/images/tolokah-adult-assessment.png',
  },
  {
    name: 'FightNight',
    label: 'EXPERIENCE × CAMPAIGN',
    thesis: '把一堂拳擊課重新做成有敘事、有節奏、也能被分享的一晚品牌體驗。',
    contribution: '體驗定位、活動產品、內容視覺、付費入口與行銷共創。',
    outputs: ['活動產品', '品牌體驗', '行銷素材'],
    href: 'https://fightnight.25min.co/',
    image: '/images/fightnight-hero-poster.png',
  },
  {
    name: 'RoleFit',
    label: 'B2B PRODUCT × MARKET ENTRY',
    thesis: '把模糊的企業招募困境，轉成買方能搜尋、理解與採取下一步的產品。',
    contribution: 'B2B 定位、買方語言、產品入口、轉換追蹤與市場驗證。',
    outputs: ['產品定位', '買方語言', '市場入口'],
    href: 'https://rolefit.25min.co/',
    image: '/images/rolefit-og.png',
  },
  {
    name: 'dr-julia',
    label: 'HIGH-TRUST AI SERVICE',
    thesis: '讓專業內容、AI、LINE 身分與真人判斷，在高信任服務中安全接手。',
    contribution: '內容體驗、AI 應用、LINE identity、諮詢意圖與真人服務流程。',
    outputs: ['高信任內容', 'AI 流程', '真人回接'],
    href: 'https://dr-julia.25min.co/',
    image: '/images/dr-julia-hero-banner.png',
  },
];

export const trustPrinciples = [
  '客戶名稱、商標、畫面、引用與數據需經書面同意。',
  '專訪、品牌內容、新聞稿、付費刊登與自然報導分開命名。',
  '不保證媒體採用、自然曝光、營收或 leads。',
  '數據必須可追溯；無法驗證時使用定性描述。',
  '內容再利用、署名、獨家、商機歸屬、售後與維護在合作前定義。',
];

export const portfolioUrl = 'https://blessliao.25min.co/';
export const mediaDemoUrl = '/stories/ai-manufacturing-order-visibility-demo/';
export const mediaStoryLibraryUrl = '/stories/';
