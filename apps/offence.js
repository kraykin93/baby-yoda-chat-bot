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
    bot.hears(/медведев/i, (ctx) => {
      ctx.reply('денег нет! но вы держитесь!', { reply_to_message_id: ctx.message.message_id });
    });
    bot.hears(/лукашенко/i, (ctx) => {
      ctx.replyWithPhoto({ source: 'assets/img/usach.png' }, { reply_to_message_id: ctx.message.message_id });
    });
    bot.hears(/кива/i, (ctx) => {
      ctx.reply('кива уебан', { reply_to_message_id: ctx.message.message_id });
    });
  },
};
