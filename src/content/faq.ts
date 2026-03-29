export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    id: "agency",
    question: "我之前也找過代操，還不是一樣，差在哪？",
    answer: "很正常。很多人一開始都以為問題在流量。\n但做一陣子後才會發現：人有進來，結果沒出來。\n\n那問題就不是怎麼帶人進來，而是進來後發生什麼事。"
  },
  {
    id: "design",
    question: "我也做過頁面，但根本沒用啊？",
    answer: "也很正常。很多頁面只是資訊排版，不是成交設計。\n\n真正影響轉換的，是訪客『在哪一段開始懷疑』、『在哪一段不敢往下』。抓出那個順序才是重點。"
  },
  {
    id: "support",
    question: "但現在要做重新優化，公司或夥伴不一定支持。",
    answer: "這也合理。先不要急著說服別人。\n\n先把第一步做出來，先看清楚問題，先做出一點效果。很多時候，先有結果，比先講道理有用。"
  }
];