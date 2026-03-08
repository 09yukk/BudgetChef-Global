/**
 * Budget Chef · Cloudflare Worker Proxy
 * 
 * Keeps your Anthropic API key server-side.
 * Deploy at: https://dash.cloudflare.com/workers
 * 
 * Set Secret:  ANTHROPIC_API_KEY = sk-ant-...
 * (Workers → Your worker → Settings → Variables → Add secret)
 * 
 * Then in budget_chef_v4.html, set at the top of <script>:
 *   window.CLAUDE_PROXY_URL = 'https://your-worker.your-name.workers.dev';
 */

export default {
  async fetch(request, env) {

    // ── CORS preflight ──
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    // ── Rate limiting (simple — 30 req/hour per IP) ──
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    const rateLimitKey = `rl:${ip}:${Math.floor(Date.now() / 3600000)}`;

    let count = 0;
    if (env.KV) {
      count = parseInt(await env.KV.get(rateLimitKey) || '0');
      if (count >= 30) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded. Try again in an hour.' }), {
          status: 429,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });
      }
      await env.KV.put(rateLimitKey, String(count + 1), { expirationTtl: 3600 });
    }

    // ── Proxy to Anthropic ──
    try {
      const body = await request.json();

      // Safety: only allow claude-sonnet-4, cap tokens
      body.model = 'claude-sonnet-4-20250514';
      body.max_tokens = Math.min(body.max_tokens || 2500, 3000);

      const upstream = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify(body),
      });

      const data = await upstream.json();

      return new Response(JSON.stringify(data), {
        status: upstream.status,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      });

    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }
  }
};
