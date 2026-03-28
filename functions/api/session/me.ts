interface Env {
  COOKIE_SECRET: string;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const cookie = context.request.headers.get('Cookie');
  const sessionMatch = cookie?.match(/session=([^;]+)/);
  if (!sessionMatch) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }
  
  try {
    const sessionData = JSON.parse(atob(sessionMatch[1]));
    return new Response(JSON.stringify({ user: sessionData }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Invalid session' }), { status: 401 });
  }
};
