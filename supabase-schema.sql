-- GROWTHIKA PLATFORM DATABASE
-- Run this entire file once in Supabase > SQL Editor.

create extension if not exists pgcrypto;

do $$ begin
  create type public.user_role as enum ('admin','client');
exception when duplicate_object then null;
end $$;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  full_name text,
  phone text,
  role public.user_role not null default 'client',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.packages (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  price numeric(12,2) not null default 0,
  total_reels integer not null default 0 check (total_reels >= 0),
  description text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.clients (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid unique references public.profiles(id) on delete set null,
  company_name text not null,
  phone text,
  package_id uuid references public.packages(id) on delete set null,
  reels_used integer not null default 0 check (reels_used >= 0),
  start_date date default current_date,
  renewal_date date,
  drive_link text,
  status text not null default 'active' check (status in ('active','paused','completed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.influencers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  instagram text,
  city text,
  niche text,
  followers bigint not null default 0,
  engagement numeric(6,2) not null default 0,
  rate numeric(12,2) not null default 0,
  phone text,
  email text,
  portfolio_url text,
  availability text not null default 'available' check (availability in ('available','busy','unavailable')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.deliverables (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  title text not null,
  type text not null default 'reel',
  status text not null default 'planned' check (status in ('planned','in_progress','review','completed')),
  url text,
  due_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.invoices (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  invoice_number text not null unique,
  amount numeric(12,2) not null default 0,
  status text not null default 'pending' check (status in ('pending','paid','overdue')),
  due_date date,
  url text,
  created_at timestamptz not null default now()
);

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  message text not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.activity_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles(id) on delete set null,
  action text not null,
  entity_type text,
  entity_id uuid,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public
as $$ select exists(select 1 from public.profiles where id = auth.uid() and role = 'admin'); $$;

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles(id,email,full_name,role)
  values(
    new.id,
    lower(new.email),
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email,'@',1)),
    case when lower(new.email) in ('growthikaofficial@gmail.com','pahalsharma78tues@gmail.com') then 'admin'::public.user_role else 'client'::public.user_role end
  ) on conflict (id) do update set email=excluded.email;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert or update of email on auth.users
for each row execute function public.handle_new_user();


-- Backfill profiles for users created before this schema was run.
insert into public.profiles(id,email,full_name,role)
select
  u.id,
  lower(u.email),
  coalesce(u.raw_user_meta_data->>'full_name', split_part(u.email,'@',1)),
  case when lower(u.email) in ('growthikaofficial@gmail.com','pahalsharma78tues@gmail.com')
    then 'admin'::public.user_role else 'client'::public.user_role end
from auth.users u
where u.email is not null
on conflict (id) do update set
  email = excluded.email,
  role = case when excluded.email in ('growthikaofficial@gmail.com','pahalsharma78tues@gmail.com')
    then 'admin'::public.user_role else public.profiles.role end;

alter table public.profiles enable row level security;
alter table public.packages enable row level security;
alter table public.clients enable row level security;
alter table public.influencers enable row level security;
alter table public.deliverables enable row level security;
alter table public.invoices enable row level security;
alter table public.notifications enable row level security;
alter table public.activity_logs enable row level security;

create policy "profiles_self_read" on public.profiles for select using (id=auth.uid() or public.is_admin());
create policy "profiles_admin_all" on public.profiles for all using (public.is_admin()) with check (public.is_admin());
create policy "packages_authenticated_read" on public.packages for select to authenticated using (true);
create policy "packages_admin_all" on public.packages for all using (public.is_admin()) with check (public.is_admin());
create policy "clients_admin_all" on public.clients for all using (public.is_admin()) with check (public.is_admin());
create policy "clients_self_read" on public.clients for select using (profile_id=auth.uid());
create policy "influencers_admin_only" on public.influencers for all using (public.is_admin()) with check (public.is_admin());
create policy "deliverables_admin_all" on public.deliverables for all using (public.is_admin()) with check (public.is_admin());
create policy "deliverables_client_read" on public.deliverables for select using (exists(select 1 from public.clients c where c.id=client_id and c.profile_id=auth.uid()));
create policy "invoices_admin_all" on public.invoices for all using (public.is_admin()) with check (public.is_admin());
create policy "invoices_client_read" on public.invoices for select using (exists(select 1 from public.clients c where c.id=client_id and c.profile_id=auth.uid()));
create policy "notifications_admin_all" on public.notifications for all using (public.is_admin()) with check (public.is_admin());
create policy "notifications_self_read" on public.notifications for select using (user_id=auth.uid());
create policy "notifications_self_update" on public.notifications for update using (user_id=auth.uid()) with check (user_id=auth.uid());
create policy "activity_admin_only" on public.activity_logs for all using (public.is_admin()) with check (public.is_admin());

insert into public.packages(name,price,total_reels,description) values
('Growth Plan',18000,4,'Professional content and a consistent digital presence.'),
('PR & Branding',40000,8,'Influencer collaboration, personal branding and strategy.'),
('Business Growth',70000,12,'Premium content, creators, ads and lead generation.')
on conflict (name) do update set price=excluded.price,total_reels=excluded.total_reels,description=excluded.description;

-- If the two admin users were created BEFORE running this SQL, run these after the schema:
-- update public.profiles set role='admin' where lower(email) in ('growthikaofficial@gmail.com','pahalsharma78tues@gmail.com');
