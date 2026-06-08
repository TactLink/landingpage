# 📦 TactLink Landing Page — Project Handover

> Handover for the TactLink marketing site + CMS — covers **ownership transfer (off personal accounts → company), infrastructure, deployment, security, and developer onboarding.**

---

## 🗺️ 1. System Overview

A two-part web app: a public marketing/landing site backed by a headless CMS.

```
┌─────────────────┐        HTTPS         ┌──────────────────┐
│   Next.js app   │  ── /api/* fetch ──▶  │   Strapi CMS     │
│   (frontend/)   │                       │   (backend/)     │
│   Vercel        │                       │   Render         │
└────────┬────────┘                       └────────┬─────────┘
         │                                         │
         │ SMTP (contact form)             ┌────────┴─────────┐
         ▼                                 ▼                  ▼
   Mail server                      Supabase Postgres   Cloudinary
   (info@tactlink.com)              (content DB)         (media files)
```

| Layer | Tech | Hosted on | Source |
|-------|------|-----------|--------|
| Frontend | Next.js 15 (App Router), React 19, Tailwind 3, next-intl | **Vercel** | `frontend/` |
| Backend / CMS | Strapi 5.18.1 (Node 18) | **Render** | `backend/` |
| Database | PostgreSQL | **Supabase** (`ap-southeast-1`) | — |
| Media storage | Cloudinary | **Cloudinary** | — |
| Transactional email | SMTP via nodemailer | (mail provider for `tactlink.com`) | `frontend/app/api/contact/route.ts` |
| Git repo | — | **GitHub**: `TactLink/landingpage` | — |

> ⚠️ **Current tier:** everything runs on **FREE plans**, and **Render is already hitting its free-tier limit** — the Strapi backend must move to a paid plan or a new host as part of this handover (free Render web services also sleep on inactivity → cold-start delays). Watch the Supabase / Cloudinary / Vercel free-tier caps too; none of this is sized for growth.

---

## 🔐 2. Accounts & Access You Must Obtain

**Today, everything below sits on the original developer's *personal* GitHub + SaaS logins.** The core handover task is transferring each to company-owned accounts (or re-platforming to AWS) — see the migration table at the end of this section. First, get owner/admin access to **each**:

- [ ] **GitHub** — `github.com/TactLink/landingpage`
- [ ] **Vercel** — project hosting the frontend (connected to the GitHub repo)
- [ ] **Render** — service running the Strapi backend
- [ ] **Supabase** — project `jfudrxydxczsdsktqvcv` (Postgres database)
- [ ] **Cloudinary** — account holding all uploaded media
- [ ] **Strapi Admin** — admin login for the live CMS (create/transfer an admin user)
- [ ] **Email / SMTP** — credentials for the `tactlink.com` mailbox used by the contact form & the receiving inboxes (`info@`, `info.singapore@`, etc.)
- [ ] **Domain / DNS** — registrar + DNS for `tactlink.com` (controls where Vercel & Render point)

### 🔄 Migrating from personal → company ownership

Two paths per service — **(A) transfer the existing SaaS account to the company** (fast, low-risk, keeps the proven stack) or **(B) re-platform onto company infra such as AWS** (more work, consolidates):

| Component | Today (personal) | A · Transfer SaaS to company | B · Re-platform (e.g. AWS) |
|-----------|------------------|------------------------------|-----------------------------|
| **Source repo** | personal GitHub | repo Settings → **Transfer ownership** to the company org | (optional) mirror to CodeCommit |
| **Frontend** | Vercel | move project into a company **Vercel Team** | **AWS Amplify Hosting** (native Next.js) or S3 + CloudFront + Lambda |
| **Backend (Strapi)** | Render | move service to company **Render** account | **AWS App Runner / ECS Fargate / Elastic Beanstalk** (Dockerized Strapi) |
| **Database** | Supabase | transfer the Supabase **org/project** to company | **AWS RDS for PostgreSQL** (`pg_dump` → restore) |
| **Media** | Cloudinary | recreate/transfer a company **Cloudinary** | **AWS S3** + swap Strapi upload provider to `@strapi/provider-upload-aws-s3` |
| **Email / SMTP** | personal SMTP (tactlink.com) | company mailbox SMTP creds | **AWS SES** (SMTP) |
| **Domain / DNS** | registrar (confirm owner) | move to company registrar account | **AWS Route 53** |

