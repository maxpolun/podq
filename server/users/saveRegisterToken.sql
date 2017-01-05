-- saveRegisterToken.sql
-- save a register token

INSERT INTO register_tokens (email, pw_hash)
       VALUES (${email}, ${pwHash})
       RETURNING uuid, created_at;
