export const onRequestPost: PagesFunction = async (context) => {
  try {
    const data = await context.request.json<any>();
    
    // TODO: 結合 D1 或 KV 來儲存名單
    // 目前先 console.log 並回傳成功
    console.log("New Lead Received:", JSON.stringify(data));
    
    return new Response(JSON.stringify({ 
      success: true, 
      leadId: 'lead_' + Date.now() 
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 400 });
  }
};
