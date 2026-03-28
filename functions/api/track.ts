export const onRequestPost: PagesFunction = async (context) => {
  try {
    const event = await context.request.json<any>();
    
    // TODO: 送往分析資料庫 (PostHog / Mixpanel / D1)
    console.log("Track Event:", JSON.stringify(event));
    
    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 400 });
  }
};
