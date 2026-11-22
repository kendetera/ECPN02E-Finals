# ElectiveFinals

Admin system for a store: login, employee registration, payroll, POS, and searchable reports.
React (Vite) frontend + Node.js (Express) API, Supabase (Postgres) database, hosted on an AWS EC2 server.

## Run it on your PC

1. Create a Supabase project and run [`db/schema.sql`](db/schema.sql) (see [docs/AWS_SETUP.md](docs/AWS_SETUP.md) step 2).
2. Copy `.env.example` to `.env` and fill it in.
3. Install and start:
   ```bash
   npm install
   npm --prefix client install
   npm run create-admin -- admin YourPassword
   npm run dev
   ```
4. Open <http://localhost:5173>.

## Deploy

Every push to `main` deploys to EC2 through [GitHub Actions](.github/workflows/deploy.yml). First-time server setup: [docs/AWS_SETUP.md](docs/AWS_SETUP.md).

## Where things are

| What | Where |
|---|---|
| Pages | `client/src/pages/` |
| Sidebar entries | `client/src/pages.js` |
| Roles and what each can open | `server/roles.js` |
| API routes | `server/routes/` |
| Database tables | `db/schema.sql` |

### Adding a role
Add a line to `server/roles.js`, e.g. `manager: ['dashboard', 'employee-report', 'sales-report'],`. It then appears in the User Account page's role list.

### Adding a form field
Add the column in `db/schema.sql` (and run an `alter table … add column …` in Supabase), add it to `FIELDS` in the matching route, and add a `<Field>` to the page.

## Still to do
- Replace the placeholder POS (`client/src/pages/Pos.jsx`) with the 5 prelim POS pages.
- Extra employee / payroll fields from the prelim work.
