-- Publish the Sep 2026 copy review into the live studio-desk table.
-- Neon site_copy overrides code defaults, so these rows must match the new
-- defaults in src/lib/cms.ts. about.bullet_2 (continuing education) is retired.

insert into site_copy (key, value, updated_at)
values
  ('home.headline', $c0$Fear-Free dog grooming and boarding in a Charlotte home$c0$, now()),
  ('home.subhead', $c1$Vanessa is a vet-trained, Fear Free Certified groomer who works with one dog at a time in her Charlotte home studio. Nervous dogs, seniors, and first-timers get as much time as they need. We also offer overnight boarding, daycare, and dog sitting.$c1$, now()),
  ('home.serving', $c2$Serving the greater Charlotte area, Fort Mill, Tega Cay, and nearby towns · By appointment only · Weeknights 6 to 9pm and weekends$c2$, now()),
  ('home.cta_body', $c3$Pick a time that works for you and tell us anything Vanessa should know about your dog. If your dog needs a break or a second visit to finish, that’s fine.$c3$, now()),
  ('about.intro', $c4$Vanessa has worked with animals for nearly two decades. She trained as a veterinarian in Venezuela and has groomed dogs professionally for five years. As a Fear Free Certified Professional, she watches each dog’s body language and slows down when a dog is worried. She welcomes dogs from the greater Charlotte area and nearby towns.$c4$, now()),
  ('about.bullet_4', $c5$Extra experience with poodles, schnauzers, doodles, and small breeds. All breeds welcome.$c5$, now()),
  ('grooming.intro', $c6$Full grooms, baths, and add-ons in a quiet home studio. Vanessa works with one dog at a time and lets each one set the pace. All breeds are welcome, and she has extra experience with poodles, schnauzers, and doodles.$c6$, now()),
  ('boarding.intro', $c7$Your dog stays in our home, not a kennel. We offer overnight boarding, daytime daycare, and in-home dog sitting for families in Charlotte, Fort Mill, Tega Cay, and nearby towns.$c7$, now())
on conflict (key) do update
  set value = excluded.value,
      updated_at = now();

delete from site_copy where key = 'about.bullet_2';
