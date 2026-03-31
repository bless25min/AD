export const liffContent = {
  welcome: {
    greeting: "好，我先直接接手你現在的成交卡點。",
    successMessage:
      "你剛剛做的，不只是選一個問題而已。\n我現在已經比較能看出，你的客戶是在哪一段開始猶豫、懷疑，或停下來。\n\n接下來不用再看很多，我直接從這裡接著跟你聊。",
    painPointPrefix: "你現在比較像卡在：",
    optionPrefix: "而且最常發生的是：",
    callToActions: [
      { id: "chat_start", label: "💬 好，從這個成交卡點開始聊", style: "primary" }
    ]
  },

  fallback: {
    title: "差這一步，我才能正式接手",
    description:
      "你現在還沒辦法直接往下，不是系統壞掉。\n是因為你還沒加好友，或之前不小心把我們封鎖了。\n\n把這一步完成，我才能把剛剛辨識到的成交卡點接進對話裡，從最值得先動的地方開始拆。",
    addFriendButton: "先完成好友加入",
    refreshButton: "我好了，重新檢查一次",
    blockedMessage:
      "如果按了還是不行，去 LINE 封鎖名單把我們解除，再回來重新檢查一次就可以。"
  }
};