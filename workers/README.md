# Kenya / KSh + Xdigitex M-Pesa setup

## What changed
- Store currency labels and formatting now use KSh / Kenyan locale.
- Store location text is Nairobi, Kenya.
- The online checkout option is labelled M-Pesa STK Push.
- The browser calls a Cloudflare Worker; the Xdigitex API key is never placed in this public repository.
- Existing numeric catalogue and installment prices were intentionally left unchanged. Confirm the actual Kenyan selling prices before launch.

## Deploy the payment Worker
1. Create a free Cloudflare account and open **Workers & Pages**.
2. Create a Worker and paste the contents of `workers/xdigitex-mpesa-worker.js`.
3. In Worker **Settings → Variables and Secrets**, add:
   - Secret: `XDIGITEX_API_KEY` = your newly generated Xdigitex API key.
   - Variable: `ALLOWED_ORIGIN` = `https://xdigitexai.github.io`.
4. Deploy the Worker and copy its HTTPS URL.
5. In `shop.html`, replace `https://YOUR-WORKER.workers.dev` in `MPESA_WORKER_URL` with the deployed Worker URL. Commit the change.
6. Test with a small real payment before accepting customer orders.

## Security and production checks
- Revoke the API key that was pasted into the earlier chat and create a fresh one. Never commit a key into GitHub or browser JavaScript.
- The Worker keeps the key private and proxies STK Push/status requests.
- Before going live, add server-side order/price validation so a customer cannot alter the amount sent by the browser. This starter Worker validates phone and amount format, but does not independently verify the product catalogue or order total.
- The current storefront uses local browser storage for cart/orders; this is not a secure central order database.
- The payment status polling expects Xdigitex statuses: `pending`, `completed`, `failed`, or `cancelled`.
- Confirm the final GitHub Pages site URL and update `ALLOWED_ORIGIN` if the site uses a custom domain.

## WhatsApp contact
A WhatsApp username by itself is not enough to create a verified click-to-chat link. Add the shop's full Kenyan WhatsApp phone number in international format (2547XXXXXXXX or 2541XXXXXXXX) before enabling direct business chat buttons. Until then, the site shows the supplied handle and avoids inventing a phone number.
