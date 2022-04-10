const { client: db } = require('../db/db');

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
    bot.hears(/лукашенко/i, (ctx) => {
      ctx.reply('А я сейчас вам покажу, откуда на Беларусь готовилось нападение...', { reply_to_message_id: ctx.message.message_id });
    });
    bot.hears(/кива/i, (ctx) => {
      ctx.reply('уебан', { reply_to_message_id: ctx.message.message_id });
    });
    bot.hears(/кто пидар/i, async (ctx) => {
      const { rows: names } = await db.query('SELECT * FROM public.rating;');
      const i = Math.floor(Math.random() * names.length);
      await db.query(`UPDATE public.rating SET counter = counter + 1 WHERE name = '${names[i].name}';`);
      ctx.reply(names[i].name, { reply_to_message_id: ctx.message.message_id });
    });
    bot.command('pidorating', async (ctx) => {
      const { rows: names } = await db.query('SELECT * FROM public.rating;');
      const msg = names.reduce((prev, current) => prev.concat('\n', `${current.name}: ${current.counter}`), '')
      ctx.reply(msg);
    });
  },
};
