-- 1484247075194-uniq-episodes-by-podcast-guid/up.sql
-- write your new migration here

CREATE UNIQUE INDEX episode_unique ON episodes (podcast_uuid, author_guid);
