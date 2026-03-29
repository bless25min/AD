interface Env {
  LINE_CHANNEL_ACCESS_TOKEN?: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const data = await context.request.json<any>();
    const { userId, companyName, startDate, endDate, amount } = data;

    if (!userId) {
      return new Response(JSON.stringify({ error: 'Missing userId' }), { status: 400 });
    }

    const lineToken = context.env.LINE_CHANNEL_ACCESS_TOKEN;

    const messageText = `數位合約簽署完成通知 🎉\n\n您好，我們已收到《${companyName || '貴公司'}》的簽署紀錄。\n合約期間為：${startDate} 至 ${endDate}\n約定月費為：${amount}。\n\n請盡速將首期款項匯出，並將帳號末五碼傳至本聊天室，謝謝您！`;

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
