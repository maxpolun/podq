-- 1483562705480-create-register-token/up.sql
-- write your new migration here

CREATE TABLE register_tokens (
  uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT,
  pw_hash TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
