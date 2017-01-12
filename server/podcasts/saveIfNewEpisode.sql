-- saveIfNewEpisode.sql

INSERT INTO episodes (
            podcast_uuid,
            name,
            description,
            released_at,
            author_guid,
            file_url,
            file_format,
            file_length,
            file_duration
      ) VALUES (
            ${podcastUuid},
            ${name},
            ${description},
            ${releasedAt},
            ${authorGuid},
            ${fileUrl},
            ${fileFormat},
            ${fileLength},
            ${fileDuration}
      )
      ON CONFLICT (podcast_uuid, author_guid) DO UPDATE
            SET
                  name = EXCLUDED.name,
                  description = EXCLUDED.description,
                  released_at = EXCLUDED.released_at,
                  file_url = EXCLUDED.file_url,
                  file_length = EXCLUDED.file_length
      RETURNING uuid;
