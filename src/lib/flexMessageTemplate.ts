/**
 * 產生 LINE Flex Message 的 JSON 結構格式
 * 重構為「LINE 聊天室內最高吸睛度」的設計
 */

export const getBusinessCardFlexMessage = (baseUrl: string) => {
  return {
    type: "flex",
    altText: "廖天佑 Bless Liao 的電子名片",
    contents: {
      type: "bubble",
      size: "giga", // 放大尺寸，佔滿更多版面，極度吸睛
      
      // 頂部頭像區 (英雄橫幅設計)
      header: {
        type: "box",
        layout: "vertical",
        paddingAll: "0px",
        contents: [
          {
            type: "box",
            layout: "vertical",
            paddingAll: "20px",
            backgroundColor: "#0f172a", // 捨棄漸層以獲得最高相容性
            contents: [
              // Logo 與 標語 對坐
              {
                type: "box",
                layout: "horizontal",
                contents: [
                  {
                    type: "image",
                    url: `${baseUrl}/images/logo.jpg`,
                    size: "xs",
                    flex: 0
                  },
                  {
                    type: "text",
                    text: "把流量變成可預測的成交",
                    color: "#eab308",
                    size: "xs",
                    weight: "bold",
                    align: "end"
                  }
                ]
              },
              // 照片與姓名的大排版
              {
                type: "box",
                layout: "horizontal",
                margin: "xl",
                spacing: "md",
                contents: [
                  {
                    type: "box",
                    layout: "vertical",
                    // 移除與固定寬高衝突的 flex: 1
                    cornerRadius: "40px", // 從100px下修以確保不高於height
                    width: "80px",
                    height: "80px",
                    borderWidth: "2px",
                    borderColor: "#eab308", 
                    contents: [
                      {
                        type: "image",
                        url: `${baseUrl}/images/avatar.jpg`,
                        aspectMode: "cover",
                        size: "full",
                        aspectRatio: "1:1"
                      }
                    ]
                  },
                  {
                    type: "box",
                    layout: "vertical",
                    flex: 2,
                    justifyContent: "center",
                    contents: [
                      {
                        type: "text",
                        text: "廖天佑",
                        color: "#ffffff",
                        weight: "bold",
                        size: "xxl",
                      },
                      {
                        type: "text",
                        text: "Bless Liao",
                        color: "#94a3b8",
                        size: "md",
                        weight: "bold",
                      },
                      // 職稱 Tag
                      {
                        type: "box",
                        layout: "vertical",
                        backgroundColor: "#eab308",
                        cornerRadius: "md",
                        margin: "md",
                        paddingAll: "4px",
                        paddingStart: "8px",
                        paddingEnd: "8px",
                        contents: [
                          {
                            type: "text",
                            text: "AI 預見成交引擎",
                            color: "#1e293b",
                            size: "xs",
                            weight: "bold",
                            align: "center"
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      
      // 中央：震撼標語區
      body: {
        type: "box",
        layout: "vertical",
        paddingAll: "0px",
        contents: [
          // 重大承諾區塊
          {
            type: "box",
            layout: "vertical",
            backgroundColor: "#f8fafc",
            paddingAll: "20px",
            contents: [
              {
                type: "text",
                text: "「 用 成 交 ， 代 替 服 務 費 」",
                weight: "bold",
                size: "lg",
                color: "#1e3a8a",
                align: "center" // 置中大喊口號
              },
              {
                type: "text",
                text: "AI 顧問式行銷漏斗・打破廣告轉換天花板",
                size: "xs",
                color: "#64748b",
                align: "center",
                margin: "md",
                weight: "bold"
              }
            ]
          },
          // 聯絡方式區段 (分隔線設計)
          {
             type: "box",
             layout: "vertical",
             paddingAll: "20px",
             backgroundColor: "#ffffff",
             borderWidth: "1px",
             borderColor: "#e2e8f0",
             spacing: "sm",
             contents: [
               {
                 type: "box",
                 layout: "horizontal",
                 contents: [
                   { type: "text", text: "📱 手機", size: "sm", color: "#94a3b8", flex: 1 },
                   { type: "text", text: "0983-919-101", size: "sm", color: "#0f172a", flex: 2, weight: "bold", align: "end" }
                 ]
               },
               {
                 type: "box",
                 layout: "horizontal",
                 contents: [
                   { type: "text", text: "✉️ 聯絡", size: "sm", color: "#94a3b8", flex: 1 },
                   { type: "text", text: "bless@25min.co", size: "sm", color: "#0f172a", flex: 2, weight: "bold", align: "end" }
                 ]
               },
               {
                 type: "box",
                 layout: "horizontal",
                 contents: [
                   { type: "text", text: "💬 LINE", size: "sm", color: "#94a3b8", flex: 1 },
                   { type: "text", text: "reedread", size: "sm", color: "#0f172a", flex: 2, weight: "bold", align: "end" }
                 ]
               }
             ]
          }
        ]
      },
      
      // 底部：行動呼籲大按鈕 (雙按鈕並排 + 分享按鈕)
      footer: {
        type: "box",
        layout: "vertical",
        backgroundColor: "#ffffff",
        paddingAll: "16px",
        spacing: "md",
        contents: [
          {
            type: "box",
            layout: "horizontal",
            spacing: "md",
            contents: [
              {
                type: "button",
                style: "primary",
                color: "#1e3a8a", // 主色深藍
                height: "sm",
                flex: 1,
                action: {
                  type: "uri",
                  label: "進入官方首頁",
                  uri: baseUrl // 直接引導回首頁，而非名片頁
                }
              },
              {
                type: "button",
                style: "primary",
                color: "#059669", // LINE 綠色調
                height: "sm",
                flex: 1,
                action: {
                  type: "uri",
                  label: "加 LINE 聊聊",
                  uri: "https://line.me/ti/p/~reedread"
                }
              }
            ]
          },
          {
            type: "button",
            style: "secondary",
            height: "sm",
            action: {
              type: "uri",
              label: "📤 分享名片給好友",
              // 使用戶指定的明確 LIFF 連結，確保順利透過 LINE App 帶入登入狀態
              uri: "https://liff.line.me/1654828981-Dqym5ASE/card"
            }
          }
        ]
      }
    }
  };
};
