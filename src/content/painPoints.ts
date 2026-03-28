export interface PainPoint {
  id: string;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  recommendedNextStep: string;
}

export const painPoints: PainPoint[] = [
  {
    id: "high_cpa",
    title: "廣告成本越來越高",
    shortDescription: "花同樣的錢，帶來的名單卻越來越少。",
    detailedDescription: "這通常是因為你的系統依賴 '直接銷售' 的漏斗。在缺乏信任的情況下，每次都要用極高的出價才能買到一點點殘存的點擊。真正的問題是流量進來後流失太快。",
    recommendedNextStep: "立即領取顧問式漏斗重建指南，停止將預算投入在無效的轉換漏斗中。"
  },
  {
    id: "low_conversion",
    title: "有人來問但不成交",
    shortDescription: "每天回覆一堆 LINE，但最後都說要再考慮。",
    detailedDescription: "這代表你的銷售對話感不足，客戶只把你當作詢價對象。你需要在客戶開口問價錢之前，先用設計好的內容建立權威感，讓他們被你說服。",
    recommendedNextStep: "領取『高客單價成交話術範本』與『預約前認知教育手冊』。"
  },
  {
    id: "unstable",
    title: "成交極度不穩定",
    shortDescription: "好的時候很好，壞的時候掛蛋，總在提心吊膽。",
    detailedDescription: "你沒有一個『可預測的轉換系統』。你可能過度依賴大檔期或不穩定的廣告演算法。系統化你的信任建立流程，每天才能帶來穩定的高質詢問。",
    recommendedNextStep: "透過 15 分鐘顧問諮詢，找出你漏斗中的斷點。"
  },
  {
    id: "no_idea",
    title: "有流量但沒轉換，不知卡在哪",
    shortDescription: "粉專互動不錯，網站也有人看，但就是沒有預約。",
    detailedDescription: "流量被接住之前，客戶產生了疑慮卻無人解答。你的頁面缺乏完整的『疑慮處理』與分流機制，導致訪客放棄行動。",
    recommendedNextStep: "免費獲得『銷售頁檢查清單』，找出讓你流失客戶的罪魁禍首。"
  }
];
