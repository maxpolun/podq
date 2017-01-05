import * as short from 'short-uuid'
let translator = short('123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ_-~')

export function short2uuid (shortId: string): string {
  return translator.toUUID(shortId)
}

export function uuid2short (uuid: string): string {
  return translator.fromUUID(uuid)
}
