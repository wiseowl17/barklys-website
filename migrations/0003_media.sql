alter table gallery_photos
  add column if not exists collection text not null default 'gallery';

create index if not exists gallery_photos_collection_sort_idx
  on gallery_photos (collection, sort_order, id);

create table if not exists media_slots (
  src text not null,
  collection text not null,
  sort_order integer not null default 0,
  hidden boolean not null default false,
  primary key (src, collection)
);

insert into media_slots (src, collection, sort_order, hidden)
select src, 'gallery', 0, true from gallery_hidden
on conflict (src, collection) do update set hidden = true;
