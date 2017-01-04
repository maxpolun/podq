-- Find user by email

SELECT uuid, email, pw_hash FROM users WHERE email = ${email};
