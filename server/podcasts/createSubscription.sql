-- create subscription

INSERT INTO subscriptions (podcast_uuid, user_uuid)
       VALUES (${podcastUuid}, ${userUuid})
