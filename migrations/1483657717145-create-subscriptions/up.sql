-- 1483657717145-create-subscriptions/up.sql
-- write your new migration here

CREATE TABLE subscriptions (
  user_uuid UUID REFERENCES users(uuid),
  podcast_uuid UUID REFERENCES podcasts(uuid),
  PRIMARY KEY (user_uuid, podcast_uuid)
);
