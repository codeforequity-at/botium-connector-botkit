const util = require('util')
const request = require('request')
const uuidv4 = require('uuid/v4')
const debug = require('debug')('botium-connector-botkit07')

const Capabilities = {
  BOTKIT_SERVER_URL: 'BOTKIT_SERVER_URL',
  BOTKIT_USERID: 'BOTKIT_USERID'
}

class BotiumConnectorBotkit07 {
  constructor ({ queueBotSays, caps }) {
    this.queueBotSays = queueBotSays
    this.caps = caps
    this.userId = null
  }

  Validate () {
    debug('Validate called')

    if (!this.caps[Capabilities.BOTKIT_SERVER_URL]) throw new Error('BOTKIT_SERVER_URL capability required')

    return Promise.resolve()
  }

  Start () {
    debug('Start called')

    if (this.caps[Capabilities.BOTKIT_USERID]) {
      this.userId = this.caps[Capabilities.BOTKIT_USERID]
    } else {
      this.userId = uuidv4()
    }

    const pingUrl = this.caps[Capabilities.BOTKIT_SERVER_URL]
    return new Promise((resolve, reject) => {
      request({
        uri: pingUrl,
        method: 'GET'
      }, (err, response, body) => {
        if (err) {
          [debug, reject].forEach(fn => fn(`error on url check ${pingUrl}: ${err}`))
        } else if (response.statusCode >= 400) {
          [debug, reject].forEach(fn => fn(`url check ${pingUrl} got error response: ${response.statusCode}/${response.statusMessage}`))
        } else {
          debug(`success on url check ${pingUrl}`)
          resolve()
        }
      })
    })
  }

  UserSays (msg) {
    debug(`UserSays called ${util.inspect(msg)}`)
    return this._doRequest(msg)
  }

  Stop () {
    debug('Stop called')
    this.userId = null
  }

  _doRequest (msg) {
    return new Promise((resolve, reject) => {
      const requestOptions = this._buildRequest(msg)
      debug(`constructed requestOptions ${JSON.stringify(requestOptions, null, 2)}`)

      request(requestOptions, (err, response, body) => {
        if (err) {
          reject(new Error(`rest request failed: ${util.inspect(err)}`))
        } else {
          if (response.statusCode >= 400) {
            debug(`got error response: ${response.statusCode}/${response.statusMessage}`)
            return reject(new Error(`got error response: ${response.statusCode}/${response.statusMessage}`))
          }
          resolve(this)

          if (body) {
            debug(`got response body: ${JSON.stringify(body, null, 2)}`)

            const botMsg = {
              sourceData: body
            }

            if (body.text) {
              botMsg.messageText = body.text
            }
            if (body.quick_replies) {
              botMsg.buttons = body.quick_replies.map(q => ({
                text: q.title,
                payload: q.payload
              }))
            }
            if (body.files) {
              botMsg.media = body.files.map(f => ({
                mediaUri: f.url
              }))
            }
            setTimeout(() => this.queueBotSays(botMsg), 0)
          }
        }
      })
    })
  }

  _buildRequest (msg) {
    const uri = `${this.caps[Capabilities.BOTKIT_SERVER_URL]}/botkit/receive`

    const requestOptions = {
      uri,
      method: 'POST',
      json: true,
      body: {
        text: msg.messageText,
        user: this.userId,
        channel: 'webhook'
      }
    }
    return requestOptions
  }
}

module.exports = BotiumConnectorBotkit07
