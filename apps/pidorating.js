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

async function onPidorRating(ctx) {
  const { rows: persons } = await db.query('SELECT * FROM public.rating;');
  const msg = persons
    .sort((a, b) => b.counter - a.counter)
    .reduce((prev, current) => prev.concat('\n', `${current.name}: ${current.counter}`), '');
  ctx.reply(msg);
}

async function onPidorDuration(ctx) {
  await updateLastPidorDuration();
  const { rows: persons } = await db.query('SELECT * FROM public.rating;');
  const msg = persons
    .sort((a, b) => b.duration - a.duration)
    .reduce((prev, current) => prev.concat('\n', `${current.name}: ${parseDays(current.duration)}`), '');
  ctx.reply(msg);
}

async function updateLastPidorDuration() {
  const { rows } = await db.query('SELECT * FROM public.last;');
  const { rows: duration } = await db.query(`SELECT duration FROM public.rating WHERE name = '${rows[0].name}';`);
  const diff = Date.now() - Number(rows[0].date);

  if (duration[0].duration < diff) {
    await db.query(`UPDATE public.rating SET duration = ${diff} WHERE name = '${rows[0].name}';`);
  }

  return { name: rows[0].name, diff };
}

async function onLastPidor(ctx) {
  const { name, diff } = await updateLastPidorDuration();
  console.log({ name, diff });
  ctx.reply(`*${name}* удостоен быть пидором уже${parseDays(diff)}`, { parse_mode: 'MarkdownV2' });
}

module.exports = (bot) => {
  bot.hears(/кто пидар|кто пидор|кто пидрила|кто пидорас/i, onWhoPidor);
  bot.command('pidorating', onPidorRating);
  bot.command('pidoduration', onPidorDuration);
  bot.command('lastpidor', onLastPidor);
};
