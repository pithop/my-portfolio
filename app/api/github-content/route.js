export const dynamic = 'force-dynamic';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const path = searchParams.get('path');
  
  if (!path) {
    return new Response('Missing path parameter', { status: 400 });
  }
  
  try {
    const response = await fetch(`https://raw.githubusercontent.com/${path}`);
    
    if (!response.ok) {
      return new Response('Failed to fetch content', { status: response.status });
    }
    
    const content = await response.text();
    return new Response(content, {
      headers: { 'Content-Type': 'text/plain' }
    });
  } catch (error) {
    return new Response('Internal server error', { status: 500 });
  }
}