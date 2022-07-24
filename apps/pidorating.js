const moment = require('moment');
const chance = require('chance').Chance();
const { client: db } = require('../db/db');
const { parseDays } = require('../utils');

async function onWhoPidor(ctx) {
  const { rows: persons } = await db.query('SELECT * FROM public.rating;');
  const i = chance.integer({ min: 0, max: persons.length - 1 });
  await db.query(`UPDATE public.rating SET counter = counter + 1 WHERE name = '${persons[i].name}';`);
  await db.query(`UPDATE public.last SET name = '${persons[i].name}', date = '${Date.now()}';`);
  ctx.reply(persons[i].name, { reply_to_message_id: ctx.message.message_id });
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
  const { rows: duration } = await db.query(`SELECT duration FROM public.rating WHERE name = '${rows[0].name}';`);
  const diff = Date.now() - Number(rows[0].date);
  if (duration[0].duration < diff) {
    await db.query(`UPDATE public.rating SET duration = ${diff} WHERE name = '${rows[0].name}';`);
  }
  const m = new moment.duration(diff);
  ctx.reply(`*${rows[0].name}* удостоен быть пидором уже${parseDays(m)}`, { parse_mode: 'MarkdownV2' });
}

module.exports = (bot) => {
  bot.hears(/кто пидар|кто пидор/i, onWhoPidor);
  bot.command('pidorating', onPidorating);
  bot.command('lastpidor', onLastPidor);
};
