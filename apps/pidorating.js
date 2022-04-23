const chance = require('chance').Chance();
const { client: db } = require('../db/db');

async function onWhoPidor(ctx) {
  const { rows: names } = await db.query('SELECT * FROM public.rating;');
  const i = chance.integer({ min: 0, max: names.length - 1 });
  await db.query(`UPDATE public.rating SET counter = counter + 1 WHERE name = '${names[i].name}';`);
  ctx.reply(names[i].name, { reply_to_message_id: ctx.message.message_id });
}

async function onPidorating(ctx) {
  const { rows: names } = await db.query('SELECT * FROM public.rating;');
  const msg = names
    .sort((a, b) => b.counter - a.counter)
    .reduce((prev, current) => prev.concat('\n', `${current.name}: ${current.counter}`), '');
  ctx.reply(msg);
}

module.exports = (bot) => {
  bot.hears(/кто пидар|кто пидор/i, onWhoPidor);
  bot.command('pidorating', onPidorating);
};
