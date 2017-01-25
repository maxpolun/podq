export interface Podcast {
  uuid: string
  name: string
  description: string
  feedUrl: string
  hubUrl: string|undefined
  subscribed: boolean
}
