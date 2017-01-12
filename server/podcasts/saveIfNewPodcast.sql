-- saveIfNewPodcast.sql

INSERT INTO podcasts (feed_url, hub_url, name, description)
      VALUES (${feedUrl}, ${hubUrl}, ${name}, ${description})
      ON CONFLICT (feed_url) DO UPDATE
                        SET
                              name = EXCLUDED.name,
                              description = EXCLUDED.description
      RETURNING uuid;
