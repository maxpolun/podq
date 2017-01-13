import * as KoaRouter from 'koa-router'
import * as body from 'koa-body'
import {db} from '../pg'
import {createReadStream} from 'fs'
import * as request from 'request'
import {parse, PodcastRecord, EpisodeRecord} from '../podcasts/podcast.model'
import {short2uuid} from '../util/shortId'

function readFile (path: string): NodeJS.ReadableStream {
  return createReadStream(path)
}

export default (router: KoaRouter) => {
  router.get('search-podcasts', '/podcasts', async ctx => {
    ctx.body = await PodcastRecord.search({}, db)
  })

  router.get('podcast-episodes', '/podcasts/:podcastid/episodes', async ctx => {
    let podcastUuid = short2uuid(ctx.params.podcastid)
    ctx.body = await EpisodeRecord.findAllByPodcast(podcastUuid, db)
  })

  router.post('add-podcast', '/podcasts', body({multipart: true}), async ctx => {
    let feedStream: NodeJS.ReadableStream = ctx.request.body.url ?
                                        await request(ctx.request.body.url) :
                                        readFile(ctx.request.body.files[0].path)
    try {
      let feed = await parse(feedStream)
      let podcast = await PodcastRecord.saveIfNew(feed.meta, db)
      let episodes = await EpisodeRecord.saveAll(feed.items, podcast, db)
      ctx.body = {podcast, episodes}
    } catch (e) {
      console.error(e)
    }
  })
}
