module.exports = {
  enable(bot) {
    bot.hears(/птн/i, (ctx) => {
      ctx.reply('пнх', { reply_to_message_id: ctx.message.message_id });
    });
    bot.hears(/путин/i, (ctx) => {
      ctx.reply('путин хуйло!\nла-ла-ла-ла-ла-ла-ла-ла!', { reply_to_message_id: ctx.message.message_id });
    });
    bot.hears(/жириновский/i, (ctx) => {
      ctx.reply('земля стекловатой', { reply_to_message_id: ctx.message.message_id });
    });
    bot.hears(/песков/i, (ctx) => {
      ctx.reply('этот ебанат совсем запизделся', { reply_to_message_id: ctx.message.message_id });
    });
    bot.hears(/лукашенко/i, (ctx) => {
      ctx.reply('А я сейчас вам покажу, откуда на Беларусь готовилось нападение...', { reply_to_message_id: ctx.message.message_id });
    });
    bot.hears(/кива/i, (ctx) => {
      ctx.reply('уебан', { reply_to_message_id: ctx.message.message_id });
    });
  },
};
