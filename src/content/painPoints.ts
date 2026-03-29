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
    title: "廣告越投越貴，但你也不敢停",
    shortDescription: "每天都在花錢，但你心裡其實知道這樣不太對。",
    detailedDescription:
      "你應該有這種感覺：\n\n預算一加，成本就跟著漲。\n預算一降，又沒人來。\n\n你開始懷疑是不是素材不夠好、受眾不夠準。\n但其實不是。\n\n是你現在這個漏斗，每一個進來的人，都要重新被說服一次。\n\n所以你只能一直用更高的價格，去買下一個『也可能不會成交的人』。",
    recommendedNextStep:
      "先把漏斗重建，讓進來的人不用每次都從 0 開始被說服。"
  },
  {
    id: "low_conversion",
    title: "有人來問，但永遠卡在『我再看看』",
    shortDescription: "LINE 很熱鬧，但成交很安靜。",
    detailedDescription:
      "你每天都在回訊息。\n\n報價、解釋、補充、再解釋。\n\n最後對方說：\n「我再考慮一下」\n\n然後就沒有然後。\n\n問題不是你不會賣。\n\n是對方在開口之前，腦袋裡其實已經有一堆疑問，\n但你沒有提前處理掉。",
    recommendedNextStep:
      "把『成交前該發生的說服』，搬到頁面上先完成。"
  },
  {
    id: "unstable",
    title: "有時很好，有時直接歸零",
    shortDescription: "你其實不敢放大，因為不知道什麼時候會爆掉。",
    detailedDescription:
      "有幾天你會覺得：\n好像抓到感覺了。\n\n但下一週，整個數據又掉下去。\n\n你開始懷疑：\n是不是運氣？是不是演算法？\n\n但真正的問題是——\n\n你沒有一個可以重複發生的成交流程。\n\n所以每一次成交，都像重新賭一次。",
    recommendedNextStep:
      "把運氣拿掉，讓成交變成可以複製的流程。"
  },
  {
    id: "no_idea",
    title: "有流量、有互動，但就是沒人下決定",
    shortDescription: "看起來好像有在動，但就是沒有結果。",
    detailedDescription:
      "你會看到：\n\n有人按讚、有人留言、有人點進來。\n\n甚至也有人加 LINE。\n\n但最後沒人做出『那一步』。\n\n通常不是因為不夠便宜。\n\n而是因為——\n\n他在關鍵那一刻，產生了疑慮，但沒有人幫他解答。",
    recommendedNextStep:
      "找出用戶卡住的那一段，把它補起來。"
  }
];