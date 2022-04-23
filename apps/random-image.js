const { memeAsync } = require('memejs');

function onRandomCat(ctx) {
  try {
    ctx.replyWithPhoto({ url: 'https://cataas.com/cat' });
  } catch (e) {
    console.error(e);
  }
}

async function onRandomMeme(ctx) {
  try {
    ctx.replyWithPhoto(await memeAsync());
  } catch (e) {
    console.error(e);
  }
}

module.exports = (bot) => {
  bot.command('cat', onRandomCat);
  bot.command('meme', onRandomMeme);
};
