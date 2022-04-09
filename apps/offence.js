const { client: db } = require('../db/db')
const CONST = require('../conf/CONST')

module.exports = {
  enable(bot) {
    bot.hears(/птн/i, (ctx) => {
      ctx.reply('пнх', { reply_to_message_id: ctx.message.message_id })
    })
    bot.hears(/путин/i, (ctx) => {
      ctx.reply('путин хуйло!\nла-ла-ла-ла-ла-ла-ла-ла!', { reply_to_message_id: ctx.message.message_id })
    })
    bot.hears(/жириновский/i, (ctx) => {
      ctx.reply('земля стекловатой', { reply_to_message_id: ctx.message.message_id })
    })
    bot.hears(/кива/i, (ctx) => {
      ctx.reply('уебан', { reply_to_message_id: ctx.message.message_id })
    })
    bot.hears(/кто пидар/i, async (ctx) => {
      const names = Object.values(CONST)
      const i = Math.floor(Math.random() * names.length)
      await db.query(`UPDATE public.rating SET counter = counter + 1 WHERE name = '${names[i].record}';`)
      ctx.reply(names[i].name, { reply_to_message_id: ctx.message.message_id })
    })
    bot.command('pidorating', async (ctx) => {
      const res = await db.query('SELECT * FROM public.rating;')
      const map = new Map(res.rows.map(i => [i.name, i.counter]));
      const msg = `${CONST.fedelesh.name}: ${map.get(CONST.fedelesh.record)}\n${CONST.sanya.name}: ${map.get(CONST.sanya.record)}\n${CONST.artem.name}: ${map.get(CONST.artem.record)}\n${CONST.yura.name}: ${map.get(CONST.yura.record)}\n${CONST.tolya.name}: ${map.get(CONST.tolya.record)}\n${CONST.kray.name}: ${map.get(CONST.kray.record)}`
      ctx.reply(msg)
    })
  }
}
