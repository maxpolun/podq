import {baseUrl} from './index'
import {uuid2short} from '../server/util/shortId'

let base = `${baseUrl}api`

export let loginRoute = `${base}/login`
export let registerRoute = `${base}/register`
export let userRoute = (userUuid: string): string => `${base}/users/${uuid2short(userUuid)}`
export let subscriptionsRoute = (userUuid: string): string => `${userRoute(userUuid)}/subscriptions`
export let queueRoute = (userUuid: string): string => `${userRoute(userUuid)}/queue`

export let podcastsSearchRoute = `${base}/podcasts`
export let podcastRoute = (podcastUuid: string): string => `${base}/podcasts/${uuid2short(podcastUuid)}`
export let episodesRoute = (podcastUuid: string): string => `${podcastRoute(podcastUuid)}/episodes`
