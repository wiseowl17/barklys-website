-- XL baths now priced: short hair $90, long hair or double coat $105 (were "Call us").
-- Overwrites the saved prices.groom row; value equals JSON.stringify(GROOM_PRICES)
-- in src/lib/site.ts.

insert into site_copy (key, value, updated_at)
values
  ('prices.groom', $p0$[{"size":"S","range":"0–25 lbs","price":"$75","touchUp":"$65","bathShort":"$45","bathLong":"$55"},{"size":"M","range":"26–40 lbs","price":"$85","touchUp":"$75","bathShort":"$60","bathLong":"$70"},{"size":"L","range":"41–70 lbs","price":"$95","touchUp":"$85","bathShort":"$80","bathLong":"$90"},{"size":"XL","range":"71–90 lbs","price":"$105","touchUp":"$95","bathShort":"$90","bathLong":"$105"}]$p0$, now())
on conflict (key) do update
  set value = excluded.value,
      updated_at = now();
