export const liffContent = {
  welcome: {
    greeting: "好，我先不跟你講漂亮話。",
    successMessage: "你現在不用自己一個人把整件事想完。\n我先幫你抓最關鍵那一段。\n不用一次搞懂全部，先看最重要的就好。",
    painPointPrefix: "針對你現在卡住的環節，我建議我們先看：",
    callToActions: [
      { id: "report", label: "先看你目前像哪種卡點", style: "primary" },
      { id: "plans", label: "再看哪一段該怎麼先補", style: "secondary" },
      { id: "booking", label: "想快一點，直接聊 15 分鐘", style: "outline" }
    ],
    chatbotPrompt: "不僅僅是把這幾頁看完就結束了。\n後面我也會陪你繼續拆、幫你補、幫你往下走，慢慢把漏掉的洞填起來。",
    chatButton: "去 LINE 看我們接下來要拆什麼"
  },

  fallback: {
    title: "差這一步就好了",
    description: "你現在還拿不到內容，這不是系統壞掉。\n是因為你還沒加好友，或是之前不小心把我們封鎖了。\n\n把這一步完成，我就接著把內容丟給你，我們繼續往下。",
    addFriendButton: "先加好友",
    refreshButton: "我好了，重新檢查一次",
    blockedMessage: "如果按了還是不行，去 LINE 封鎖名單把我們解除就可以。"
  }
};