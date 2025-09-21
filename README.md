# CBE Resources Frontend

> A SvelteKit frontend scaffold for managing and browsing Kenyan curriculum-based educational resources:
> notes, schemes, exams, revision papers, lesson plans, etc.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
  - [Type Checking & Linting](#type-checking--linting)
- [Folder Structure](#folder-structure)
- [Backend Integration](#backend-integration)
  - [Suggested API Endpoints](#suggested-api-endpoints)
  - [Replacing Dummy Data](#replacing-dummy-data)
- [Pagination & Search](#pagination--search)
- [Quick Checkout Flow](#quick-checkout-flow)
- [SEO & Metadata](#seo--metadata)
- [Tests & Quality](#tests--quality)
- [Deployment](#deployment)
- [Security Considerations](#security-considerations)
- [Roadmap / Further Improvements](#roadmap--further-improvements)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- Responsive UI for browsing curriculum resources.
- Search and filter component with autocomplete (triggers after 2 characters).
- Resource / “product” listing with filters & pagination.
- Product detail pages using **SEO-friendly slugs** (e.g. `/products/form-1-mathematics-notes`).
- Use of JSON-LD and Open Graph metadata for rich previews.
- “Add to Cart” & “Buy Now” functionality (quick checkout using in-memory store).
- Styling with light/dark mode support.
- Navigation progress bar when switching between routes.

---

## Tech Stack

- **SvelteKit** — app framework.
- **TypeScript** for type safety.
- **Vite** as bundler.
- Tailwind CSS for styling.
- For testing: **Playwright** + others.
- Tools: ESLint, Prettier to maintain code quality.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version ≥ LTS, e.g. 18 or 20)
- npm (or Yarn / pnpm)
- Git

### Installation

```bash
git clone https://github.com/paulmbui20/cbe-resources-frontend.git
cd cbe-resources-frontend
npm install
```

### Running Locally

```bash
npm run dev
```

This should start the development server (often at `http://localhost:5173`). Open browser to see the UI.

### Type Checking & Linting

```bash
npm run check      # runs SvelteKit / TypeScript
```

---

## Folder Structure

Here’s a brief overview of important directories & files:

```
/
├── src/
│   ├── routes/ # SvelteKit pages & endpoints
│   ├── lib/
│   │    ├── components/   # reusable UI parts
│   │    ├── stores/     # state (e.g. dummy data)
│   │    └── utils/        # helpers, etc.
│   ├── static/            # static assets
├── e2e/                   # end-to-end tests
├── package.json
├── svelte.config.js
├── vite.config.ts
├── tsconfig.json
├── eslint.config.js
├── prettier (config) etc.
└── README.md
```

---

## Backend Integration

Currently the app uses a dummy in-memory store (`src/lib/stores/dummy-products.ts`) to simulate products. To make this production-ready, replace that with real backend APIs.

### Suggested API Endpoints

Here are endpoints & data shapes that the frontend expects / works well with:

| Method                             | Endpoint                                                                                                                    | Query / Body Params                                                   | Response Shape |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | -------------- |
| `GET /api/products`                | - optional query: `q` (search term), `type` (resource type: note, scheme, exam, revision, lesson, etc.), `page`, `pageSize` | `{ items: Product[], total: number, page: number, pageSize: number }` |                |
| `GET /api/products/:slug`          | slug in path (string)                                                                                                       | `Product` object (or 404)                                             |                |
| `POST /api/checkout/create-intent` | `{ productId: string, quantity: number, phone: string, email: string }`                                                     | `{ intentId: string, amount: number, currency: string }`              |                |
| `POST /api/checkout/mpesa`         | `{ intentId: string, phone: string }`                                                                                       | MPESA initiation / status response                                    |                |

**Note:** The frontend assumes `intentId` is opaque, price/product sanity is checked at backend.

### Replacing Dummy Data

- In listing pages, calls like `productsStore.getAll()` should be replaced with fetch calls to `GET /api/products?...`.
- The detail pages’ load functions should fetch from `GET /api/products/:slug`.
- Ensure the backend also provides metadata needed for SEO / Open Graph.

---

## Pagination & Search

- Default page size is **10 items**.
- The frontend’s pagination component uses total item count (from backend) to show page controls.
- Search starts after **2 characters** (to reduce noise / unnecessary queries).
- Filters by type / category of resource.

---

## Quick Checkout Flow

- Implemented with an **in-memory store** (`quickCheckout`) to store selected product(s) before navigating to a “quick checkout” route.
- This prevents URL-tampering (i.e. users manually changing product info in URL) only partly — backend validation still needed.
- For production, consider server-issued intent tokens or preserving checkout state in a more persistent store/session.

---

## SEO & Metadata

- Product detail pages have **SEO-friendly slugs**.
- Includes JSON-LD structured data and Open Graph meta tags for sharing / social previews.
- Make sure the backend provides fields necessary for metadata: title, description, image URL, slug, etc.
- If possible, enable server-side rendering (SSR) for list & detail pages for better crawlability and performance.

---

## Tests & Quality

- There is a directory `e2e/` for end-to-end tests (using Playwright).
- Use `npm run check` or equivalent for type checking.
- ESLint & Prettier for code style consistency.
- Consider adding unit / component-level tests, especially around checkout flow and search.

---

## Deployment

You can deploy this SvelteKit app to platforms like:

- Vercel
- Netlify
- Cloudflare Pages
- DigitalOcean App Platform

Make sure:

- Environment variables (if any) are properly set (e.g. for API endpoints, keys).
- Build output handles static assets correctly.
- HTTPS, caching, and any other performance optimizations are in place.

---

## Security Considerations

- Never trust client-side price or product data. Backend must validate.
- Ensure all communication with backend is over HTTPS.
- Sanitize user inputs (search, filters etc.) to avoid injection attacks.
- For payment flows (e.g. MPESA), validate server-side, ensure proper handling of callbacks / confirmations.
- If authentication/authorization is added later, ensure protected routes / user data are handled safely.

---

## Roadmap / Further Improvements

Some ideas to enhance or extend this project:

- Replace in-memory cart / quick-checkout with backend-persisted cart or checkout session.
- Add user accounts, login/logout, order history.
- More filtering (by date, subject, difficulty).
- Improving the UI: theming, animations etc.
- Offline support or caching (for slow connections).
- Accessibility audits & improvements.
- More robust test coverage (unit + integration).
- Internationalization (if needed).

---

## Contributing

If you want to contribute:

1. Fork the repo.
2. Create a new branch with a clear name (e.g. `feature/search-enhancement`, `fix/timeline-alignment`).
3. Make your changes & test thoroughly.
4. Update or add tests (where appropriate).
5. Open a pull request with a clear description of the problem & your solution.

Please adhere to existing style / lint rules. Use formatting tools like Prettier.

---
