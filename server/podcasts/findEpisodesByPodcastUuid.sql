-- findEpisodesByPodcastUuid.sql

SELECT uuid,
          podcast_uuid,
          name,
          description,
          released_at,
          author_guid,
          file_url,
          file_format,
          file_length,
          file_duration
    FROM episodes
    WHERE podcast_uuid = ${podcastUuid}
    ORDER BY released_at DESC;
