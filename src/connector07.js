const util = require('util')
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

  async Start () {
    debug('Start called')

    if (this.caps[Capabilities.BOTKIT_USERID]) {
      this.userId = this.caps[Capabilities.BOTKIT_USERID]
    } else {
      this.userId = uuidv4()
    }

    const pingUrl = this.caps[Capabilities.BOTKIT_SERVER_URL]

    try {
      const response = await fetch(pingUrl, { method: 'GET' })

      if (!response.ok) {
        const errorMessage = `url check ${pingUrl} got error response: ${response.status}/${response.statusText}`
        debug(errorMessage)
        throw new Error(errorMessage)
      }

      debug(`success on url check ${pingUrl}`)
    } catch (err) {
      const errorMessage = `error on url check ${pingUrl}: ${err.message}`
      debug(errorMessage)
      throw err
    }
  }

  UserSays (msg) {
    debug(`UserSays called ${util.inspect(msg)}`)
    return this._doRequest(msg)
  }

  Stop () {
    debug('Stop called')
    this.userId = null
  }

  async _doRequest (msg) {
    try {
      const requestOptions = this._buildRequest(msg)
      debug(`constructed requestOptions ${JSON.stringify(requestOptions, null, 2)}`)

      const response = await fetch(requestOptions.uri, requestOptions)

      if (!response.ok) {
        debug(`got error response: ${response.status}/${response.statusText}`)
        throw new Error(`got error response: ${response.status}/${response.statusText}`)
      }

      const body = await response.json()
      if (!body) {
        return
      }
      // Process the response
      debug(`got response body: ${JSON.stringify(body, null, 2)}`)

      const botMsg = { sourceData: body }

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

      return
    } catch (err) {
      throw new Error(`rest request failed: ${util.inspect(err)}`)
    }
  }

  _buildRequest (msg) {
    const uri = `${this.caps[Capabilities.BOTKIT_SERVER_URL]}/botkit/receive`

    return {
      uri,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        text: msg.messageText,
        user: this.userId,
        channel: 'webhook'
      })
    }
  }
}

module.exports = BotiumConnectorBotkit07
