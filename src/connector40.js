const _ = require('lodash')

const SimpleRestContainer = require('botium-core/src/containers/plugins/SimpleRestContainer')
const CoreCapabilities = require('botium-core/src/Capabilities')

class BotiumConnectorBotkit40 extends SimpleRestContainer {
  constructor ({ queueBotSays, caps }) {
    // default values
    const delegateCaps = {
      [CoreCapabilities.SIMPLEREST_METHOD]: 'POST',
      [CoreCapabilities.SIMPLEREST_BODY_TEMPLATE]: '{ "text": "{{msg.messageText}}", "user": "{{botium.conversationId}}", "type": "message"}',
      [CoreCapabilities.SIMPLEREST_RESPONSE_JSONPATH]: '$.*.text'
    }
    // values delegated direct
    _.forIn(caps, (value, key) => {
      if (key.startsWith('BOTKIT_')) {
        delegateCaps[key.replace('BOTKIT_4_0_', 'SIMPLEREST_')] = value
      } else if (!key.startsWith('SIMPLEREST_')) {
        delegateCaps[key] = value
      }
    })

    super({ queueBotSays, caps: delegateCaps })
  }
}

module.exports = BotiumConnectorBotkit40