**Suggested cutover order:** ① DB (Supabase → target, dump/restore) → ② media (Cloudinary → target) → ③ backend (Strapi on new host, point at new DB + media, **rotate all secrets**, re-enable Public perms) → ④ frontend (new host, set `NEXT_PUBLIC_STRAPI_URL` to the new backend) → ⑤ email → ⑥ **DNS cutover** for `tactlink.com`. Rotate every secret during the move (they were committed under the personal setup — see §3).

> 💡 **Path A (transfer the SaaS accounts) is usually far less work** than an AWS re-platform and keeps the working stack intact. Re-platform to AWS only if there's a real consolidation / compliance reason.
>
> ⚠️ **Caveat for this project:** the SaaS accounts were created via the original developer's *personal GitHub login* and all sit on **free tiers** (Render already capped). Because of that, a **clean rebuild under company-owned accounts + a data migration is often cleaner than trying to transfer personal, OAuth-linked logins** — the free tiers are being replaced anyway. The only asset that genuinely needs a *transfer* is the **GitHub repo**; everything else can be stood up fresh on company accounts and re-pointed (DB dump/restore + media migration + DNS).

---

## 🚨 3. Security: Read This First

**Secrets are currently committed to the git repo.** This must be remediated as part of taking ownership:

1. **`backend/config/database.ts`** hardcodes the production Supabase host, username, and password as fallback defaults.
2. **`backend/RENDER_ENV_VARS.md`** and **`backend/COMPLETE_SOLUTION.md`** contain the live DB password and all Strapi secrets (`JWT_SECRET`, `ADMIN_JWT_SECRET`, `APP_KEYS`, etc.) in plaintext.
3. **`backend/generated-secrets.txt`** and **`backend/.env`** are present in the working tree.

**Recommended remediation after handover:**
- 🔄 Rotate **all** secrets: Supabase DB password, every Strapi secret, Cloudinary API secret, SMTP password.
- 🧹 Remove the hardcoded fallbacks in `database.ts` (force config via env vars only).
- 🗑️ Delete the secret-bearing `.md` files and `generated-secrets.txt`; scrub git history if the repo is or was ever public.
- ✅ Confirm `.env`, `.env.local`, `.tmp/` are gitignored (root `.gitignore` currently only ignores `node_modules/` — **backend `.env` is at risk of being committed**).

---

## ⚙️ 4. Environment Variables

### Backend (Strapi → set in Render dashboard)

**Database (Supabase Postgres):**
```
DATABASE_CLIENT=postgres
DATABASE_URL=postgresql://<user>:<password>@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres
DATABASE_HOST=aws-0-ap-southeast-1.pooler.supabase.com
DATABASE_PORT=5432
DATABASE_NAME=postgres
DATABASE_USERNAME=postgres.<project-ref>
DATABASE_PASSWORD=<password>
DATABASE_SCHEMA=public
```

**Strapi secrets** (generate fresh — do NOT reuse the ones in the repo):
```
APP_KEYS=<4 comma-separated keys>
API_TOKEN_SALT=<value>
ADMIN_JWT_SECRET=<value>
TRANSFER_TOKEN_SALT=<value>
JWT_SECRET=<value>
ENCRYPTION_KEY=<value>
NODE_ENV=production
```

**Cloudinary** (media persistence — without these, uploads use local disk and are **lost on every Render restart**):
```
CLOUDINARY_NAME=<cloud_name>
CLOUDINARY_KEY=<api_key>
CLOUDINARY_SECRET=<api_secret>
```

### Frontend (Next.js → set in Vercel dashboard)
```
NEXT_PUBLIC_STRAPI_URL=https://<your-strapi-on-render>   # public CMS URL
SMTP_HOST=<smtp host>
SMTP_PORT=465
SMTP_USER=<sending mailbox>
SMTP_PASS=<password>
```
> Locally, `frontend/.env.local` points `NEXT_PUBLIC_STRAPI_URL` at `http://localhost:1337`.

---

## 🧩 5. Infrastructure Detail

