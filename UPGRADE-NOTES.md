# Growthika Admin CRM Upgrade

This build upgrades the existing project rather than replacing its architecture.

## Included

- Redesigned admin overview with active-client, package, deliverable, invoiced and paid-revenue metrics.
- Full add and edit modal forms for clients, packages, influencers, deliverables and invoices.
- Delete confirmation and success/error notifications.
- Search and status filtering across every admin module.
- Loading, empty and record-count states.
- Client portal-account assignment from existing Supabase client profiles.
- Better status badges, dates, money formatting and external resource links.
- Improved responsive admin experience.
- Correct boolean and numeric form conversion before Supabase writes.
- Fixed admin sidebar active state for query-string tabs.

## Run

```bash
npm install
npm run dev
```

For a production check:

```bash
npm run typecheck
npm run build
```

The database structure remains compatible with the included `supabase-schema.sql`.
