# 🗂️ TactLink Landing Page

## 🏗️ Stack
- **Frontend**: Next.js (App Router) + Tailwind CSS — lives in `frontend/`
- **Backend**: Strapi CMS — lives in `backend/`
- **DB**: SQLite (local dev via `backend/.tmp/data.db`)

## 🌐 Strapi conventions
- Base URL helper: `frontend/lib/strapi.ts` — always use `STRAPI_URL` from here, never hardcode `localhost:1337`
- Env var: `NEXT_PUBLIC_STRAPI_URL` (falls back to `http://localhost:1337`)
- Fetch helper: `fetchStrapiCollection(collection, params)` — returns `data.data`

## 📦 Adding a new Strapi collection type
Each collection needs 4 files under `backend/src/api/<name>/`:
```
content-types/<name>/schema.json   ← field definitions
controllers/<name>.ts              ← factories.createCoreController(...)
services/<name>.ts                 ← factories.createCoreService(...)
routes/<name>.ts                   ← export default { routes: [...] }
```
After adding, go to **Strapi Admin → Settings → Roles → Public** and enable the required permissions.

## 🌍 Country dropdown (Strapi-managed)
- Countries are stored in the `Country` collection (`backend/src/api/country/`)
- Fields: `name` (string, required, unique), `order` (integer, for sort)
- Frontend fetches via: `GET /api/countries?sort=order:asc,name:asc&filters[publishedAt][$notNull]=true`
- `demo-request.country` is a `string` field (not enum) — accepts any country name from the dynamic list
- To add/remove countries: **Strapi Admin → Content Manager → Country** (no code changes needed)

## 🎨 Tailwind tokens (key ones)
- `tactlink-primary`, `tactlink-accent`, `tactlink-dark`, `tactlink-light`, `tactlink-white`
- `brand-primary`

## 📐 Layout conventions
- Global container padding applied in Navbar, About, Contact pages to protect edges on zoomed/scaled displays
- Hero content on digital namecard page is center-aligned to prevent float on wide screens
- Section padding standardized to prevent content touching edges on mid-sized viewports
