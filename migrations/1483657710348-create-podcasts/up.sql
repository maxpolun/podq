-- 1483657710348-create-podcasts/up.sql
-- write your new migration here

CREATE TABLE podcasts (
  uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  feed_url TEXT NOT NULL,
  hub_url TEXT,
  name TEXT NOT NULL,
  description TEXT NOT NULL
);
