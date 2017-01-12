-- 1484239815812-create-episodes/up.sql
-- write your new migration here

CREATE TABLE episodes (
  uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  podcast_uuid UUID NOT NULL REFERENCES podcasts(uuid),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  released_at TIMESTAMP WITH TIME ZONE,
  author_guid TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_format TEXT NOT NULL,
  file_length INT,
  file_duration TEXT
);
