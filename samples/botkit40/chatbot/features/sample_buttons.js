/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

module.exports = function (controller) {
  controller.hears('buttons', 'message', async (bot, message) => {
    await bot.reply(message, {
      text: 'Look, quick replies!',
      quick_replies: [
        {
          title: 'Hello',
          payload: 'hello'
        },
        {
          title: 'Help',
          payload: 'help'
        }
      ]
    })
  })
}
