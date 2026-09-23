-- Coat + weight pricing from the Setmore menu (Sep 2026).
-- Saving the studio desk stores every price row, so the live site holds the
-- old single-column table; overwrite it. Values equal JSON.stringify of
-- GROOM_PRICES and ADD_ONS in src/lib/site.ts.

insert into site_copy (key, value, updated_at)
values
  ('prices.groom', $p0$[{"size":"S","range":"0–25 lbs","price":"$75","touchUp":"$65","bathShort":"$45","bathLong":"$55"},{"size":"M","range":"26–40 lbs","price":"$85","touchUp":"$75","bathShort":"$60","bathLong":"$70"},{"size":"L","range":"41–70 lbs","price":"$95","touchUp":"$85","bathShort":"$80","bathLong":"$90"},{"size":"XL","range":"71–90 lbs","price":"$105","touchUp":"$95","bathShort":"Call us","bathLong":"Call us"}]$p0$, now()),
  ('prices.addons', $p1$[{"name":"Deshedding","from":"$25"},{"name":"Dematting","from":"$20–$35 by size"},{"name":"Nail trim on its own","from":"$20"},{"name":"Teeth brushing","from":"$6"},{"name":"Paw balm","from":"$4"},{"name":"Specialty shampoo","from":"Quoted"}]$p1$, now())
on conflict (key) do update
  set value = excluded.value,
      updated_at = now();
