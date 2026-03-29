export const liffContent = {
  welcome: {
    greeting: "好，我先不跟你講漂亮話。",
    successMessage: "你剛剛先把最麻煩的一步做完了。\n接下來不用一次搞懂全部，先看最重要的就好。\n我先幫你抓最關鍵那一段。",
    painPointPrefix: "因為你剛剛提到：",
    optionPrefix: "而且最常發生的是：",
    callToActions: [
      { id: "report", label: "先看為什麼會這樣", style: "primary" },
      { id: "booking", label: "想快一點，直接聊 15 分鐘", style: "outline" }
    ]
  },

  fallback: {
    title: "差這一步就好了",
    description: "你現在還拿不到內容，這不是系統壞掉。\n是因為你還沒加好友，或是之前不小心把我們封鎖了。\n\n把這一步完成，我就接著把內容丟給你，我們繼續往下。",
    addFriendButton: "先加好友",
    refreshButton: "我好了，重新檢查一次",
    blockedMessage: "如果按了還是不行，去 LINE 封鎖名單把我們解除就可以。"
  }
};