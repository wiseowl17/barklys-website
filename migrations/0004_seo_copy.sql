-- Publish the SEO/copy rewrite into the live studio-desk table.
-- Neon site_copy overrides code defaults; these rows were saved before the rewrite.

insert into site_copy (key, value, updated_at)
values
  ('home.subhead', $c0$No cages, no crowded kennel runs, no rushing your dog through a haircut. Barkly’s is a calm, home-based studio for grooming, boarding, daycare, and dog sitting — built for dogs who need a little more patience, especially the sensitive, senior, and first-time guests.$c0$, now()),
  ('home.serving', $c1$Serving the greater Charlotte area, Fort Mill, Tega Cay, and nearby towns · By appointment only$c1$, now()),
  ('home.cta_body', $c2$Pick a time that works for you. We’ll handle the rest — coat notes, Fear-Free pacing, and a calm visit, every time.$c2$, now()),
  ('about.intro', $c3$Nearly two decades in animal care, a veterinary education from Venezuela, and five years as a professional dog groomer — Vanessa brings a vet’s eye for a dog’s body language to every appointment, with a Fear Free certification at the center of it. She welcomes dogs from the greater Charlotte area and nearby towns.$c3$, now()),
  ('about.bullet_2', $c4$Continuing her veterinary education in the U.S. alongside her grooming practice$c4$, now()),
  ('grooming.intro', $c5$Full grooms, baths, and add-ons in a quiet home studio — not a loud salon floor. Every dog gets one-on-one attention at their own pace, with extra fluency in poodles, schnauzers, and doodles. All breeds welcome, from Charlotte to Fort Mill, Tega Cay, and nearby towns.$c5$, now()),
  ('boarding.intro', $c6$A real home, not a kennel — overnight boarding, in-home dog sitting, and daytime daycare with structure, rest, and familiar faces instead of a row of runs. For families in Charlotte, Fort Mill, Tega Cay, and nearby towns.$c6$, now())
on conflict (key) do update
  set value = excluded.value,
      updated_at = now();
