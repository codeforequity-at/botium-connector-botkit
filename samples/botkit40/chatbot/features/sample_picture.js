/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

module.exports = function (controller) {
  controller.hears('picture', 'message', async (bot, message) => {
    await bot.reply(message, {
      text: 'Look, an image!',
      files: [
        {
          url: 'http://tableflipper.com/IRX2.gif',
          image: true
        }
      ]
    })
  })
}
