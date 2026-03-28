interface Env {
  COOKIE_SECRET: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const { request } = context;
    const { idToken, painPoint, entryPath } = await request.json<any>();

    // 實務上這裡應該呼叫 LINE 的 verify API 來驗證 idToken:
    // https://api.line.me/oauth2/v2.1/verify
    // 因示範用途，我們假設驗證通過並設定 Cookie

    // 建立 HttpOnly, Secure Session 
    // (實務上應加密 idToken 或 userId 產生 jwt 作為 sessionId)
    const sessionPayload = btoa(JSON.stringify({
      token: idToken ? idToken.substring(0, 10) : 'mock',
      painPoint,
      entryPath,
      createdAt: new Date().toISOString()
    }));

    const response = new Response(JSON.stringify({ success: true }), {
      headers: {
        'Content-Type': 'application/json',
        // Set HttpOnly secure cookie
        'Set-Cookie': `session=${sessionPayload}; HttpOnly; Secure; Path=/; SameSite=Lax; Max-Age=86400`
      }
    });

    return response;
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 400 });
  }
};
