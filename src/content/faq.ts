export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    id: "agency",
    question: "我之前也找過代操，差在哪？",
    answer:
      "多數代操會幫你把人帶進來。\n\n但帶進來之後會發生什麼，通常沒有人處理。\n\n所以你會覺得：有流量，但沒結果。\n\n我做的剛好是那一段。"
  },
  {
    id: "design",
    question: "我也做過頁面，但沒什麼用？",
    answer:
      "因為大部分頁面，是『好看』，不是『會成交』。\n\n真正會成交的頁面，會處理用戶在每一個階段的疑慮。\n\n不是只把資訊排好而已。"
  },
  {
    id: "sales",
    question: "這是不是又一套話術？",
    answer:
      "如果是話術，它就不能複製。\n\n但如果是結構，它就會一直發生。\n\n我做的是後者。"
  }
];