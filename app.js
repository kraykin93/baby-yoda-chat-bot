const { Telegraf } = require('telegraf')
const randomImageApp = require('./apps/random-image')
const offence = require('./apps/offence')

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start(({ reply }) => reply('May the Force be with you!'))

bot.on('new_chat_members', (ctx) => {
  ctx.message.new_chat_members.forEach((member) => {
    const username = member.username || member.first_name
    return ctx.reply(`@${username}, may the Force be with you!`)
  })
})

randomImageApp.enable(bot)
offence.enable(bot)

bot.launch()
