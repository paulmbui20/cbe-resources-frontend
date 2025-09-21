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
