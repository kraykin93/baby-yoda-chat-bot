const moment = require('moment');
const chance = require('chance').Chance();
const { client: db } = require('../db/db');

async function onWhoPidor(ctx) {
  const { rows: names } = await db.query('SELECT * FROM public.rating;');
  const i = chance.integer({ min: 0, max: names.length - 1 });
  await db.query(`UPDATE public.rating SET counter = counter + 1 WHERE name = '${names[i].name}';`);
  await db.query(`UPDATE public.last SET name = '${names[i].name}', date = '${Date.now()}';`);
  ctx.reply(names[i].name, { reply_to_message_id: ctx.message.message_id });
}

async function onPidorating(ctx) {
  const { rows: names } = await db.query('SELECT * FROM public.rating;');
  const msg = names
    .sort((a, b) => b.counter - a.counter)
    .reduce((prev, current) => prev.concat('\n', `${current.name}: ${current.counter}`), '');
  ctx.reply(msg);
}

async function onLastPidor(ctx) {
  const { rows } = await db.query('SELECT * FROM public.last;');
  const diff = new moment.duration(Date.now() - Number(rows[0].date));
  ctx.reply(`*${rows[0].name}* удостоен быть пидором уже ${Math.floor(diff.asDays())} дней, ${Math.floor(diff.asHours())} часов, ${Math.floor(diff.asMinutes())} минут`, { parse_mode: "MarkdownV2" });
}

module.exports = (bot) => {
  bot.hears(/кто пидар|кто пидор/i, onWhoPidor);
  bot.command('pidorating', onPidorating);
  bot.command('lastpidor', onLastPidor);
};
