export const dynamic = 'force-dynamic';

export async function POST(req) {
  const body = await req.json();
  // Update to your current VM IP
  const targetUrl = 'http://34.60.196.36:11434/api/generate';
  
  try {
    const res = await fetch(targetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    
    return new Response(res.body, {
      status: res.status,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Connection failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}