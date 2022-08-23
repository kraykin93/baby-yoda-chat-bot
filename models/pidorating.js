const { client: db } = require('../db/db');

async function getAllPidors() {
  const { rows: pidors } = await db.query('SELECT * FROM public.rating;');
  return pidors;
}

async function increasePidorCounter(id) {
  await db.query(`UPDATE public.rating SET counter = counter + 1 WHERE id = '${id}';`);
}

async function increasePidorSaves(id) {
  await db.query(`UPDATE public.rating SET saves = saves + 1 WHERE id = '${id}';`);
}

async function decreasePidorSaves(id) {
  await db.query(`UPDATE public.rating SET saves = saves - 1 WHERE id = '${id}';`);
}

async function getCurrentPidor() {
  const { rows } = await db.query('SELECT * FROM public.current INNER JOIN public.rating ON public.current.id=public.rating.id;');
  return rows[0];
}

async function updateCurrentPidor(id) {
  await db.query(`UPDATE public.current SET id = '${id}', start_date = '${Date.now()}';`);
}

async function updateRecordPidorDuration(id, time) {
  await db.query(`UPDATE public.rating SET record_duration = ${time} WHERE id = '${id}';`);
}

async function updateTotalPidorDuration(id, time) {
  await db.query(`UPDATE public.rating SET total_duration = total_duration + ${time} WHERE id = '${id}';`);
}

module.exports = {
  getAllPidors,
  increasePidorCounter,
  increasePidorSaves,
  decreasePidorSaves,
  updateCurrentPidor,
  getCurrentPidor,
  updateRecordPidorDuration,
  updateTotalPidorDuration,
};
