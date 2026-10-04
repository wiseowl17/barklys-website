-- The public gallery was replaced with a new photo set.
-- Drop earlier gallery uploads and hide/order slots so the new photos are the wall.
delete from gallery_photos where collection = 'gallery';
delete from media_slots where collection = 'gallery';
