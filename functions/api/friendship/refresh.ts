export const onRequestPost: PagesFunction = async (context) => {
  try {
    const data = await context.request.json<any>();
    const idToken = data.idToken;
    
    // 實務上這裡會呼叫 LINE API，例如：
    // GET https://api.line.me/v2/bot/profile/{userId} 透過 OA Channel Access Token 確認
    // 或使用使用者的 Access Token 呼叫 LINE Login 的 friendship 狀態 API
    
    // 由於我們專注在架構，這裡先模擬如果帶有 token，則重新同步成功
    const isMockedSuccess = idToken ? true : false;
    
    return new Response(JSON.stringify({ 
      success: true, 
      isFriend: isMockedSuccess,
      message: "狀態更新完成"
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 400 });
  }
};
