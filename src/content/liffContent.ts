export const liffContent = {
  welcome: {
    greeting: "好，我先不跟你講漂亮話。",
    successMessage: "你剛剛先把最麻煩的一步做完了。接下來不用再看很多，我直接從這裡接著跟你聊。",
    painPointPrefix: "你剛剛比較像卡在：",
    optionPrefix: "而且最常發生的是：",
    callToActions: [
      { id: "chat_start", label: "💬 好，先從這裡開始聊", style: "primary" }
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