const { client: db } = require('../db/db');

module.exports = {
  enable(bot) {
    bot.hears(/феделеш/i, async (ctx) => {
      await db.query(`UPDATE public.rating SET counter = counter + 1 WHERE name = 'феделеш';`);
      ctx.reply('ф пидор (+1)', { reply_to_message_id: ctx.message.message_id });
    });
    bot.hears(/артем|артём/i, (ctx) => {
      const msgs = ['артем хуй', 'арсен'];
      const i = Math.floor(Math.random() * msgs.length);
      ctx.reply(msgs[i], { reply_to_message_id: ctx.message.message_id });
    });
    bot.hears(/саня|саша|харина/i, (ctx) => {
      const msgs = ['саня хуй сАси', 'саня а теперь танцуй'];
      const i = Math.floor(Math.random() * msgs.length);
      ctx.reply(msgs[i], { reply_to_message_id: ctx.message.message_id });
    });
    bot.hears(/юра/i, (ctx) => {
      ctx.reply('/юра красава ветеран', { reply_to_message_id: ctx.message.message_id });
    });
    bot.hears(/толя/i, (ctx) => {
      ctx.reply('толя красава капитан', { reply_to_message_id: ctx.message.message_id });
    });
    bot.hears(/край/i, (ctx) => {
      const msgs = ['край хуй вонючий', 'феделеш, иди на хуй'];
      const i = Math.floor(Math.random() * msgs.length);
      ctx.reply(msgs[i], { reply_to_message_id: ctx.message.message_id });
    });
  },
};
