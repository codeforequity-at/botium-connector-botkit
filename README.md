# Botium Connector for Botkit 

[![NPM](https://nodei.co/npm/botium-connector-botkit.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/botium-connector-botkit/)

[![Codeship Status for codeforequity-at/botium-connector-botkit](https://app.codeship.com/projects/37c8d920-f4bf-0136-7dbf-66214a6dafed/status?branch=master)](https://app.codeship.com/projects/320746)
[![npm version](https://badge.fury.io/js/botium-connector-botkit.svg)](https://badge.fury.io/js/botium-connector-botkit)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()

This is a [Botium](https://github.com/codeforequity-at/botium-core) connector for testing your Botkit chatbot.

__Did you read the [Botium in a Nutshell](https://medium.com/@floriantreml/botium-in-a-nutshell-part-1-overview-f8d0ceaf8fb4) articles ? Be warned, without prior knowledge of Botium you won't be able to properly use this library!__

## How it works?

This connector calls the webhook URL of botkit. 

This webhook can be there even if your chatbot uses Websocket. You can set it in Botkit constructor:
```
const controller = new Botkit({
  webhook_uri: '/api/messages',
  ...
})
```

There was a major change in Botkit. Botkit Anywhere is deprecated, and core lib version is changed from 0.7 to 4.0. 
Botium supports officially __Botkit Core version 0.7 with Botkit Anywhere__ or 
__Botkit Core version 4.0 with Botkit App created by [Yeoman generator](https://www.npmjs.com/package/generator-botkit)__,
but may work with __Botkit Core version 4.0 with Botkit Anywhere__. 

You can set your Botkit environment using __BOTKIT_VERSION__ capability.

__Botium Botkit Connector 0.0.3 and below works just with the old Botkit stack!!!__

It can be used as any other Botium connector with all Botium Stack components:
* [Botium CLI](https://github.com/codeforequity-at/botium-cli/)
* [Botium Bindings](https://github.com/codeforequity-at/botium-bindings/)
* [Botium Box](https://www.botium.at)


## Requirements

* __Node.js and NPM__
* a __Botkit Anywhere Server__, or __Botkit server created by Yeoman generator__
* a __project directory__ on your workstation to hold test cases and Botium configuration

## Install Botium and Botkit Connector

When using __Botium CLI__:

```
> npm install -g botium-cli
> npm install -g botium-connector-botkit
> botium-cli init
> botium-cli run
```

When using __Botium Bindings__:

```
> npm install -g botium-bindings
> npm install -g botium-connector-botkit
> botium-bindings init mocha
> npm install && npm run mocha
```

When using __Botium Box__:

_Already integrated into Botium Box, no setup required_

## Connecting your Botkit server to Botium

Open the file _botium.json_ in your working directory and add the Botkit chatbot connection settings.

```
{
  "botium": {
    "Capabilities": {
      "PROJECTNAME": "<whatever>",
      "CONTAINERMODE": "botkit",
      "BOTKIT_VERSION": "BOTKIT_4_0",
      "BOTKIT_URL": "..."
    }
  }
}
```
Botium setup is ready, you can begin to write your [BotiumScript](https://github.com/codeforequity-at/botium-core/wiki/Botium-Scripting) files.

## Supported Capabilities

Set the capability __CONTAINERMODE__ to __botkit__ to activate this connector.

### BOTKIT_VERSION
Default: 

```ANYWHERE_AND_BOTKIT_0_7_AND_BELOW```

Botkit stack. Set it to ```BOTKIT_4_0``` to use the new. 
The two versions are using different capabilities, see below. 

### BOTKIT_4_0_SERVER_URL
__Just for new Botkit stack!!!__

Botkit server webhook URL. The only required capability using the new stack

### BOTKIT_4_0_...
Just for new Botkit stack!!!

You can use all other _Generic HTTP(S)/JSON Connector_ capabilities. 
For example via __BOTKIT_4_0_HEADERS_TEMPLATE__ you can use __SIMPLEREST_HEADERS_TEMPLATE__ capability to customize the HTTP header.

There is a [sample](./samples/botkit40/test) using the [UPDATE_CUSTOM logic hook](https://botium.atlassian.net/wiki/spaces/BOTIUM/pages/48660497/Integrated+Logic+Hooks) and the __BOTKIT_4_0_BODY_TEMPLATE__ capability to use custom user ids.

### BOTKIT_SERVER_URL
__Just for old Botkit stack!!!__

The Botkit server url (without any path, just http/https, servername, port)

### BOTKIT_USERID
__Just for old Botkit stack!!!__

If set, this userId will be used. Otherwise, for each convo a new userId is generated.
