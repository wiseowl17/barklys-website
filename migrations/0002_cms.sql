create table if not exists site_copy (
  key text primary key,
  value text not null,
  updated_at timestamptz not null default now()
);

create table if not exists gallery_photos (
  id serial primary key,
  name text not null,
  alt text not null default '',
  mime text not null,
  bytes bytea not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists gallery_hidden (
  src text primary key
);
