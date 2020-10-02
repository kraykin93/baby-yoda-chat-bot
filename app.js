const { Telegraf } = require('telegraf')
const randomImageApp = require('./apps/random-image')

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start(({ reply }) => reply('May the Force be with you!'))

bot.on('new_chat_members', ({ message, reply }) => {
  message.new_chat_members.forEach((member) => {
    const username = member.username || member.first_name
    return reply(`@${username}, may the Force be with you!`)
  })
})

randomImageApp.enable(bot)

bot.launch()