### Database (`backend/config/database.ts`)
- Multi-driver config supporting `postgres` (prod default), `mysql`, and `sqlite` (local dev).
- **Production** uses Supabase Postgres via connection pooler (port 5432), SSL with `rejectUnauthorized: false`.
- **Local dev** falls back to SQLite at `backend/.tmp/data.db` (set `DATABASE_CLIENT=sqlite`).
- ⚠️ Why Supabase: Render's filesystem is ephemeral — SQLite would reset on every restart/redeploy. See `backend/RENDER_SUPABASE_SETUP.md`.

### Media storage (`backend/config/plugins.ts`)
- Provider auto-selects: **Cloudinary** if `CLOUDINARY_NAME` is set, otherwise **local disk**.
- Same ephemeral-filesystem reason as the DB — local uploads vanish on restart. See `backend/CLOUDINARY_SETUP.md`.

### Email / contact form (`frontend/app/api/contact/route.ts`)
- A Next.js API route (runs on Vercel), **not** Strapi, handles the partnership inquiry form.
- Uses `nodemailer` over SMTP (port 465, secure).
- **Dynamic routing by country** → sends to a region-specific inbox:
  `singapore→info.singapore@`, `thailand→info.thailand@`, `cambodia`, `malaysia`, `indonesia`, `vietnam`, `philippines`, `bangladesh`, else `info@tactlink.com`.
- Required fields: `name`, `email`, `message`, `country`.

### Internationalization
- `next-intl` with locales **`en` (default), `zh`, `id`**. Translations in `frontend/messages/{en,zh,id}.json`.
- Middleware (`frontend/middleware.ts`) handles locale detection + path prefixing.
- Root `/` redirects to `/en` (`frontend/next.config.ts`). `CountryDetectBanner.tsx` suggests a locale based on browser language.
- ⚠️ Strapi also has i18n enabled (`en`, `zh`, `id`) in `plugins.ts` — keep these locale lists in sync if you add a language.

---

## 🌍 6. Strapi Content Model

Collections under `backend/src/api/`:

| Collection | Purpose | Notes |
|------------|---------|-------|
| `country` | Drives the country dropdown on the demo/contact form | Fields: `name` (unique), `order`. Managed in Strapi admin — no code change to add/remove. |
| `demo-request` | Stores submitted demo requests | Fields: `name`, `phone`, `email`, `organization`, `role`, `memberSize`, `country`. |
| `faq` | FAQ entries | — |
| `partner` | Partner listings | — |

> ⚠️ **Public API permissions are not in code.** After any fresh deploy or DB migration, go to **Strapi Admin → Settings → Roles → Public** and re-enable read permissions for the collections the frontend fetches (`country`, `faq`, `partner`). See `CLAUDE.md`.

Frontend fetch helper: `frontend/lib/strapi.ts` → `fetchStrapiCollection(collection, params)`. Always use `STRAPI_URL` from there; never hardcode `localhost:1337`.

---

## 💻 7. Local Development

**Prereqs:** Node 18 (Strapi `engines` pins `18.x`), npm.

```powershell
# Backend (Strapi) — http://localhost:1337
cd backend
npm install
npm run develop        # autoReload on; admin at /admin

# Frontend (Next.js) — http://localhost:3000
cd frontend
npm install
npm run dev            # turbopack
```

- For a fully local backend, set `DATABASE_CLIENT=sqlite` in `backend/.env` to use `.tmp/data.db` instead of hitting prod Supabase.
- Frontend reads `NEXT_PUBLIC_STRAPI_URL` from `frontend/.env.local`.

---

## 🚀 8. Deployment

| What | Where | Trigger |
|------|-------|---------|
| Frontend | Vercel | Auto-deploy on push to the production branch (GitHub-connected). Env vars in Vercel project settings. |
| Backend | Render | `npm run build` then `npm run start`. Env vars in Render dashboard. Manual or auto deploy on commit. |

**Deploy checklist (backend):**
1. Confirm all env vars set in Render (DB, Strapi secrets, Cloudinary).
2. Deploy → watch logs for `Database: postgres` / "connection established".
3. Verify Supabase Table Editor shows tables.
4. Re-check **Public role permissions** in Strapi admin.
5. Re-upload any media if migrating storage.

> ℹ️ **Deploy branch: `master`** — Vercel & Render both deploy from `master`. Feature work happens on branches (e.g. `feature/landing-page-updates`); merge to `master` to ship.

---

## 📁 9. Repo Layout

