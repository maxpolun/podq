-- Find user by uuid

SELECT uuid, email, pw_hash FROM users WHERE uuid = ${uuid};
