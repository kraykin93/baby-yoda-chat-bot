function onStart(ctx) {
  ctx.reply('May the Force be with you!');
}

function onNewChatMember(ctx) {
  ctx.message.new_chat_members.forEach((member) => {
    const username = member.username || member.first_name;
    return ctx.reply(`@${username}, may the Force be with you!`);
  });
}

module.exports = (bot) => {
  bot.start(onStart);
  bot.on('new_chat_members', onNewChatMember);
};