```
landingpage/
├── CLAUDE.md                 # conventions (Strapi, country dropdown, Tailwind tokens)
├── HANDOVER.md               # this file
├── assets/                   # source images (not all served)
├── frontend/                 # Next.js app
│   ├── app/[locale]/         # pages: about, contact, digital-namecard, privacy, request-demo, terms
│   ├── app/api/contact/      # contact-form email endpoint
│   ├── components/           # Navbar, Footer, ClientLayout, CountryDetectBanner
│   ├── i18n/ messages/       # next-intl routing + en/zh/id translations
│   └── lib/strapi.ts         # Strapi fetch helper
└── backend/                  # Strapi CMS
    ├── config/               # database, plugins, server, middlewares, admin, api
    ├── src/api/              # country, demo-request, faq, partner
    └── *.md                  # ⚠️ setup guides — some contain live secrets (remove)
```

---

## ✅ 10. First-Week Handover Checklist

1. [ ] Get access to all accounts in §2.
2. [ ] Rotate every secret (§3) and update Render + Vercel env vars.
3. [ ] Remove committed secrets from the repo + fix `.gitignore`.
4. [ ] Confirm which branch Vercel & Render deploy from.
5. [ ] Run both apps locally end-to-end (SQLite backend ok for a smoke test).
6. [ ] Submit a test contact form → confirm it lands in the right regional inbox.
7. [ ] Verify Cloudinary uploads persist across a Render restart.
8. [ ] Confirm Supabase has automated backups enabled.
9. [ ] Document the DNS records pointing `tactlink.com` at Vercel/Render.

---

## 👩‍💻 11. Developer Onboarding (Quick-Start)

> For engineers picking up day-to-day work. Infra / secrets / deploy are in §1–§10 above.

### ⚡ Get productive in 5 minutes
```powershell
# Backend (Strapi CMS) → http://localhost:1337/admin
cd backend; npm install
# optional: set DATABASE_CLIENT=sqlite in backend/.env to use local .tmp/data.db instead of prod Supabase
npm run develop

# Frontend (Next.js) → http://localhost:3000  (auto-redirects to /en)
cd frontend; npm install
# create frontend/.env.local with: NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
npm run dev
```
Node **18.x** required (Strapi pins it). Frontend dev uses Turbopack.

### 🗂️ Where things live (`frontend/`)
| Path | What |
|------|------|
| `app/[locale]/page.tsx` | Home page |
| `app/[locale]/{about,contact,digital-namecard,request-demo,privacy,terms}/page.tsx` | The other pages (all locale-prefixed) |
| `app/[locale]/layout.tsx` · `app/layout.tsx` | Locale layout · root layout |
| `app/api/contact/route.ts` | Contact-form email endpoint (nodemailer/SMTP, country-routed) — see §5 |
| `components/` | `Navbar`, `Footer`, `ClientLayout`, `CountryDetectBanner` |
| `lib/strapi.ts` | `fetchStrapiCollection(collection, params)` + `STRAPI_URL` — the only way to call the CMS |
| `i18n/{routing,request,navigation}.ts` · `middleware.ts` | next-intl setup + locale routing/detection |
| `messages/{en,zh,id}.json` | UI copy per locale |
| `tailwind.config.js` | Theme tokens (`tactlink-*`, `brand-primary`) |

Backend (`backend/`): content types in `src/api/<name>/` (`country`, `demo-request`, `faq`, `partner`); runtime config in `config/` (database, plugins, server…) — see §5 / §6.

### 🛠️ "How do I…"
- **Add / edit a page** → create `app/[locale]/<route>/page.tsx`; it's automatically locale-prefixed. Link with the next-intl navigation helpers in `i18n/navigation.ts`.
- **Add UI copy** → add the key to **all three** `messages/{en,zh,id}.json` and read it with `useTranslations()` (next-intl). Keep the three files in sync.
- **Fetch CMS content** → use `fetchStrapiCollection(collection, params)` from `lib/strapi.ts`. **Never hardcode `localhost:1337`** — always go through `STRAPI_URL`.
- **Add a Strapi content type** → 4 files under `backend/src/api/<name>/` (`content-types/<name>/schema.json`, `controllers`, `services`, `routes`) — see project `CLAUDE.md`. **Then re-enable Public read perms** (Strapi Admin → Settings → Roles → Public).
- **Add / remove a country** (demo & contact dropdown) → Strapi Admin → Content Manager → **Country** (no code; fields `name` + `order`).
- **Change brand colors / spacing** → `tailwind.config.js` tokens; reuse `tactlink-primary/accent/dark/light/white` and `brand-primary`, and keep the global container padding (see project `CLAUDE.md` → Layout conventions).

