module.exports = {
  enable(bot) {
    bot.hears(/птн/i, (ctx) => {
      ctx.reply('пнх', { reply_to_message_id: ctx.message.message_id });
    })
    bot.hears(/путин/i, (ctx) => {
      ctx.reply('хуйло', { reply_to_message_id: ctx.message.message_id });
    })
    bot.hears(/кива/i, (ctx) => {
      ctx.reply('уебан', { reply_to_message_id: ctx.message.message_id });
    })
  }
}
