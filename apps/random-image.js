const { memeAsync } = require('memejs');

async function sendRandomCat(ctx) {
  try {
    ctx.replyWithPhoto({ url: 'https://cataas.com/cat' });
  } catch (e) {
    console.error(e);
  }
}

async function sendRandomMeme(ctx) {
  try {
    ctx.replyWithPhoto(await memeAsync());
  } catch (e) {
    console.error(e);
  }
}

module.exports = {
  enable(bot) {
    bot.command('cat', sendRandomCat);
    bot.command('meme', sendRandomMeme);
  },
};
