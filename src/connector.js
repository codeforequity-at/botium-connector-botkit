const Capabilities = {
  // ANYWHERE_AND_BOTKIT_0_7_AND_BELOW or BOTKIT_4_0
  BOTKIT_VERSION: 'BOTKIT_VERSION'
}

class BotiumConnectorBotkit {
  constructor ({ queueBotSays, caps }) {
    this.caps = caps
    this.delegateCaps = Object.assign({}, caps)
    this.botkitVersion = caps[Capabilities.BOTKIT_VERSION] || 'ANYWHERE_AND_BOTKIT_0_7_AND_BELOW'
    delete this.delegateCaps[Capabilities.BOTKIT_VERSION]
    // Connector 40 requires core as peer. If its require is optional, then other cases are running without core
    let delegateClass

    switch (this.botkitVersion) {
      case 'ANYWHERE_AND_BOTKIT_0_7_AND_BELOW':
        delegateClass = require('./connector07')
        break
      case 'BOTKIT_4_0':
        delegateClass = require('./connector40')
        break
    }

    if (delegateClass) {
      // eslint-disable-next-line new-cap
      this.delegateConnector = new delegateClass({queueBotSays, caps: this.delegateCaps})
    }
  }

  Validate () {
    if (this.delegateConnector.Validate) {
      return this.delegateConnector.Validate()
    }
  }

  Build () {
    if (this.delegateConnector.Build) {
      return this.delegateConnector.Build()
    }
  }

  Start () {
    if (this.delegateConnector.Start) {
      return this.delegateConnector.Start()
    }
  }

  UserSays (msg) {
    if (this.delegateConnector.UserSays) {
      return this.delegateConnector.UserSays(msg)
    }
  }

  Stop (msg) {
    if (this.delegateConnector.Stop) {
      return this.delegateConnector.Stop(msg)
    }
  }

  Clean (msg) {
    if (this.delegateConnector.Clean) {
      return this.delegateConnector.Clean(msg)
    }
  }
}

module.exports = BotiumConnectorBotkit
