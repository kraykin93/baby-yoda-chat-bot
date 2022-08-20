function onPTN(ctx, next) {
  ctx.reply('пнх', { reply_to_message_id: ctx.message.message_id });
  next();
}

function onPoliticianName(ctx, next) {
  const text = ctx.message.text || ctx.message.caption;
  if (/путин/i.test(text)) {
    ctx.reply('путин хуйло!\nла-ла-ла-ла-ла-ла-ла-ла!', { reply_to_message_id: ctx.message.message_id });
  }
  if (/медведев/i.test(text)) {
    ctx.reply('денег нет! но вы держитесь!', { reply_to_message_id: ctx.message.message_id });
  }
  if (/песков/i.test(text)) {
    ctx.reply('песков ебанат уже совсем запизделся', { reply_to_message_id: ctx.message.message_id });
  }
  if (/жириновский/i.test(text)) {
    ctx.reply('земля стекловатой, жирик', { reply_to_message_id: ctx.message.message_id });
  }
  if (/лукашенко/i.test(text)) {
    ctx.replyWithPhoto({ source: 'assets/img/usach.png' }, { reply_to_message_id: ctx.message.message_id });
  }
  if (/кива/i.test(text)) {
    ctx.reply('кива уебан', { reply_to_message_id: ctx.message.message_id });
  }
  if (/орбан/i.test(text)) {
    ctx.reply('орбан хуербан о курва оняд те луфос бозмек блять', { reply_to_message_id: ctx.message.message_id });
  }
  if (/шойгу/i.test(text)) {
    ctx.reply('разве шойгу подстилка не сдохла от инфаркта?', { reply_to_message_id: ctx.message.message_id });
  }
  next();
}

module.exports = (bot) => {
  bot.hears(/птн/i, onPTN);
  bot.on(['text', 'caption'], onPoliticianName);
};
