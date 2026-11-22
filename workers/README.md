# Kenya storefront and M-Pesa setup

The storefront is configured to display prices in KSh and identify the shop location as Nairobi, Kenya.

## M-Pesa checkout

The current branch contains a temporary direct Xdigitex browser integration in `shop.html`. It is intended for a restricted/test API key only. **Any key placed in this public file is visible to every visitor and must never be a privileged production key.**

Before testing:
1. Confirm the Xdigitex STK Push and payment-status endpoint paths and request/response fields against your Xdigitex account documentation.
2. Confirm that the Xdigitex API permits browser-origin requests from the deployed GitHub Pages domain (CORS).
3. Use a restricted/test key; do not commit a live secret.
4. Test with a low-value transaction and verify the callback/status result.

GitHub Pages only hosts the static website. It does not provide a private place to store an API key or secure server-side order validation.

## Before production

- Confirm the Kenyan selling prices and update the sample catalogue in `shop.html`; the existing numeric values were retained and should not be assumed to be final KSh prices.
- Add server-side validation for product prices, order totals, and payment status before accepting live orders.
- Supply and verify the shop's Kenyan WhatsApp phone number if direct business chat links are required.
