export const liffContent = {
  welcome: {
    greeting: "好，我先不跟你講漂亮話。",
    successMessage: "我先幫你看，你現在比較像是：\n流量問題、頁面問題，還是承接問題。\n\n你現在不用自己一個人把整件事想完。\n我先幫你抓最關鍵那一段。\n不用一次搞懂全部，先看最重要的就好。",
    painPointPrefix: "因為你選的是：",
    callToActions: [
      { id: "report", label: "先看問題在哪", style: "primary" },
      { id: "plans", label: "再看怎麼補", style: "secondary" },
      { id: "booking", label: "想快一點，直接聊 15 分鐘", style: "outline" }
    ],
    chatbotPrompt: "不是把報告丟給你就結束了。\n後面我也會繼續幫你拆、幫你補、幫你往下走，陪你把漏掉的洞一步步填起來。",
    chatButton: "去 LINE 看我們接下來要拆什麼"
  },

  fallback: {
    title: "差這一步就好了",
    description: "你現在還拿不到內容，不是系統壞掉。\n\n是因為你還沒加好友，\n或是之前不小心把我們封鎖了。\n\n把這一步完成，我就能把內容直接丟給你。",
    addFriendButton: "先加好友",
    refreshButton: "我好了，重新檢查一次",
    blockedMessage: "如果按了還是不行去 LINE 的封鎖名單把我們解除就可以。"
  }
};