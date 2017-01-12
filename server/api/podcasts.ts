import * as KoaRouter from 'koa-router'
import * as body from 'koa-body'
import {db} from '../pg'
import {createReadStream} from 'fs'
import {get as getCB, IncomingMessage} from 'http'
import {parse, PodcastRecord, EpisodeRecord} from '../podcasts/podcast.model'

function get(url): Promise<IncomingMessage> {
  return new Promise(resolve => {
    getCB(url, resolve)
  })
}

function readFile (path: string): NodeJS.ReadableStream {
  return createReadStream(path)
}

function readUrl(url: string): Promise<NodeJS.ReadableStream> {
  return get(url).then(res => {
    if (res.statusCode < 200 || res.statusCode >= 300) {
      throw new Error('unsuccessfull get')
    }
    return res
  })
}

export default (router: KoaRouter) => {
  router.post('create-podcasts', '/podcasts', body({multipart: true}), async ctx => {
    let feedStream: NodeJS.ReadableStream = ctx.request.body.url ?
                                        await readUrl(ctx.request.body.url) :
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
