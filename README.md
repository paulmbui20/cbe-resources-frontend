# CBE Resources (SvelteKit)

Small SvelteKit frontend scaffold for curriculum resources (notes, schemes, exams, revision papers, lesson plans, etc.).

Key features

- Top navigation progress bar when navigating between routes.
- Reusable search + filter component with autocomplete (starts after 2 chars).
- Products list with filters and search.
- Product detail pages use SEO-friendly slugs (e.g. `/products/form-1-mathematics-notes`) and include JSON-LD and Open Graph tags.
- Resource cards support Add to Cart and Buy Now (quick checkout uses an in-memory store to avoid URL manipulation).

Local development

```pwsh
npm install
npm run dev
# run svelte-check
npm run check
```

Notes

- Product quick-checkout uses `src/lib/stores/quickCheckout.ts` to store the selected product before navigating to `/checkout/quick` to prevent URL tampering. When integrating MPESA, validate product & price server-side.
- The canonical product data is in `src/lib/stores/dummy-products.ts` (includes `slug` and helpers).

## Backend integration (suggested API)

This app is currently wired to use an in-memory `dummy-products.ts` store. For production you should replace this with backend endpoints. Below are suggested endpoints and their expected request/response shapes so you can plug your backend in quickly.

1. GET /api/products

- Query parameters (optional):
  - q (string): search term
  - type (string): product type (note|scheme|exam|revision|curriculum|report|lesson)
  - page (number): pagination page (1-based)
  - pageSize (number): items per page
- Response (200):
  {
  items: Product[],
  total: number,
  page: number,
  pageSize: number
  }

2. GET /api/products/:slug

- Path param: slug (string). Example: /api/products/form-1-mathematics-notes
- Response (200): Product object or 404 if not found

3. POST /api/checkout/create-intent

- Body:
  {
  productId: string,
  quantity: number,
  phone: string,
  email: string
  }
- Response (200):
  {
  intentId: string, // opaque server-generated id for the purchase intent
  amount: number,
  currency: 'KES'
  }
- Server responsibilities:
  - Validate productId & price; compute total
  - Create a server-side purchase intent record (persisted short-lived)
  - Return an opaque intentId that the client can use to proceed

4. POST /api/checkout/mpesa

- Body:
  {
  intentId: string,
  phone: string
  }
- Response (200): returns MPESA initiation response or job id; server should orchestrate STK push and return status/result asynchronously.

Security notes

- Always validate productId and the price server-side before initiating payments. Do not rely on client-sent price values.
- Use HTTPS for all API endpoints.
- Use short-lived opaque tokens (intentId) instead of putting price/product details in URLs or client-only stores for critical flows.

## How to replace dummy data with backend data

- Replace calls to `productsStore.getAll()` / `getBySlug()` with fetch calls to your API endpoints in load() functions or onMount handlers.
- Example (server-side product page load):

  export const load = async ({ params, fetch }) => {
  const res = await fetch(`/api/products/${params.slug}`);
  if (!res.ok) throw error(404, 'Not found');
  const product = await res.json();
  return { product };
  }

- For listing endpoints use `GET /api/products?q=...&page=1&pageSize=10` and map the response to the `products` array that `ResourceGrid` consumes.

## Pagination

- Frontend pagination is implemented in `src/components/pagination.svelte` and `src/components/ecommerce/resource-grid.svelte` (default page size 10). When wiring to backend pagination, ensure backend returns total item count so the frontend can render page controls correctly.

## Development & checks

- Install and run dev server:

```pwsh
npm install
npm run dev
```

- Run type-checks:

```pwsh
npm run check
```

## Further improvements

- Replace quickCheckout in-memory store with server-issued intent tokens for refresh resilience.
- Add server-side rendering for product lists for better SEO (use load() to fetch list pages).
- Add tests (unit + e2e) around checkout flows and search.