### ⚠️ Dev gotchas
- **i18n: `next-intl` is canonical.** `next-i18next`, `react-i18next`, `i18next`, and `next-i18next.config.js` are **legacy and unused** (in `package.json` but never imported) — don't build on them; safe to remove. Locales are `en` (default), `zh`, `id` — keep them in sync across `messages/*`, the next-intl `routing.ts`, **and** Strapi's i18n plugin (§5).
- **Public API permissions reset on fresh deploys / migrations** — re-enable Public *read* in Strapi admin or the frontend gets empty/403 responses from the CMS (§6).
- **Root `/` → `/en`** redirect lives in `next.config.ts` (handled at the Vercel edge), not in a page.
- **Local backend can run on SQLite** (`DATABASE_CLIENT=sqlite`) so you don't touch prod Supabase while developing.
- **Ephemeral hosting** — Render's filesystem resets, so media→Cloudinary and DB→Supabase are mandatory in prod (§5); don't rely on local uploads persisting.

### 🌿 Branching / deploy
Recent work has been on **`feature/landing-page-updates`** (next-intl locale routing). **Vercel & Render deploy from `master`** — merge feature branches there to ship (§8).

---

## 🔑 12. Ownership Transfer Plan (personal → company)

> **Why a rebuild beats a login transfer:** the SaaS accounts are on the original dev's *personal* GitHub-OAuth logins and **free tiers** (Render already capped). The **only** truly GitHub-owned asset is the repo — everything else just *authenticates* via GitHub and can be re-pointed. See the migration table (§2) and secret rotation (§3).

### ✅ Recommended — rebuild under company-owned accounts
1. [ ] Transfer the **GitHub repo** to the company org (`TactLink-Malaysia`): repo → Settings → **Transfer ownership**. *(The one genuine GitHub-linked asset.)*
2. [ ] Create a **company email** (e.g. shared `dev@` / `ops@tactlink.com`) and use it for **all** new accounts — not GitHub OAuth.
3. [ ] **Database** — `pg_dump` the Supabase DB → restore into a company-org Supabase project (or AWS RDS).
4. [ ] **Media** — migrate / re-upload Cloudinary assets into a company Cloudinary account (or AWS S3 + `@strapi/provider-upload-aws-s3`).
5. [ ] **Backend** — deploy Strapi fresh under the company account on a **paid plan / new host** (off free Render); point it at the new DB + media.
6. [ ] **Frontend** — company Vercel **Team** connected to the company-org repo; set `NEXT_PUBLIC_STRAPI_URL` to the new backend.
7. [ ] **Email** — company SMTP creds (or AWS SES) for the contact form.
8. [ ] **Rotate every secret** (§3) and set fresh env vars in the new hosting.
9. [ ] **DNS cutover** — point `tactlink.com` at the new frontend / backend.
10. [ ] **Verify** end-to-end (pages load, CMS data shows, contact form lands in the right inbox, media persists across a restart), then **remove personal access**.

### 🔁 Alternative — transfer SaaS projects in place (where supported)
- [ ] **GitHub repo** → Transfer ownership → org ✅ clean
- [ ] **Vercel** → create company Team → Project Settings → **Transfer to team**
- [ ] **Supabase** → add company as org owner → Project Settings → **Transfer project**
- [ ] **Render** → company **Workspace** → transfer service / add company owner *(still must leave the free tier)*
- [ ] **Cloudinary** → change account email to the company one *(TactLink-only account)* or recreate + migrate assets

### 🔓 Decouple from your personal GitHub
- [ ] In each SaaS, add an **email+password** login (or company SSO) in account settings, then **remove the GitHub connection** — that's what actually severs the dependency on your personal GitHub.

> **Bottom line for Gene:** company GitHub org + repo transfer, then fresh company accounts + a quick data migration — don't burn days untangling OAuth transfers when the free tiers are being replaced anyway.
