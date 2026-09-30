-- Boarding and house-visit requests. The public form used to depend only on
-- FormSubmit, which was returning 429 and dropping the request.

create table if not exists stay_requests (
  id serial primary key,
  kind text not null,
  name text not null,
  phone text not null,
  email text not null,
  payload text not null,
  created_at timestamptz not null default now()
);
