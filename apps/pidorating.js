const { client: db } = require('../db/db');

module.exports = {
  enable(bot) {
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
