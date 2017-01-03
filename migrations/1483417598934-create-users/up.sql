-- 1483417598934-create-users/up.sql
-- write your new migration here

CREATE TABLE users (
  uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL,
  pw_hash TEXT NOT NULL,

  CONSTRAINT email_unique UNIQUE(email)
);
