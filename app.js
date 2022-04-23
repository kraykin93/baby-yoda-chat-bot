const { Telegraf } = require('telegraf');
const init = require('./apps/init');
const offenceFriends = require('./apps/offence-friends');
const offencePolitics = require('./apps/offence-politics');
const pidorating = require('./apps/pidorating');
const randomImageApp = require('./apps/random-image');

const bot = new Telegraf(process.env.BOT_TOKEN);

init(bot);
offenceFriends(bot);
offencePolitics(bot);
pidorating(bot);
randomImageApp(bot);

bot.launch();
