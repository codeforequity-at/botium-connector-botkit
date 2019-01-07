# Botium Connector for Botkit 

[![NPM](https://nodei.co/npm/botium-connector-botkit.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/botium-connector-botkit/)

[![Codeship Status for codeforequity-at/botium-connector-botkit](https://app.codeship.com/projects/37c8d920-f4bf-0136-7dbf-66214a6dafed/status?branch=master)](https://app.codeship.com/projects/320746)
[![npm version](https://badge.fury.io/js/botium-connector-botkit.svg)](https://badge.fury.io/js/botium-connector-botkit)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()

This is a [Botium](https://github.com/codeforequity-at/botium-core) connector for testing your Botkit chatbot.

__Did you read the [Botium in a Nutshell](https://medium.com/@floriantreml/botium-in-a-nutshell-part-1-overview-f8d0ceaf8fb4) articles ? Be warned, without prior knowledge of Botium you won't be able to properly use this library!__

## How it works ?
Botium uses the [Botkit Anywhere](https://github.com/howdyai/botkit-starter-web) to connect to your chatbot.

It can be used as any other Botium connector with all Botium Stack components:
* [Botium CLI](https://github.com/codeforequity-at/botium-cli/)
* [Botium Bindings](https://github.com/codeforequity-at/botium-bindings/)
* [Botium Box](https://www.botium.at)

## Requirements

* __Node.js and NPM__
* a __Botkit Anywhere Server__
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
      "BOTKIT_SERVER_URL": "..."
    }
  }
}
```
Botium setup is ready, you can begin to write your [BotiumScript](https://github.com/codeforequity-at/botium-core/wiki/Botium-Scripting) files.

## Supported Capabilities

Set the capability __CONTAINERMODE__ to __botkit__ to activate this connector.

### BOTKIT_SERVER_URL
The Botkit server url (without any path, just http/https, servername, port)

### BOTKIT_USERID
If set, this userId will be used. Otherwise, for each convo a new userId is generated.
