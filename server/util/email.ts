import {env} from '../../config'

class FakeEmailServer {

  async send (email: string, text: string): Promise<{}> {
    console.log(`send email to ${email} with text\n${text}`)
    return Promise.resolve({})
  }

}

let server = new FakeEmailServer()

export function send (email: string, text: string): Promise<{}> {
  return server.send(email, text)
}
