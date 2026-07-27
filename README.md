# Growthika Platform v3

A complete Next.js + Supabase real-estate marketing platform with an animated public website, client dashboard and private admin CRM.

## Included

- Premium responsive website with Motion animations and a lightweight React Three Fiber hero
- Supabase email/password authentication and password reset
- Protected admin and client routes
- Client package, reel usage, renewal, deliverable, invoice, notification and link tracking
- Admin client, package, deliverable and invoice management
- Private admin-only influencer CRM
- Row Level Security policies
- Both initial admin emails are automatically recognised by the database trigger

## 1. Install

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## 2. Prepare Supabase

1. Open Supabase > SQL Editor.
2. Paste and run `supabase-schema.sql` once.
3. Open Authentication > Users > Add user.
4. Create these two users and choose secure passwords:
   - growthikaofficial@gmail.com
   - pahalsharma78tues@gmail.com
5. Create client users from Authentication > Users. Then add a matching client record in the admin dashboard and connect it by setting `profile_id` in Supabase Table Editor. This manual link is intentionally required because public sign-up is disabled.

If the admin users were created before the SQL was run, execute:

```sql
update public.profiles set role='admin'
where lower(email) in ('growthikaofficial@gmail.com','pahalsharma78tues@gmail.com');
```

## 3. Environment variables

`.env.local` is included for local testing and is ignored by Git. In Vercel, add:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_ADMIN_EMAILS`

Never expose a Supabase `service_role` key.

## 4. GitHub

Do not commit `node_modules`, `.next` or `.env.local`.

```bash
git add .
git commit -m "Launch Growthika platform v3"
git push
```

## Important production notes

- Replace temporary Pexels video URLs with Growthika-owned media before a major launch.
- Configure your production URL under Supabase Authentication > URL Configuration.
- Add Vercel URL and your future custom domain to redirect URLs.
- For client file uploads, create a private Supabase Storage bucket and add signed-URL policies in a later iteration.


## Fast setup order
1. Supabase SQL Editor: run `supabase-schema.sql` completely.
2. Authentication > Users: create both admin emails with Auto Confirm enabled.
3. If users existed before SQL, rerun the SQL once; the backfill safely creates their profiles.
4. Run `npm install`, then `npm run dev`.

Admin emails:
- growthikaofficial@gmail.com
- pahalsharma78tues@gmail.com
