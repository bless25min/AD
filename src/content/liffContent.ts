export const liffContent = {
  welcome: {
    greeting: "你剛剛那個問題，我幫你整理好了",
    successMessage: "下面這些，是你現在最該先看的。",
    painPointPrefix: "你剛剛選的是：",
    callToActions: [
      { id: "report", label: "先看我卡在哪", style: "primary" },
      { id: "plans", label: "看看怎麼補", style: "secondary" },
      { id: "booking", label: "直接聊 15 分鐘", style: "outline" }
    ],
    chatbotPrompt: "我把細節丟到 LINE 給你了，直接點下面看。",
    chatButton: "打開 LINE 看內容"
  },

  fallback: {
    title: "差最後一步",
    description:
      "你現在還沒辦法拿到內容，是因為還沒加好友。\n\n或者你之前不小心封鎖了。\n\n把這一步做完，就可以直接拿到。",
    addFriendButton: "加入好友",
    refreshButton: "我好了，重新檢查",
    blockedMessage:
      "如果加不了，去 LINE 的封鎖名單把我們解除就可以了。"
  }
};