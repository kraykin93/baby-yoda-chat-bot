const chance = require('chance').Chance();
const model = require('../models/pidorating');
const { parseDays } = require('../utils');

async function onWhoPidor(ctx) {
  console.log(ctx.message.from);
  const pidors = await model.getAllPidors();
  const i = chance.integer({ min: 0, max: pidors.length - 1 });
  ctx.reply(pidors[i].name, { reply_to_message_id: ctx.message.message_id });
  await syncPidorDurations({ updateTotal: true });
  await model.updatePidorCounter(pidors[i].name);
  await model.updateLastPidor(pidors[i].name, ctx.message.from.id);
}

async function onBotPidor(ctx) {
  ctx.reply('сам пидор', { reply_to_message_id: ctx.message.message_id });
}

async function onPidorRating(ctx) {
  const pidors = await model.getAllPidors();
  const msg = '__Рейтинг__' + pidors
    .sort((a, b) => b.counter - a.counter)
    .reduce((prev, current) => prev.concat('\n', `*${current.name}*: ${current.counter}`), '');
  ctx.reply(msg, { parse_mode: 'MarkdownV2' });
}

async function onPidorRecordDuration(ctx) {
  await syncPidorDurations();
  const pidors = await model.getAllPidors();
  const msg = '__Рекордное время__' + pidors
    .sort((a, b) => Number(b.record_duration - a.record_duration))
    .reduce((prev, current) => prev.concat('\n', `*${current.name}:*${parseDays(Number(current.record_duration))}`), '');
  ctx.reply(msg, { parse_mode: 'MarkdownV2' });
}

async function onPidorTotalDuration(ctx) {
  const { name, currentDuration } = await syncPidorDurations();
  const pidors = await model.getAllPidors();
  const msg = '__Время в тотале__' + pidors
    .map((pidor) => {
      if (pidor.name === name) {
        pidor.total_duration += currentDuration;
      }
      return pidor;
    })
    .sort((a, b) => Number(b.total_duration - a.total_duration))
    .reduce((prev, current) => prev.concat('\n', `*${current.name}:*${parseDays(Number(current.total_duration))}`), '');
  ctx.reply(msg, { parse_mode: 'MarkdownV2' });
}

async function onLastPidor(ctx) {
  const { name, currentDuration } = await syncPidorDurations();
  ctx.reply(`*${name}* удостоен быть пидором уже${parseDays(Number(currentDuration))}`, { parse_mode: 'MarkdownV2' });
}

async function syncPidorDurations({ updateTotal } = {}) {
  const { name, start_date, record_duration, total_duration } = await model.getLastPidor();
  const currentDuration = BigInt(Date.now()) - start_date;

  if (record_duration < currentDuration) {
    await model.updateRecordPidorDuration(name, currentDuration);
  }

  if (updateTotal) {
    await model.updateTotalPidorDuration(name, total_duration + currentDuration);
  }

  return { name, currentDuration };
}

module.exports = (bot) => {
  bot.hears(/кто пидар|кто пидор|кто пидрила/i, onWhoPidor);
  bot.hears(/бот пидар|пидар бот/i, onBotPidor);
  bot.command('pedo_rating', onPidorRating);
  bot.command('pedo_last', onLastPidor);
  bot.command('pedo_record_duration', onPidorRecordDuration);
  bot.command('pedo_total_duration', onPidorTotalDuration);
};
