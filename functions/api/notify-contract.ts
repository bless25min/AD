interface Env {
  LINE_CHANNEL_ACCESS_TOKEN?: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const data = await context.request.json<any>();
    const { userId, companyName, startDate, endDate, amount, contactName, contactPhone } = data;

    if (!userId) {
      return new Response(JSON.stringify({ error: 'Missing userId' }), { status: 400 });
    }

    const lineToken = context.env.LINE_CHANNEL_ACCESS_TOKEN;
    const messageText = `合作合約書產生通知 🎉\n\n您好，系統已為《${companyName || '貴公司'}》產生專屬的「成交優化與廣告成長合作合約書」。\n合約期間為：${startDate} 至 ${endDate}\n約定月費為：${amount}\n聯絡人：${contactName} (${contactPhone})\n\n【收款帳號資訊】\n銀行：中國信託商業銀行 (822)\n帳號：347540203588\n\n請您下載合約 PDF 完成雙方用印，並將首期款項匯出（請將轉帳帳號末五碼回傳至本聊天室）。確認款項後，我們將立即為您啟動工作流程，謝謝您！`;

    if (!lineToken) {
      console.warn("No LINE_CHANNEL_ACCESS_TOKEN found. Skipping actual LINE API call.", messageText);
      return new Response(JSON.stringify({ success: true, simulated: true }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const lineRes = await fetch('https://api.line.me/v2/bot/message/push', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${lineToken}`
      },
      body: JSON.stringify({
        to: userId,
        messages: [
          {
            type: 'text',
            text: messageText
          }
        ]
      })
    });

    if (!lineRes.ok) {
      const errText = await lineRes.text();
      throw new Error(`LINE API responded with ${lineRes.status}: ${errText}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err: any) {
    console.error('Notify error:', err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};
