const axios = require('axios')
const { memeAsync } = require('memejs')

const sendRandomCat = async ({ replyWithPhoto }) => {
  try {
    // const { data } = await axios.get('https://api.thecatapi.com/v1/images/search')
    // const url = data[0].url
    replyWithPhoto({ url: 'https://cataas.com/cat' })
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
