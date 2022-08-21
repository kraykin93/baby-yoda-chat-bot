const chance = require('chance').Chance();
const model = require('../models/pidorating');
const { parseDays } = require('../utils');

async function onWhoPidor(ctx) {
  const { id } = await model.getCurrentPidor();
  if (id !== BigInt(ctx.message.from.id)) {
    if (chance.bool({ likelihood: 50 })) {
      await model.updatePidorSaves(ctx.message.from.id);
    } else {
      await model.updateTotalPidorDuration(ctx.message.from.id, 3600000);
      return ctx.reply('ты не последний пидар, лови в ебало +1 час чмо', { reply_to_message_id: ctx.message.message_id });
    }
  }

  const pidors = await model.getAllPidors();
  const i = chance.integer({ min: 0, max: pidors.length - 1 });
  ctx.reply(pidors[i].name, { reply_to_message_id: ctx.message.message_id });
  await syncPidorDurations({ updateTotal: true });
  await model.updatePidorCounter(pidors[i].name);
  await model.updateCurrentPidor(pidors[i].name, pidors[i].id);
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

async function onPidorSaves(ctx) {
  const pidors = await model.getAllPidors();
  const msg = '__Рейтинг спасений__' + pidors
    .sort((a, b) => b.saves - a.saves)
    .reduce((prev, current) => prev.concat('\n', `*${current.name}*: ${current.saves}`), '');
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

async function onCurrentPidor(ctx) {
  const { name, currentDuration } = await syncPidorDurations();
  ctx.reply(`*${name}* удостоен быть пидором уже${parseDays(Number(currentDuration))}`, { parse_mode: 'MarkdownV2' });
}

async function syncPidorDurations({ updateTotal } = {}) {
  const { id, name, start_date, record_duration } = await model.getCurrentPidor();
  const currentDuration = BigInt(Date.now()) - start_date;

  if (record_duration < currentDuration) {
    await model.updateRecordPidorDuration(id, currentDuration);
  }

  if (updateTotal) {
    await model.updateTotalPidorDuration(id, currentDuration);
  }

  return { name, currentDuration };
}

async function onWhoRat(ctx) {
  let name = 'феделеш';
  if (chance.bool({ likelihood: 10 })) {
    name = ['саня', 'юра', 'артем', 'край', 'толя'][chance.integer({ min: 0, max: 4 })];
  }
  ctx.reply(`${name} крыса`, { reply_to_message_id: ctx.message.message_id });
}

module.exports = (bot) => {
  bot.hears(/кто пидар|кто пидор|кто пидрила|кто педор/i, onWhoPidor);
  bot.hears(/бот пидар|пидар бот/i, onBotPidor);
  bot.hears(/кто крыса/i, onWhoRat);
  bot.command('pedo_current', onCurrentPidor);
  bot.command('pedo_rating', onPidorRating);
  bot.command('pedo_total_duration', onPidorTotalDuration);
  bot.command('pedo_saves', onPidorSaves);
  bot.command('pedo_record_duration', onPidorRecordDuration);
};
