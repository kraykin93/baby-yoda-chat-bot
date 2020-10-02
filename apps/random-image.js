const randomCatUrl = require('random-cat')
const { memeAsync } = require('memejs')

const sendRandomCat = ({ replyWithPhoto }) => replyWithPhoto(randomCatUrl.get());
const sendRandomMeme = async ({ replyWithPhoto }) => replyWithPhoto(await memeAsync())

module.exports = {
  enable(bot) {
    bot.command('cat', sendRandomCat)
    bot.command('meme', sendRandomMeme)
  },
}
