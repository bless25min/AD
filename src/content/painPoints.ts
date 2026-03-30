export interface PainPoint {
  id: string;
  title: string;
  shortDescription: string;
  detailedDescription: string;
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
  // added for pure LINE follow-up flow
  lineCard1: string;
  lineCard2: string;
  lineCard3: string;
}

export const painPoints: PainPoint[] = [
  {
    id: "traffic_drop",
    title: "廣告越投越貴，點擊率一直掉",
    shortDescription: "以前隨便投都有單，現在換了幾百組素材，預算還是像丟進水裡。",
    detailedDescription: "你可能已經試過換代操、學剪短影音、做梗圖，但每次紅利期都越來越短。你開始懷疑是不是自己的產品沒對手強，或是臉書演算法又在針對你。",
    positiveFeedback: "你不是唯一遇到這個問題的人。這兩年的流量成本的確翻了好幾倍。",
    followUp: {
      question: "這是你最不想看到、卻每天發生的畫面嗎？",
      options: [
        { id: "recent_drop", text: "對，尤其這幾個月特別明顯" },
        { id: "unstable", text: "時好時壞，很不穩定" },
        { id: "no_conversion", text: "其實流量有，但就是進不來" }
      ]
    },
    affirmativeGuidance: "其實，你不需要再花幾萬塊去上玄學般的廣告投手課。\n問題通常不是出在你『不夠懂臉書設定』，而是『素材沒有抓到市場現在真正在痛的地方』。",
    microDiagnosis: "這在我們系統裡屬於【前端切入點失焦】。\n\n當大家都在賣一樣的規格時，廣告只講功能已經沒用了。你必須重新提煉出那一句『讓他非停下來看不可』的痛點口號。",
    microDiagnosisBridge: "你真正怕的不僅是預算被浪費，更是花完了連經驗都沒留下，下次只能繼續盲拍素材。",
    progressSense: "太好了，既然知道是前端切入點的問題，我們就不用再去白費力氣改整個網站了。",
    recommendedNextStep: "看具體的切入點定位法",
    lineCard1: "這種情況很常見。你不是特別倒楣，是現在真的越來越貴。你有感覺到不對，反而代表你比很多人早發現問題。",
    lineCard2: "多半不是你少設了什麼。比較常見的是，前面那個讓人停下來的切入點，已經沒有以前那麼有感了。前面抓不到，後面自然越來越難。",
    lineCard3: "先不要急著加預算。先把那些本來要靠你後面慢慢解釋的關鍵句，提早放到他看到你的第一眼。先把前面補對，後面才有得放大。你現在缺的不是再試一次，是先知道哪裡不要再亂試。"
  },
  {
    id: "high_bounce",
    title: "有人進網站，但馬上就跳走",
    shortDescription: "流量數據看起來很美，但停留時間不到 10 秒，根本沒有人留名單。",
    detailedDescription: "你花錢把人買進來了，但他們連看完第一頁的耐心都沒有。你以為是網頁不夠漂亮，資訊內容不夠多，請人重新設計了版面，加了許多影片跟圖文，結果跳出率還是一樣高。",
    positiveFeedback: "這反而代表你的第一步做對了：你的廣告切入點有成功吸引到他們點擊。",
    followUp: {
      question: "這種花了錢買人進來，卻眼睜睜看他們離開的感覺，是不是很眼熟？",
      options: [
        { id: "frustrating_data", text: "對，看數據真的會吐血" },
        { id: "first_screen_bounce", text: "大部分人在第一頁就跑了" },
        { id: "no_action", text: "滑到底了也沒點按鈕" }
      ]
    },
    affirmativeGuidance: "如果他們點了廣告，代表他們『有興趣』；但進站後馬上跑掉，代表他們『不相信你』或『看不懂』。\n這不是設計不夠美，是敘事順序錯了。",
    microDiagnosis: "這在我們系統裡屬於【承接段信任斷裂】。\n\n他帶著痛點進來，第一眼想看的是『你能怎麼救我』，但大多數頁面第一眼卻在講『我們有多厲害』。",
    microDiagnosisBridge: "你真正損失的不是這一次的點擊費，而是那些明明有強烈需求，卻在最後一秒因為不信任而離開的潛在優質客戶。",
    progressSense: "抓出信任斷層後，我們只需要把順序對調，把『解法』放在『公司介紹』前面，流失率就會大幅下降。",
    recommendedNextStep: "看信任承接重構法",
    lineCard1: "這種數據真的很讓人火大。但他至少有點進來，代表前面那一步沒有白做。問題不是沒興趣，是進來之後沒被留下來。",
    lineCard2: "人會走，很多時候不是版面醜。是他第一眼想知道你能不能幫到他，結果頁面先在講你自己。他不是沒看，是看不到跟他有關的那一段。",
    lineCard3: "先不要急著整站重做。先把順序調一下，把「你能怎麼幫他」放前面，把介紹自己放後面。那幾秒鐘一補起來，留下來的人就會多很多。順序一錯，前面辛苦帶進來的人，就在最前面那幾秒鐘流掉了。"
  },
  {
    id: "no_booking",
    title: "看完了頁面，卻沒人預約/私訊",
    shortDescription: "他們在頁面上滑了很久，但就是不點那個『立即諮詢』的按鈕。",
    detailedDescription: "你的服務說明寫得很清楚，案例也放了，專業度看起來沒問題。但客人就是寧願自己猜，也不肯點開 LINE 或填寫表單來問你，彷彿那個按鈕會咬人。",
    positiveFeedback: "這表示你的內容是有價值的，他們願意花時間閱讀。",
    followUp: {
      question: "當你看到這種『只看不問』的數據，是不是常懷疑自己到底寫錯什麼？",
      options: [
        { id: "cant_guess", text: "對，完全猜不透他們在想什麼" },
        { id: "maybe_price", text: "可能他們覺得太貴了吧？" },
        { id: "basic_questions", text: "有時候會跑去問很基礎的問題" }
      ]
    },
    affirmativeGuidance: "真相是：他們想問，但是『不敢問』。\n他們怕一點進去就會被強迫推銷，或是根本懶得去消化查證你說的話。",
    microDiagnosis: "這在我們系統裡屬於【行動阻力過高】。\n\n你給的下一步太沉重了。『立即購買』或『專業諮詢』對還沒完全信任你的冷客來說，心理壓力太大了。",
    microDiagnosisBridge: "你真正怕的是不管怎麼用心解釋，客戶還是只在乎價錢，讓你的專業被當成菜市場比價的附屬品。",
    progressSense: "既然找到了卡點在最後一哩路，我們只需要把『高壓的預約』降級成『低壓的微承諾』甚至『行動交換』，推進的意願就會瞬間拉升。",
    recommendedNextStep: "看低阻力推進策略",
    lineCard1: "這種感覺真的很悶。明明人有看，卻沒有下一步。但他願意滑到底，其實已經表示：你講的東西不是完全沒打到他。",
    lineCard2: "很多時候不是他不想問，是他還不敢問。像「直接預約」「直接諮詢」這種動作，對還沒完全信任你的陌生人來說，壓力太大了。他不是沒感覺，是最後那一步跨不出去。",
    lineCard3: "先不要急著大改產品或大降價。先把那個很重的下一步，換成比較容易答應的小一步。像先拿一份清單、先看一個案例，橋接起來，後面就順了。很多時候不是內容不夠，是最後那一步太重。"
  },
  {
    id: "hard_to_close",
    title: "加了 LINE，但對話很難推進",
    shortDescription: "每天都在回罐頭問題，對方只問『多少錢』，甚至加入LINE後就已讀不回。",
    detailedDescription: "你的客服團隊每天都很忙，但忙的都是做苦工。客人對你的價值沒有認知，只是一直拿別家的規格來跟你比價，你覺得自己的專業被當菜市場。",
    positiveFeedback: "這代表你的前端導流是暢通的，你已經解決了最難的『帶人進來』的問題。",
    followUp: {
      question: "每天處理這種沒有營養的詢價，是不是把你原本該拿來服務核心客戶的時間都吃光了？",
      options: [
        { id: "exhausted", text: "沒錯，每天回這些真的很心累" },
        { id: "price_trap", text: "報價也是死，不報價也是死" },
        { id: "only_referrals", text: "最後成交的都是本來就認識的" }
      ]
    },
    affirmativeGuidance: "真正的問題出在你把『篩選與教育』的工作，全部壓在最後一關的人工對話上。",
    microDiagnosis: "這在我們系統裡屬於【漏斗定位倒置】。\n\n成熟的獲客系統，應該是在『頁面』上就完成教育與洗腦，讓來到 LINE 的人已經是帶著認同與意願的準客戶，而不是來比價的過客。",
    microDiagnosisBridge: "你真正失去的不僅僅是一張單，而是原本可以自動化篩選與獲客的系統，讓你每天陷在無效溝通裡無法抽身。",
    progressSense: "了解這點後，我們要把教育客戶的負擔往前推給頁面。讓頁面完成前處理，你來做高端客戶的承接。",
    recommendedNextStep: "看教育前置化策略",
    lineCard1: "每天回一堆差不多的問題，真的很耗。但至少代表前面把人帶進來這件事，你做到了。你現在卡的不是帶不進來，是帶進來之後很難往前。",
    lineCard2: "通常不是你不會聊。比較像是很多本來該在前面講清楚的事，最後都壓到 LINE 裡才補。所以進來的人還沒真的懂你，只是先進來看看、比一下。",
    lineCard3: "先不要急著背更多話術。先把那些每次都要重講的事，往前搬到頁面先講掉。讓前面先幫你過濾一次，你後面接起來就輕很多。你不是要更會聊，你是不要再把什麼都壓到最後才聊。"
  }
];