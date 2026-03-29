export interface PainPoint {
  id: string;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  
  // 新版正向心理學推進
  positiveFeedback: string;
  
  followUp: {
    question: string;
    options: {
      id: string;
      text: string;
    }[];
  };
  
  affirmativeGuidance: string;
  microDiagnosis: string;
  microDiagnosisBridge?: string;
  progressSense: string;
  
  recommendedNextStep: string;
}

export const painPoints: PainPoint[] = [
  {
    id: "high_cpa",
    title: "廣告越投越貴，但你根本不敢停",
    shortDescription: "你知道再這樣下去很危險，可是你更怕一停就什麼都沒了。",
    detailedDescription: "你絕對很熟悉這種感覺：\n\n預算一加，成本就跟著往上衝。\n預算一降，名單直接變少。\n\n你會開始懷疑自己：\n是不是我不懂投放？是不是市場變差了？\n但最折磨人的，是你慢慢變得『不敢放大預算』。\n每一筆錢丟進去，都好像在賭明天會不會有人問。",
    positiveFeedback: "這個狀況很常見，很多人就是卡在這裡，然後一直不知道怎麼拆。",
    followUp: {
      question: "很多人走到這一步，心裡最常冒出來的是這兩種，你比較像哪一個？",
      options: [
        { id: "burn", text: "預算越燒越高，但不敢再加大" },
        { id: "boss", text: "不知道還要不要繼續投，老闆或夥伴開始懷疑" }
      ]
    },
    affirmativeGuidance: "你會卡在這裡，不代表你做錯很多，反而代表你已經看見有問題，只是還不知道怎麼拆。",
    microDiagnosis: "不是廣告壞掉，也不是你懂不懂投放的問題。是你失去了對『轉換』的控制感。\n\n當漏斗後端接不住流量時，前端每一次加大預算都是在賭機率。這種沒有『確定感』的投放，才是你不敢放大的根本原因。",
    progressSense: "看到這裡，你其實已經比一開始更接近答案了。如果現在有一種「對，就是這個」的感覺，代表這正是你要補的洞。",
    recommendedNextStep: "先不要急著砸更多預算。我們得先把進來的人『怎麼被說服』的過程，重新順一次。"
  },
  {
    id: "low_conversion",
    title: "有人來問，但最後都死在『我再看看』",
    shortDescription: "最累的其實不是沒人問，是每個人都像快成交了，最後又冷掉。",
    detailedDescription: "你每天都在回訊息，耐心報價、解釋，甚至聊得很開心。\n\n但最後總是聽到這句：\n『好，我想一下』\n『我跟家人討論一下』\n然後就徹底消失了。\n\n久了你一定會懷疑：『是不是我不會賣？』或者『是不是定價太高？』",
    positiveFeedback: "你有注意到這一層，其實已經比很多人早一步。",
    followUp: {
      question: "很多人走到這一步，心裡最常冒出來的是這兩種，你比較像哪一個？",
      options: [
        { id: "ghost", text: "LINE 聊得很熱絡，但一談到價格或步驟就消失" },
        { id: "compare", text: "一直問別家的價格，然後說要回去考慮" }
      ]
    },
    affirmativeGuidance: "這不是你不會講，也不是因為客戶沒錢。這只是一個很常漏掉的設計盲區。",
    microDiagnosis: "真正的原因是：對方在開口找你之前，腦袋裡那堆『可是...』，根本沒有被提前解決掉。\n\n他在防備。他在等你說服他，而不是自己想通。這代表你的『頁面承接』沒有先幫你處理掉他的疑慮。",
    progressSense: "這很正常，當你發現這是頁面問題而不是銷售力問題時，你就已經抓到核心了。",
    recommendedNextStep: "把那些『本來要靠你用嘴巴補』的說服過程，先搬到他來找你之前的頁面上。"
  },
  {
    id: "unstable",
    title: "偶爾會爆單，但更多時候是零",
    shortDescription: "有時候很好，有時候直接歸零。最可怕的是，你不知道為什麼好。",
    detailedDescription: "有幾天你會覺得：『對，就是這個感覺！』\n\n但到了下週，整個數據又莫名其妙掉下去。\n你開始慌了：是我哪裡改壞了嗎？是不是那一波運氣比較好？\n\n這種『不知道為什麼成交』，比『沒有成交』還要讓人焦慮。",
    positiveFeedback: "其實很多人都在這個循環裡，你並不孤單。",
    followUp: {
      question: "很多人走到這一步，心裡最常冒出來的是這兩種，你比較像哪一個？",
      options: [
        { id: "change_ads", text: "趕快換素材、調廣告、重開幾個活動" },
        { id: "freeze", text: "不知道哪裡壞了，只能乾等，不敢亂動" }
      ]
    },
    affirmativeGuidance: "你會覺得無力是正常的，不代表你能力不夠，而是你缺乏一個可以驗證的控制節點。",
    microDiagnosis: "這其實是最危險的狀態。因為沒有『穩定成交機制』，所以每一次成交都像是運氣好剛好遇到想買的人，而不是被你的流程說服。\n\n沒有確定性的流程，哪怕你今天大賣，明天的焦慮依然會存在。",
    progressSense: "知道問題出在『流程確定性』，代表你已經走到可以開始系統化解決的階段了。",
    recommendedNextStep: "把運氣拿掉。把你曾經成交過的『那個對話過程』，複製成會一直自己運作的流程。"
  },
  {
    id: "no_idea",
    title: "有互動有流量，但就是沒人下決定",
    shortDescription: "看起來好像大家都喜歡，但就是沒有結果。",
    detailedDescription: "你看著後台的數字：\n有人按讚、有人留言、有人點進來，甚至也有人加了 LINE。\n\n但最後沒人掏錢，沒人預約。\n你會想：『是不是我哪裡做錯了？』\n其實不是因為你做錯，而是因為在他要下決定的最關鍵那一手，他遲疑了。",
    positiveFeedback: "這是一個很好的起點，代表你的第一層吸引力是沒問題的！",
    followUp: {
      question: "很多人走到這一步，心裡最常冒出來的是這兩種，你比較像哪一個？",
      options: [
        { id: "fake_hope", text: "覺得快成交了，但等不到結果，很耗神" },
        { id: "give_up", text: "開始覺得自己做這些內容，是不是根本在浪費時間" }
      ]
    },
    affirmativeGuidance: "這代表你已經把困難的部分（讓人注意）做到了，只差最後一步把他接住。",
    microDiagnosis: "這是典型的『流量沒有被接住』。現代人對『多走一步』非常抗拒。哪怕他有一秒鐘的興趣，只要在那短短幾秒鐘沒有一個強而有力的介面推他一把，幫他回答『這干我什麼事』，他就會滑掉。",
    progressSense: "看清楚這是『承接斷層』後，所有的焦慮就會慢慢平息，因為你知道該怎麼做了。",
    recommendedNextStep: "抓出他猶豫不決的那幾秒鐘是卡在哪裡，然後把它補起來。"
  }
];