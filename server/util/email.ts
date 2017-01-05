import {sendgridApiKey} from '../../config'
import * as SendGrid from 'sendgrid'
let {Email, Content, Mail} = SendGrid.mail

interface EmailSender {
  send(email: string, subject: string, text: string): Promise<any>
}

class FakeEmailSender {
  async send (email: string, subject: string, text: string): Promise<any> {
    console.log(`send email to ${email} with text\nsubject: ${subject}\n${text}`)
    return {}
  }
}

class SendgridEmailSender {
  private sg
  constructor (private key: string, private fromEmail: string) {
    this.sg = SendGrid(key)
  }

  send(email: string, subject: string, text: string): Promise<any> {
    let mail = new Mail(
      new Email(this.fromEmail),
      subject,
      new Email(email),
      new Content('text/plain', text)
    )
    console.log('sending', mail.toJSON())
    let req = this.sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON()
    })
    return this.sg.API(req).then(res => {
      console.log('email send status: ', res.statusCode)
      console.log('email send body: ', res.body)
      console.log('email send headers: ', res.headers)
    })
  }
}

let server: EmailSender = sendgridApiKey ?
                            new SendgridEmailSender(sendgridApiKey, 'noreply@podqueue.com') :
                            new FakeEmailSender()

export function send (email: string, subject: string, text: string): Promise<{}> {
  return server.send(email, subject, text)
}
