-- New client photos were added in code, with every before-and-after first.
-- Drop saved gallery order and uploads so that order is what visitors see.
delete from gallery_photos where collection = 'gallery';
delete from media_slots where collection = 'gallery';
