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
      ctx.reply('ты не удостоенный пидар, лови в ебало +1 час, чмо', { reply_to_message_id: ctx.message.message_id });
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

  ctx.reply(
    `<b>${name}</b> крыса`,
    { parse_mode: 'HTML' },
    { reply_to_message_id: ctx.message.message_id },
  );
}

async function onBotPidor(ctx) {
  ctx.reply('сам пидор', { reply_to_message_id: ctx.message.message_id });
}

async function onCurrentPidor(ctx) {
  const { name, currentDuration } = await syncPidorDurations();
  ctx.reply(
    `<b>${name}</b> удостоен быть пидором уже${parseDays(Number(currentDuration))}`,
    { parse_mode: 'HTML' },
  );
}

async function onPidorRating(ctx) {
  const pidors = await model.getAllPidors();
  const msg = '<u>Рейтинг</u>' + pidors
    .sort((a, b) => b.counter - a.counter)
    .reduce((prev, current) => prev.concat('\n', `<b>${current.name}</b>: ${current.counter}`), '');
  ctx.reply(msg, { parse_mode: 'HTML' });
}

async function onPidorSaves(ctx) {
  const pidors = await model.getAllPidors();
  const msg = '<u>Рейтинг спасений</u>' + pidors
    .sort((a, b) => b.saves - a.saves)
    .reduce((prev, current) => prev.concat('\n', `<b>${current.name}</b>: ${current.saves}`), '');
  ctx.reply(msg, { parse_mode: 'HTML' });
}

async function onSpendSaves(ctx) {
  const calledId = ctx.message.from.id;
  const pidors = await model.getAllPidors();
  const { name } = pidors.find(p => p.id === BigInt(calledId));
  const buttons = pidors
    .filter(p => p.id !== BigInt(calledId))
    .map(p => Markup.button.callback(p.name, `spend_saves ${calledId} ${p.id} ${p.name}`));

  ctx.reply(
    `<b>${name}</b> хочет попытаться добавить кому-то час, давайте похлопаем этой крысе`,
    { parse_mode: 'HTML', ...Markup.inlineKeyboard(buttons, { columns: 2 }) },
  );
}

async function onSpendSavesAction(ctx) {
  const callerId = ctx.from.id;
  const keyboardOwnerId = Number(ctx.match[1]);
  const chosenPidorId = Number(ctx.match[2]);
  const chosenPidorName = ctx.match[3];

  if (callerId !== keyboardOwnerId) {
    const msg = ['чмо', 'уебан', 'хуесос', 'долбоеб'];
    ctx.answerCbQuery(`это не твои кнопки, ${msg[chance.integer({ min: 1, max: msg.length - 1 })]}`);
  } else {
    if (chance.bool({ likelihood: 50 })) {
      ctx.reply(`<b>${chosenPidorName}</b> возможно получил бы час если бы эта фича работала`, { parse_mode: 'HTML' });
    } else {
      ctx.reply('неудача, лови в ебало +1 час, крыса');
    }
  }
}

async function onPidorRecordDuration(ctx) {
  await syncPidorDurations();
  const pidors = await model.getAllPidors();
  const msg = '<u>Рекордное время</u>' + pidors
    .sort((a, b) => Number(b.record_duration - a.record_duration))
    .reduce((prev, current) => prev.concat('\n', `<b>${current.name}:</b>${parseDays(Number(current.record_duration))}`), '');
  ctx.reply(msg, { parse_mode: 'HTML' });
}

async function onPidorTotalDuration(ctx) {
  const { name, currentDuration } = await syncPidorDurations();
  const pidors = await model.getAllPidors();
  const msg = '<u>Время в тотале</u>' + pidors
    .map((pidor) => {
      if (pidor.name === name) {
        pidor.total_duration += currentDuration;
      }
      return pidor;
    })
    .sort((a, b) => Number(b.total_duration - a.total_duration))
    .reduce((prev, current) => prev.concat('\n', `<b>${current.name}:</b>${parseDays(Number(current.total_duration))}`), '');
  ctx.reply(msg, { parse_mode: 'HTML' });
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
  bot.command('current', onCurrentPidor);
  bot.command('rating', onPidorRating);
  bot.command('saves', onPidorSaves);
  bot.command('spend_saves', onSpendSaves);
  bot.action(/spend_saves (.+) (.+) (.+)/, onSpendSavesAction);
  bot.command('total_duration', onPidorTotalDuration);
  bot.command('record_duration', onPidorRecordDuration);
};
