# Kenya storefront setup

The storefront displays prices in KSh and lists Nairobi, Kenya as the shop location.

## Temporary M-Pesa checkout

The current `shop.html` includes a direct Xdigitex browser integration for a temporary test only.

- A key embedded in this public GitHub Pages site is visible to every visitor. Use only a restricted/test key; never place a privileged live key in the frontend.
- Confirm the STK Push and status endpoint paths and JSON fields with Xdigitex documentation for your account.
- Confirm Xdigitex allows browser-origin requests from the deployed GitHub Pages domain (CORS).
- Test with a low-value transaction and verify payment status before relying on the flow.

GitHub Pages is static hosting. It cannot keep API credentials private or validate order totals securely. A production payment flow needs a trusted backend and server-side price/order validation.

## Before launch

- Confirm the real Kenyan selling prices. The catalogue's existing numeric values were retained and must not be treated as approved KSh prices.
- Add server-side validation for products, amounts, orders, and payment status.
- Add the verified Kenyan WhatsApp business number if direct business chat links are needed.
- Rotate any API key previously exposed in a chat or public code.
