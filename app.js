const { Telegraf } = require('telegraf');
const init = require('./apps/init');
const offence = require('./apps/offence');
const offenceFriends = require('./apps/offence-friends');
const pidorating = require('./apps/pidorating');
const randomImageApp = require('./apps/random-image');

const bot = new Telegraf(process.env.BOT_TOKEN);

init.enable(bot);
offence.enable(bot);
offenceFriends.enable(bot);
pidorating.enable(bot);
randomImageApp.enable(bot);

bot.launch();
