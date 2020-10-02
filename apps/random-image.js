const axios = require('axios')
const { memeAsync } = require('memejs')

const sendRandomCat = async ({ replyWithPhoto }) => {
  try {
    const { data } = await axios.get('https://api.thecatapi.com/v1/images/search')
    replyWithPhoto({ url: data[0].url })
  } catch (e) {
    console.error(e)
  }
}

const sendRandomMeme = async ({ replyWithPhoto }) => {
  try {
    replyWithPhoto(await memeAsync())
  } catch (e) {
    console.error(e)
  }
}

module.exports = {
  enable(bot) {
    bot.command('cat', sendRandomCat)
    bot.command('meme', sendRandomMeme)
  }
}
