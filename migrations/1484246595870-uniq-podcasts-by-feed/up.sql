-- 1484246595870-uniq-podcasts-by-feed/up.sql
-- write your new migration here

CREATE UNIQUE INDEX podcasts_feed_unique ON podcasts (feed_url);
