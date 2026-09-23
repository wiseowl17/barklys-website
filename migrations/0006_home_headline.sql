-- Shorten the homepage headline. 0005 already published the longer line,
-- and applied migrations do not run again.

insert into site_copy (key, value, updated_at)
values
  ('home.headline', $c0$Fear-Free dog grooming in Charlotte$c0$, now())
on conflict (key) do update
  set value = excluded.value,
      updated_at = now();
