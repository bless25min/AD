/**
 * 產生 LINE Flex Message 的 JSON 結構格式
 * 這會被放入 liff.shareTargetPicker([ HERE ]) 中
 */

export const getBusinessCardFlexMessage = (cardUrl: string) => {
  return {
    type: "flex",
    altText: "廖天佑 Bless Liao 的電子名片",
    contents: {
      type: "bubble",
      size: "kilo",
      body: {
        type: "box",
        layout: "vertical",
        paddingAll: "0px",
        contents: [
          // 上半部：反面意象（深藍色科技感）
          {
            type: "box",
            layout: "vertical",
            backgroundColor: "#1e3a8a", // tailwind blue-900
            paddingAll: "20px",
            contents: [
              {
                type: "text",
                text: "用成交，代替服務費",
                color: "#eab308", // tailwind yellow-500 (gold)
                weight: "bold",
                size: "xl",
                align: "center",
              },
              {
                type: "text",
                text: "AI顧問式行銷漏斗\n打破廣告轉換天花板",
                color: "#ffffff",
                size: "sm",
                align: "center",
                wrap: true,
                margin: "sm"
              }
            ]
          },
          // 下半部：正面細節（白底）
          {
            type: "box",
            layout: "vertical",
            backgroundColor: "#ffffff",
            paddingAll: "20px",
            contents: [
              {
                type: "text",
                text: "廖天佑 Bless Liao",
                weight: "bold",
                size: "xl",
                color: "#1e293b", // slate-800
                margin: "none"
              },
              {
                type: "text",
                text: "AI顧問式成交引擎",
                weight: "bold",
                size: "md",
                color: "#64748b", // slate-500
                margin: "sm"
              },
              {
                type: "text",
                text: "把流量變成可預測的成交",
                color: "#1e3a8a",
                size: "sm",
                weight: "bold",
                margin: "lg"
              },
              // 聯絡資訊區塊
              {
                type: "box",
                layout: "vertical",
                margin: "xl",
                spacing: "sm",
                contents: [
                  {
                    type: "box",
                    layout: "baseline",
                    spacing: "sm",
                    contents: [
                      {
                        type: "text",
                        text: "手機",
                        color: "#94a3b8",
                        size: "xs",
                        flex: 1
                      },
                      {
                        type: "text",
                        text: "0983-919-101",
                        wrap: true,
                        color: "#334155",
                        size: "sm",
                        flex: 4
                      }
                    ]
                  },
                  {
                    type: "box",
                    layout: "baseline",
                    spacing: "sm",
                    contents: [
                      {
                        type: "text",
                        text: "信箱",
                        color: "#94a3b8",
                        size: "xs",
                        flex: 1
                      },
                      {
                        type: "text",
                        text: "bless@25min.co",
                        wrap: true,
                        color: "#334155",
                        size: "sm",
                        flex: 4
                      }
                    ]
                  },
                  {
                    type: "box",
                    layout: "baseline",
                    spacing: "sm",
                    contents: [
                      {
                        type: "text",
                        text: "LINE",
                        color: "#94a3b8",
                        size: "xs",
                        flex: 1
                      },
                      {
                        type: "text",
                        text: "reedread",
                        wrap: true,
                        color: "#334155",
                        size: "sm",
                        flex: 4
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      footer: {
        type: "box",
        layout: "vertical",
        backgroundColor: "#ffffff",
        paddingAll: "16px",
        spacing: "sm",
        contents: [
          {
            type: "button",
            style: "primary",
            color: "#1e3a8a",
            height: "sm",
            action: {
              type: "uri",
              label: "開啟完整電子名片",
              uri: cardUrl
            }
          },
          {
            type: "button",
            style: "secondary",
            height: "sm",
            action: {
              type: "uri",
              label: "加入 LINE 好友",
              uri: "https://line.me/ti/p/~reedread"
            }
          }
        ]
      }
    }
  };
};
