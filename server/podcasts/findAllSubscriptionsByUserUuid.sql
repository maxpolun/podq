-- find all subscriptions for a user

SELECT uuid, feed_url, name, description
  FROM podcasts, subscriptions
  WHERE subscriptions.podcast_uuid = ${uuid}
