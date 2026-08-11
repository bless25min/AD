export interface ServiceGroup {
  title: string;
  items: string[];
  note?: string;
}

export interface ServiceSection {
  title: string;
  intro?: string;
  emphasis?: string;
  emphasisSuffix?: string;
  description?: string;
  groups?: ServiceGroup[];
  items?: string[];
  note?: string;
}

export const lineMetaAiPricing = [
  { item: '顧客對話暨業務管理平台', price: 'NT$18,000 / 月' },
  { item: 'AI Agent 暨持續客製開發服務', price: 'NT$24,000 / 月' },
  { item: '單獨採購合計', price: 'NT$42,000 / 月' },
  { item: '本案年度統包優惠價', price: 'NT$25,000 / 月', highlighted: true },
  { item: '本案年度統包優惠價（未稅）', price: 'NT$300,000 / 年', highlighted: true },
  { item: '5% 營業稅', price: 'NT$15,000' },
  { item: '年度含稅總額', price: 'NT$315,000', total: true },
];

export const lineMetaAiSections: ServiceSection[] = [
  {
    title: '二、顧客對話暨業務管理平台',
    groups: [
      {
        title: 'LINE / Meta 對話管理',
        items: [
          'LINE 官方帳號串接', '多 LINE 官方帳號管理', 'Facebook Messenger 對話串接',
          '多渠道顧客對話集中管理', '歷史對話紀錄', '後台直接回覆',
          '已處理／待處理狀態', '顧客對話搜尋',
        ],
      },
      {
        title: '顧客資料管理',
        items: [
          '顧客基本資料', '姓名、電話及模糊關鍵字搜尋', '顧客備註', '顧客來源紀錄',
          '所屬館別／門市', '負責人員', '顧客目前狀態', '歷史互動紀錄',
        ],
      },
      {
        title: '標籤與群發管理',
        items: [
          '手動與自動標籤', '多標籤篩選', '關鍵字觸發標籤',
          '依館別、標籤、負責人員、顧客狀態或自訂條件建立群發名單',
        ],
      },
      {
        title: '多館別／多門市與權限管理',
        items: [
          '多館別資料管理與跨館查看', '顧客館別移轉', 'Lead 自動辨識、分派與轉派',
          '第一線人員、店主管、跨店主管／總部等多層權限', '未分派顧客管理',
        ],
        note: '本方案不依門市／館別數量、LINE 官方帳號數量、Meta 粉絲專頁數量或後台使用者數量另行加價。',
      },
    ],
  },
  {
    title: '三、Lead 與業務追蹤',
    groups: [
      {
        title: 'Lead 管理',
        items: ['LINE Lead', 'Meta Lead', 'Messenger Lead', 'Lead 來源紀錄', '館別辨識', '人員分派'],
      },
      {
        title: '顧客流程管理',
        items: ['自訂顧客狀態', '預約日期', '到訪／未到訪紀錄', '追蹤紀錄', '成交狀態'],
        note: '流程可依實際營運需求設定，例如：新名單 → 已聯絡 → 已預約 → 已到訪 → 待追蹤 → 成交。',
      },
      {
        title: '每日待辦',
        items: ['今日預約', '待追蹤顧客', '未回覆訊息', '逾期未處理顧客', '未到訪顧客', '未分派顧客', '資料未完整顧客'],
      },
    ],
  },
  {
    title: '四、來源與轉換分析',
    items: [
      '顧客來源辨識及 LINE／Meta 來源區分', '廣告來源紀錄',
      'Lead、已聯絡、預約、到訪與成交數', '各階段轉換率', '館別／門市分開統計',
    ],
    note: '實際可取得之廣告資料，依 Meta、LINE 等第三方 API 提供範圍為準。',
  },
  {
    title: '五、歷史資料移轉',
    items: [
      'LINE 官方帳號 CSV 匯入', 'LINE TXT 對話紀錄匯入', '多檔案批次匯入',
      '歷史對話保存', '重複訊息排除', '既有顧客資料移轉', '重要標籤移轉',
    ],
    note: '完整年度方案包含系統導入與資料移轉。',
  },
  {
    title: '六、AI Agent 服務',
    groups: [
      {
        title: 'AI 自動回覆',
        items: ['依甲方提供之商品／服務、門市、營業時間、價格、活動、常見問題與歷史客服資料設定', '支援指定回覆規則'],
      },
      {
        title: 'AI Lead 接待',
        items: ['第一時間自動接待', '需求詢問', '館別／門市確認', '聯絡資料蒐集', '預約引導', '真人接手'],
      },
      {
        title: 'AI 業務輔助與優化',
        items: ['對話摘要', '顧客需求及待處理事項整理', '追蹤重點', '建議回覆方向', '知識內容更新', '錯誤案例及話術持續調整'],
      },
    ],
  },
  {
    title: '七、AI 使用額度',
    intro: 'AI Agent 服務每月包含：',
    emphasis: '5,000 次 AI 回覆',
    emphasisSuffix: '，約 1,000 位用戶，每位約 5 次對話。',
    description: '此額度僅計算 AI Agent 實際產生之 AI 回覆。',
    groups: [
      {
        title: '不影響：',
        items: [
          '顧客數量', '會員數量', '人工客服對話', 'LINE / Meta 一般訊息',
          '後台使用者數量', '門市數量',
        ],
      },
    ],
    note: '超出 AI 回覆額度前將另行通知，後續依實際使用需求確認費用。',
  },
  {
    title: '八、客製開發與技術服務',
    intro: '年度統包方案每月包含：',
    emphasis: '20 小時客製開發與技術服務額度',
    groups: [
      {
        title: '可使用於：',
        items: [
          '需求討論', '現有功能調整', '小型功能新增', '工作流程自動化',
          'AI Agent 調整', '顧客欄位調整', '顧客狀態調整', '報表調整',
          '提醒機制', '第三方 API 串接', '測試', '上線', '技術問題處理',
        ],
      },
    ],
  },
  {
    title: '九、系統維運',
    items: [
      '雲端系統基本運行費與資料庫', '系統維護與 Bug 修正', '基本監控',
      'API 維護', 'LINE／Meta 平台規格異動之合理調整', '使用問題協助',
    ],
  },
  {
    title: '十、第三方費用',
    intro: '下列第三方產生之費用不包含於本報價：',
    items: [
      'LINE 官方帳號方案費', 'LINE 官方訊息費', 'Meta 廣告費', '簡訊費',
      'Email 發送費', '第三方付費 API', '第三方 SaaS 服務',
      '指定特殊高成本 AI 模型', '超出方案額度之額外 AI 使用費',
    ],
    note: '上述費用依第三方實際收費標準計算。',
  },
  {
    title: '十一、資料與系統權利',
    items: [
      '顧客資料歸甲方所有', '對話資料歸甲方所有', '會員及營運資料歸甲方所有',
      '系統共用程式及底層架構之智慧財產權歸乙方所有',
      '合作期間由乙方提供甲方系統使用權', '原始碼不包含於本合約服務範圍',
    ],
  },
];

