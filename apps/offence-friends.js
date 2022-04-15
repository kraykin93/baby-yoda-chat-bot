const { client: db } = require('../db/db');

module.exports = {
  enable(bot) {
    bot.hears(/феделеш/i, async (ctx) => {
      await db.query(`UPDATE public.rating SET counter = counter + 1 WHERE name = 'феделеш';`);
      ctx.reply('пидор (+1)', { reply_to_message_id: ctx.message.message_id });
    });
    bot.hears(/артем|артём/i, (ctx) => {
      const msgs = ['хуй', 'арсен'];
      const i = Math.floor(Math.random() * msgs.length);
      ctx.reply(msgs[i], { reply_to_message_id: ctx.message.message_id });
    });
    bot.hears(/саня|саша|харина/i, (ctx) => {
      const msgs = ['хуй сАси', 'а теперь танцуй'];
      const i = Math.floor(Math.random() * msgs.length);
      ctx.reply(msgs[i], { reply_to_message_id: ctx.message.message_id });
    });
    bot.hears(/юра/i, (ctx) => {
      ctx.reply('красава ветеран', { reply_to_message_id: ctx.message.message_id });
    });
    bot.hears(/толя/i, (ctx) => {
      ctx.reply('красава капитан', { reply_to_message_id: ctx.message.message_id });
    });
    bot.hears(/край/i, (ctx) => {
      const msgs = ['хуй вонючий', 'феделеш, или на хуй'];
      const i = Math.floor(Math.random() * msgs.length);
      ctx.reply(msgs[i], { reply_to_message_id: ctx.message.message_id });
    });
  },
};
