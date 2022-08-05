const { Telegraf } = require('telegraf');
const init = require('./controllers/init');
const offenceFriends = require('./controllers/offence-friends');
const offencePolitics = require('./controllers/offence-politics');
const pidorating = require('./controllers/pidorating');
const randomImageApp = require('./controllers/random-image');

const bot = new Telegraf(process.env.BOT_TOKEN);

init(bot);
offenceFriends(bot);
offencePolitics(bot);
pidorating(bot);
randomImageApp(bot);

bot.launch();
