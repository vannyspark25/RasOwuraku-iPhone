// Cloudflare Worker: secure Xdigitex Pay M-Pesa proxy
// Add XDIGITEX_API_KEY as a Worker Secret.
// Set ALLOWED_ORIGIN to https://xdigitexai.github.io (no trailing slash).
const API_BASE = "https://pay.xdigitex.com/api";
function cors(origin, env) {
  const allowed = env.ALLOWED_ORIGIN || "https://xdigitexai.github.io";
  if (origin && origin !== allowed) return null;
  return {"Access-Control-Allow-Origin":allowed,"Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Vary":"Origin"};
}
export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const headers = cors(origin, env);
    if (!headers) return new Response("Origin not allowed", {status:403});
    if (request.method === "OPTIONS") return new Response(null, {headers});
    if (!env.XDIGITEX_API_KEY) return Response.json({error:"Payment service is not configured."},{status:503,headers});
    const url = new URL(request.url);
    let upstreamUrl, method = "GET", body;
    if (url.pathname === "/payments/stkpush" && request.method === "POST") {
      let input; try { input = await request.json(); } catch { return Response.json({error:"Invalid JSON."},{status:400,headers}); }
      const phoneNumber = String(input.phoneNumber || "").replace(/\s/g,"");
      const amount = Number(input.amount);
      if (!/^254[17]\d{8}$/.test(phoneNumber) || !Number.isInteger(amount) || amount < 1) return Response.json({error:"Enter a valid Kenyan mobile number and whole KSh amount."},{status:400,headers});
      const accountReference = String(input.accountReference || "").slice(0,40);
      const transactionDesc = String(input.transactionDesc || "Online order").slice(0,100);
      upstreamUrl = API_BASE + "/payments/stkpush"; method = "POST";
      body = JSON.stringify({phoneNumber,amount,accountReference,transactionDesc});
    } else if (url.pathname === "/payments/status" && request.method === "GET") {
      const id = url.searchParams.get("checkoutRequestId") || "";
      if (!/^[A-Za-z0-9._:-]{4,180}$/.test(id)) return Response.json({error:"Invalid checkout request ID."},{status:400,headers});
      upstreamUrl = API_BASE + "/payments/status/" + encodeURIComponent(id);
    } else return Response.json({error:"Not found."},{status:404,headers});
    const upstream = await fetch(upstreamUrl,{method,headers:{"X-API-Key":env.XDIGITEX_API_KEY,...(body?{"Content-Type":"application/json"}:{})},...(body?{body}:{})});
    return new Response(await upstream.text(),{status:upstream.status,headers:{...headers,"Content-Type":upstream.headers.get("Content-Type")||"application/json","Cache-Control":"no-store"}});
  }
};
