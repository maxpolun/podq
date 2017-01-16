-- searchForPodcasts.sql
-- for now it just returns all

SELECT uuid, name, description, feed_url, hub_url,
            CASE WHEN EXISTS
              (SELECT * FROM subscriptions WHERE subscriptions.user_uuid = ${userUuid}
                                         AND subscriptions.podcast_uuid = podcasts.uuid)
              THEN true ELSE false END
            AS subscribed
  FROM podcasts
    LEFT OUTER JOIN subscriptions ON subscriptions.podcast_uuid = podcasts.uuid;
