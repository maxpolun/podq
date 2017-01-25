-- find all subscriptions for a user

SELECT podcasts.uuid, podcasts.feed_url, podcasts.name, podcasts.description
  FROM podcasts, subscriptions
  WHERE subscriptions.podcast_uuid = podcasts.uuid
    AND subscriptions.user_uuid = ${uuid}
