const { Telegraf } = require('telegraf');
const offence = require('./apps/offence');
const offenceFriends = require('./apps/offence-friends');
const pidorating = require('./apps/pidorating');
const randomImageApp = require('./apps/random-image');

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start(({ reply }) => reply('May the Force be with you!'));

bot.on('new_chat_members', (ctx) => {
  ctx.message.new_chat_members.forEach((member) => {
    const username = member.username || member.first_name;
    return ctx.reply(`@${username}, may the Force be with you!`);
  });
});

offence.enable(bot);
offenceFriends.enable(bot);
pidorating.enable(bot);
randomImageApp.enable(bot);

bot.launch();
