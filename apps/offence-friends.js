const chance = require('chance').Chance();
const { client: db } = require('../db/db');

async function onFedelesh(ctx, next) {
  const { rows } = await db.query(`UPDATE public.rating SET counter = counter + 1 WHERE name = 'феделеш' RETURNING counter;`);
  ctx.reply(`ф пидор уже ${rows[0].counter - 1} раз(а) и еще + 1`, { reply_to_message_id: ctx.message.message_id });
  next();
}

function onArtem(ctx, next) {
  const msgs = ['артем хуй', 'арсен'];
  const i = chance.integer({ min: 0, max: msgs.length - 1 });
  ctx.reply(msgs[i], { reply_to_message_id: ctx.message.message_id });
  next();
}

function onSasha(ctx, next) {
  const msgs = ['саня, хуй сАси', 'саня, а теперь танцуй'];
  const i = chance.integer({ min: 0, max: msgs.length - 1 });
  ctx.reply(msgs[i], { reply_to_message_id: ctx.message.message_id });
  next();
}

function onYura(ctx, next) {
  ctx.reply('юра красава ветеран', { reply_to_message_id: ctx.message.message_id });
  next();
}

function onTolya(ctx, next) {
  ctx.reply('толя красава капитан', { reply_to_message_id: ctx.message.message_id });
  next();
}

function onKray(ctx, next) {
  const msgs = ['край хуй вонючий', 'феделеш, иди на хуй'];
  const i = chance.integer({ min: 0, max: msgs.length - 1 });
  ctx.reply(msgs[i], { reply_to_message_id: ctx.message.message_id });
  next();
}

function on300(ctx, next) {
  ctx.reply('отсоси у тракториста', { reply_to_message_id: ctx.message.message_id });
  next();
}

function onNo(ctx, next) {
  ctx.reply('пидора ответ', { reply_to_message_id: ctx.message.message_id });
  next();
}

module.exports = (bot) => {
  bot.hears(/феделеш/i, onFedelesh);
  bot.hears(/артем|артём/i, onArtem);
  bot.hears(/саня|саша|харина/i, onSasha);
  bot.hears(/юра/i, onYura);
  bot.hears(/толя/i, onTolya);
  bot.hears(/край/i, onKray);
  bot.hears('нет', onNo);
};
