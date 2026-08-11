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

export const hero = {
  eyebrow: 'AI TRANSFORMATION × BUSINESS STORY',
  title: '先決定希望市場看見什麼，再把值得被報導的轉型真正做出來。',
  description:
    '我們先把未來的企業專訪定為目標：客戶會因為哪一項改變，更願意下單、續約或合作？再從這個結果倒推 AI 導入、流程改造與系統整合，直到成果真正發生，也能被市場看懂。',
  primaryCta: '談談你想被報導的改變',
  secondaryCta: '先看報導完成後的樣子',
  identity: 'AI 導入轉型與企業故事合作',
  englishIdentity: 'AI Transformation × Business Story',
};

export const collaborationSteps = [
  {
    number: '01',
    eyebrow: 'DEFINE THE STORY GOAL',
    title: '定義報導目標',
    description: '先回答：這次轉型完成後，客戶、合作夥伴或人才應該如何重新理解這家公司？',
    result: '產出：報導命題、企業目標與可驗證的成功條件',
  },
  {
    number: '02',
    eyebrow: 'BUILD THE REAL CHANGE',
    title: '倒推 AI 導入與整合',
    description: '從目標回推流程、資料、AI 應用、系統串接與人員接手，完成真正能運作的轉型。',
    result: '產出：AI 工作流程、系統整合與營運落地',
  },
  {
    number: '03',
    eyebrow: 'PROVE AND TELL',
    title: '驗證成果，完成專訪報導',
    description: '確認可公開的數據、畫面與決策脈絡，把已經發生的改變寫成企業專訪與市場信任。',
    result: '產出：企業專訪報導與可供業務使用的內容資產',
  },
];

export const collaborationOutcomes = [
  {
    number: '01',
    eyebrow: 'OPERATIONAL OUTCOME',
    title: '真正完成的 AI 導入轉型',
    description: '不是停在簡報或工具採購，而是讓資料、流程、系統與人員能在實際營運中接得起來。',
  },
  {
    number: '02',
    eyebrow: 'MARKET OUTCOME',
    title: '能對外使用的企業專訪報導',
    description: '把轉型成果變成客戶、合作夥伴與人才看得懂的企業故事，成為提案、銷售與品牌信任的一部分。',
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
