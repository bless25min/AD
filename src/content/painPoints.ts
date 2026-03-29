export interface PainPoint {
  id: string;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  positiveFeedback: string;
  followUp: {
    question: string;
    options: string[];
  };
  affirmativeGuidance: string;
  microDiagnosis: string;
  microDiagnosisBridge?: string;
  progressSense: string;
  recommendedNextStep: string;
}

export const painPoints: PainPoint[] = [
  {
    id: "traffic_drop",
    title: "廣告越投越貴，點擊率一直掉",
    shortDescription: "以前隨便投都有單，現在換了幾百組素材，預算還是像丟進水裡。",
    detailedDescription: "你可能已經試過換代操、學剪短影音、做梗圖，但每次紅利期都越來越短。你開始懷疑是不是自己的產品沒對手強，或是臉書演算法又在針對你。",
    positiveFeedback: "你不是唯一遇到這個問題的人。這兩年的流量成本的確翻了三倍。",
    followUp: {
      question: "這是你最不想看到、卻每天發生的畫面嗎？",
      options: ["對，尤其這幾個月特別明顯", "時好時壞，很不穩定", "其實流量有，但就是進不來"]
    },
    affirmativeGuidance: "其實，你不需要再花幾萬塊去上玄學般的廣告投手課。\n問題通常不是出在你『不夠懂臉書設定』，而是『素材沒有抓到市場現在真正在痛的地方』。",
    microDiagnosis: "這在我們系統裡屬於【前端切入點失焦】。\n\n當大家都在賣一樣的規格時，廣告只講功能已經沒用了。你必須重新提煉出那一句『讓他非停下來看不可』的痛點口號。",
    microDiagnosisBridge: "你真正怕的不是預算花完，而是花完了連經驗都沒留下，下次只能繼續盲拍素材。",
    progressSense: "太好了，既然知道是前端切入點的問題，我們就不用再去白費力氣改整個網站了。",
    recommendedNextStep: "看具體的切入點定位法"
  },
  {
    id: "high_bounce",
    title: "有人進網站，但馬上就跳走",
    shortDescription: "流量數據看起來很美，但停留時間不到 10 秒，根本沒有人留名單。",
    detailedDescription: "你花錢把人買進來了，但他們連看完第一屏的耐心都沒有。你以為是網頁不夠漂亮，請人重新設計了版面，加了酷炫的動畫，結果跳出率還是一樣高。",
    positiveFeedback: "這反而代表你的第一步做對了：你的廣告切入點有成功吸引到他們點擊。",
    followUp: {
      question: "這種花了錢買人進來，卻眼睜睜看他們離開的感覺，是不是很眼熟？",
      options: ["對，看 GA 數據真的會吐血", "大部分人在第一屏就跑了", "滑到底了也沒點按鈕"]
    },
    affirmativeGuidance: "如果他們點了廣告，代表他們『有需求』；但進站後馬上跑掉，代表他們『不相信你』或『看不懂你的解法』。\n這不是設計不夠美，是敘事順序錯了。",
    microDiagnosis: "這在我們系統裡屬於【承接段信任斷裂】。\n\n他帶著痛點進來，第一眼想看的是『你能怎麼救我』，但大多數頁面第一眼卻在講『我們公司有多牛』。",
    microDiagnosisBridge: "你真正損失的不是這一次的點擊費，而是那些明明有強烈需求，卻在最後一秒因為不信任而離開的潛在優質客戶。",
    progressSense: "抓出信任斷層後，我們只需要把順序對調，把『解法』放在『公司介紹』前面，流失率就會大幅下降。",
    recommendedNextStep: "看信任承接重構法"
  },
  {
    id: "no_booking",
    title: "看完了頁面，卻沒人預約/私訊",
    shortDescription: "他們在頁面上滑了很久，但就是不點那個『立即諮詢』的按鈕。",
    detailedDescription: "你的服務說明寫得很清楚，案例也放了，專業度看起來沒問題。但客人就是寧願自己猜，也不肯點開 LINE 或填寫表單來問你，彷彿那個按鈕會咬人。",
    positiveFeedback: "這表示你的內容是有價值的，他們願意花時間閱讀。",
    followUp: {
      question: "當你看到這種『只看不問』的數據，是不是常懷疑自己到底寫錯什麼？",
      options: ["對，完全猜不透他們在想什麼", "可能他們覺得太貴了吧？", "有時候會跑去問很基礎的問題"]
    },
    affirmativeGuidance: "真相是：他們不是不想問，而是『不敢問』。\n他們怕一點進去就會被強迫推銷，或是怕自己問了看起來很不專業。",
    microDiagnosis: "這在我們系統裡屬於【行動阻力過高】。\n\n你給的下一步太沉重了。『立即購買』或『專業諮詢』對還沒完全信任你的冷客來說，心理壓力太大了。",
    microDiagnosisBridge: "你真正怕的是不管怎麼用心解釋，客戶還是只在乎價錢，讓你的專業被當成菜市場比價的附屬品。",
    progressSense: "既然找到了卡點在最後一哩路，我們只需要把『高壓的預約』降級成『低壓的微承諾』，他們推進的意願就會瞬間拉升。",
    recommendedNextStep: "看低阻力推進策略"
  },
  {
    id: "hard_to_close",
    title: "加了 LINE，但對話很難推進",
    shortDescription: "每天都在回罐頭問題，對方只問『多少錢』，報價後就已讀不回。",
    detailedDescription: "你的客服團隊每天都很忙，但忙的都是做苦工。客人對你的價值沒有認知，只是一直拿別家的規格來跟你比價，你覺得自己的專業被當菜市場。",
    positiveFeedback: "這代表你的前端導流是暢通的，你已經解決了最難的『帶人進來』的問題。",
    followUp: {
      question: "每天處理這種沒有營養的詢價，是不是把你原本該拿來服務核心客戶的時間都吃光了？",
      options: ["沒錯，每天回這些真的很心累", "報價也是死，不報價也是死", "最後成交的都是本來就認識的"]
    },
    affirmativeGuidance: "問題不是你的客服態度不好。\n真正的問題出在你把『篩選與教育』的工作，全部壓在最後一關的人工對話上。",
    microDiagnosis: "這在我們系統裡屬於【漏斗定位倒置】。\n\n成熟的獲客系統，應該是在『頁面』上就完成教育與洗腦，讓來到 LINE 的人已經是帶著意願的準客戶，而不是來比價的過客。",
    microDiagnosisBridge: "你真正失去的不是一張單，而是原本可以自動化過濾客戶的系統，讓你每天陷在無效溝通裡無法抽身。",
    progressSense: "了解這點後，我們要把教育客戶的負擔往前推給頁面。讓頁面做黑臉篩選，讓你來做高端承接。",
    recommendedNextStep: "看教育前置化策略"
  }
];