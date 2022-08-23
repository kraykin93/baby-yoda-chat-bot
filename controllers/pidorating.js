const { Markup } = require('telegraf');
const chance = require('chance').Chance();
const model = require('../models/pidorating');
const { parseDays } = require('../utils');

async function onWhoPidor(ctx) {
  const calledId = ctx.message.from.id;
  const { id: currentPidorId } = await model.getCurrentPidor();
  if (currentPidorId !== BigInt(calledId)) {
    if (chance.bool({ likelihood: 50 })) {
      await model.increasePidorSaves(calledId);
    } else {
      await model.updateTotalPidorDuration(calledId, 3600000);
      ctx.reply('ты не удостоенный пидар, лови в ебало +1 час чмо', { reply_to_message_id: ctx.message.message_id });
      return;
    }
  }

  const pidors = await model.getAllPidors();
  const i = chance.integer({ min: 0, max: pidors.length - 1 });
  ctx.reply(pidors[i].name, { reply_to_message_id: ctx.message.message_id });
  await syncPidorDurations({ updateTotal: true });
  await model.increasePidorCounter(pidors[i].id);
  await model.updateCurrentPidor(pidors[i].id);
}

async function onWhoRat(ctx) {
  let pidors = await model.getAllPidors();
  pidors = pidors.sort((a, b) => b.saves - a.saves);
  let name = 'ты';
  if (chance.bool({ likelihood: 75 })) {
    name = pidors[chance.integer({ min: 4, max: 5 })].name;
  } else if (chance.bool({ likelihood: 50 })) {
    name = pidors[chance.integer({ min: 1, max: 3 })].name;
  } else if (chance.bool({ likelihood: 25 })) {
    name = pidors[0].name;
  }
  ctx.reply(`${name} крыса`, { reply_to_message_id: ctx.message.message_id });
}

async function onBotPidor(ctx) {
  ctx.reply('сам пидор', { reply_to_message_id: ctx.message.message_id });
}

async function onCurrentPidor(ctx) {
  const { name, currentDuration } = await syncPidorDurations();
  ctx.reply(`*${name}* удостоен быть пидором уже${parseDays(Number(currentDuration))}`, { parse_mode: 'MarkdownV2' });
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

async function onSpendSaves(ctx) {
  const calledId = ctx.message.from.id;
  const pidors = await model.getAllPidors();
  const { name } = pidors.find(p => p.id === BigInt(calledId));
  const buttons = pidors
    .filter(p => p.id !== BigInt(calledId))
    .map(p => Markup.button.callback(p.name, `pedo_spend_saves ${calledId} ${p.id} ${p.name}`));

  ctx.reply(`${name} хочет попытаться добавить кому-то час, давайте похлопаем этой крысе`,
    Markup
      .inlineKeyboard(buttons, { columns: 2 }),
  );
}

async function onSpendSavesAction(ctx) {
  const callerId = ctx.from.id;
  const keyboardOwner = Number(ctx.match[1]);
  const pidorId = Number(ctx.match[2]);
  const pidorName = ctx.match[3];

  if (callerId !== keyboardOwner) {
    const msg = ['чмо', 'уебан', 'хуесос', 'долбоеб'];
    ctx.answerCbQuery(`это не твои кнопки, ${msg[chance.integer({ min: 1, max: msg.length - 1 })]}`);
  } else {
    ctx.reply(`${pidorName} возможно получил бы час если бы эта фича работала`, { parse_mode: 'MarkdownV2' });
  }
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

module.exports = (bot) => {
  bot.hears(/кто пидар|кто пидор|кто пидрила|кто педор/i, onWhoPidor);
  bot.hears(/кто крыса/i, onWhoRat);
  bot.hears(/бот пидар|пидар бот/i, onBotPidor);
  bot.command('pedo_current', onCurrentPidor);
  bot.command('pedo_rating', onPidorRating);
  bot.command('pedo_saves', onPidorSaves);
  bot.command('pedo_spend_saves', onSpendSaves);
  bot.action(/pedo_spend_saves (.+) (.+) (.+)/, onSpendSavesAction);
  bot.command('pedo_total_duration', onPidorTotalDuration);
  bot.command('pedo_record_duration', onPidorRecordDuration);
};
