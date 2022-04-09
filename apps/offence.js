module.exports = {
  enable(bot) {
    bot.hears(/птн/i, (ctx) => {
      ctx.reply('пнх', { reply_to_message_id: ctx.message.message_id });
    })
    bot.hears(/путин/i, (ctx) => {
      ctx.reply('путин хуйло!\nла-ла-ла-ла-ла-ла-ла-ла!', { reply_to_message_id: ctx.message.message_id });
    })
    bot.hears(/жириновский/i, (ctx) => {
      ctx.reply('земля стекловатой', { reply_to_message_id: ctx.message.message_id });
    })
    bot.hears(/кива/i, (ctx) => {
      ctx.reply('уебан', { reply_to_message_id: ctx.message.message_id });
    })
    bot.hears(/кто пидар/i, (ctx) => {
      const names = ['феделеш', 'саня', 'артем', 'арсен', 'юра', 'толя', 'край']
      const i = Math.floor(Math.random() * names.length);
      ctx.reply(names[i], { reply_to_message_id: ctx.message.message_id });
    })
  }
}
