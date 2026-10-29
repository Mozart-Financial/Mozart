-- Run in the chosen Supabase project. Applicant records and resumes are private.
create table if not exists public.career_applications (
  id uuid primary key,
  created_at timestamptz not null default now(),
  role_slug text not null,
  full_name text not null,
  email text not null,
  linkedin_url text,
  portfolio_url text,
  note text,
  resume_path text not null unique,
  resume_filename text not null
);
alter table public.career_applications enable row level security;
revoke all on public.career_applications from anon, authenticated;
grant insert, select, update, delete on public.career_applications to service_role;
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('career-resumes', 'career-resumes', false, 10485760,
  array['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'])
on conflict (id) do update set public = false, file_size_limit = 10485760, allowed_mime_types = excluded.allowed_mime_types;
