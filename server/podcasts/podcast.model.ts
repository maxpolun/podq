import * as FeedParser from 'feedparser'
import {uniq} from 'lodash'
import {Db, sqlFile} from '../pg'
import {podcastRoute, episodesRoute} from '../../config/routes'

export class Podcast {
  constructor (public name: string,
               public description: string,
               public feedUrl: string,
               public hubUrl: string|undefined) {}

  static fromFeed (feed) {
    let link = parseLinkTags(feed)
    return new Podcast(
      feed.title,
      feed.description,
      link.self,
      link.hub
    )
  }
}

let saveIfNewPodcast = sqlFile(__dirname, 'saveIfNewPodcast.sql')
let searchForPodcasts = sqlFile(__dirname, 'searchForPodcasts.sql')

export class PodcastRecord {
  constructor (public uuid: string, public podcast: Podcast) {}

  static saveIfNew (podcast: Podcast, db: Db): Promise<PodcastRecord> {
    return db.one(saveIfNewPodcast, podcast).then(result => new PodcastRecord(result.uuid, podcast))
  }

  static search(searchParams: {}, db: Db): Promise<PodcastRecord[]> {
    return db.many(searchForPodcasts, searchParams)
             .then(podcasts => podcasts.map(PodcastRecord.fromRow))
  }

  static fromRow(row): PodcastRecord {
    return new PodcastRecord(row.uuid, new Podcast(
      row.name,
      row.description,
      row.feed_url,
      row.hub_url
    ))
  }

  toJSON () {
    return {
      uuid: this.uuid,
      selfUrl: podcastRoute(this.uuid),
      episodesUrl: episodesRoute(this.uuid),
      ... this.podcast
    }
  }
}

export class Episode {
  constructor (public name: string,
               public description: string,
               public releasedAt: Date,
               public authorGuid: string,
               public fileUrl: string,
               public fileFormat: string,
               public fileLength: number,
               public fileDuration: string) {}

  static fromFeedItem (itemJson) {
    let enc = itemJson.enclosures[0]
    return new Episode(
      itemJson.title,
      itemJson.description,
      itemJson.pubDate,
      itemJson.guid,
      enc.url,
      enc.type,
      enc.length,
      itemJson['itunes:duration']['#']
    )
  }
}

let saveIfNewEpisode = sqlFile(__dirname, 'saveIfNewEpisode.sql')
let findEpisodesByPodcastUuid = sqlFile(__dirname, 'findEpisodesByPodcastUuid.sql')

export class EpisodeRecord {
  constructor (public uuid: string, public podcastUuid: string, public episode: Episode) {}

  static saveAll(episodes: Episode[], podcast: PodcastRecord, db: Db): Promise<EpisodeRecord[]> {
    let records: EpisodeRecord[] = []
    return db.tx(t => {
      return t.sequence(i => {
        if (i >= episodes.length) { return }
        let saveRecord = {podcastUuid: podcast.uuid, ...episodes[i]}
        return t.one(saveIfNewEpisode, saveRecord)
         .then(result => {
           records.push(new EpisodeRecord(result.uuid, podcast.uuid, episodes[i]))
           return true
          })
      })
    }).then(() => records)
  }

  static findAllByPodcast(podcastUuid: string, db: Db): Promise<EpisodeRecord[]> {
    return db.many(findEpisodesByPodcastUuid, {podcastUuid})
             .then(episodes => episodes.map(EpisodeRecord.fromRow))
  }

  static fromRow(row): EpisodeRecord {
    return new EpisodeRecord(
      row.uuid,
      row.podcast_uuid,
      new Episode(
        row.name,
        row.description,
        row.released_at,
        row.author_guid,
        row.file_url,
        row.file_format,
        row.file_length,
        row.file_duration
      )
    )
  }

  toJSON () {
    return {
      uuid: this.uuid,
      podcastUuid: this.podcastUuid,
      ... this.episode
    }
  }
}

function parseLinkTags (feed) {
  let namespaces = findNs(feed, 'http://www.w3.org/2005/Atom')
  let tags = findAllTags(feed, namespaces, 'link')
  let link: any = {}

  if (tags) {
    tags.map(tag => tag['@']).forEach(tag => {
      link[tag.rel] = tag.href.replace(/'/g, '')
    })
  }

  return link
}

function toPair (obj) {
  let key = Object.keys(obj)[0]
  return [key, obj[key]]
}

function findNs (feedJson, url) {
  return uniq(feedJson['#ns']
            .map(toPair)
            .filter(pair => pair[1] === url)
            .map(pair => pair[0].replace('xmlns:', '')))
}

function findAllTags (feedJson, namespaces, tagname) {
  let tags: any[] = []
  namespaces.forEach(ns => {
    let tag = feedJson[ns + ':' + tagname]
    if (tag) {
      if (tag instanceof Array) {
        tags = tags.concat(tag)
      } else {
        tags.push(tag)
      }
    }
  })
  return tags
}

export interface Feed {
  meta: Podcast,
  items: Episode[]
}

export function parse (inputStream: NodeJS.ReadableStream): Promise<Feed> {
  return new Promise((resolve, reject) => {
    let parser = new FeedParser()
    let items: any[] = []
    inputStream.pipe(parser)

    parser.on('error', err => {
      reject(err)
    })
    parser.on('readable', () => {
      let item = parser.read()
      while (item) {
        items.push(item)
        item = parser.read()
      }
    })
    parser.on('end', () => {
      resolve({
        meta: Podcast.fromFeed(parser.meta),
        items: items.map(Episode.fromFeedItem)
      })
    })
  })
}
