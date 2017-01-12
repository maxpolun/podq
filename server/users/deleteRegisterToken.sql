-- deleteRegisterToken.sql

DELETE FROM register_tokens WHERE uuid = ${uuid}
