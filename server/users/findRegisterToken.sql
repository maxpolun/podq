-- findRegisterToken.sql
-- lookup register token by uuid

SELECT uuid, email, pw_hash, created_at
  FROM register_tokens
  WHERE uuid = ${uuid};
