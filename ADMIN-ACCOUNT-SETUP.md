# Admin-created client accounts

The Admin > Clients > Add client form can now create a Supabase login and link it to the client record in one step.

## Required one-time environment setup

1. Open Supabase Dashboard > Project Settings > API.
2. Copy the **service_role** key.
3. Add this to `.env.local` locally and to the Vercel project's Environment Variables:

```env
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

Never expose this key in browser code, never prefix it with `NEXT_PUBLIC_`, and never commit it to GitHub.

Restart the development server after adding the variable.

## How to use

1. Sign in with a Growthika admin account.
2. Open `/admin?tab=clients`.
3. Click **Add client**.
4. Keep **Create portal login** set to Yes.
5. Enter the client's full name and email.
6. Leave Temporary password empty to generate one securely.
7. Keep **Send setup email** set to Yes so the client receives the password setup link.
8. Save. The auth user, profile, and linked client record are created together.
