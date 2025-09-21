# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

````sh
# create a new project in the current directory
```markdown
# CBE Resources (SvelteKit)

This is a SvelteKit frontend for CBE Resources — a small UI scaffold to browse and buy curriculum resources (notes, schemes of work, exams, revision papers, lesson plans, etc.).

Features added in this branch:
- Top navigation progress bar (Chrome-like) when navigating between routes.
- Reusable Search + Filter component with autocomplete suggestions from dummy data.
- Hero search wired to suggestions and routes to the products page.
- Products listing with search and filters.
- Resource cards with Add to Cart and Buy Now (quick checkout) buttons.
- Quick checkout page that only collects phone and email (MPESA integration to be added server-side).

Local development

1. Install dependencies:

```pwsh
npm install
````

2. Run dev server:

```pwsh
npm run dev
```

3. Run type checking (svelte-check):

```pwsh
npm run check
```

Notes

- The quick checkout flow adds a single product to the cart and navigates to confirmation. The MPESA STK push integration should be implemented server-side; you'll call that API from the quick checkout or checkout flow when ready.
- The `src/lib/stores/dummy-products.ts` contains the dummy products and types used for suggestions and listings.
- If you see TypeScript/svelte-check errors related to third-party components (Flowbite), consider keeping interactive handlers on native elements (inputs/buttons) to avoid typing issues.
