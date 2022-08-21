const { client: db } = require('../db/db');

async function getAllPidors() {
  const { rows: pidors } = await db.query('SELECT * FROM public.rating;');
  return pidors;
}

async function updatePidorCounter(name) {
  await db.query(`UPDATE public.rating SET counter = counter + 1 WHERE name = '${name}';`);
}

async function updatePidorSaves(id) {
  await db.query(`UPDATE public.rating SET saves = saves + 1 WHERE id = '${id}';`);
}

async function getCurrentPidor() {
  const { rows } = await db.query('SELECT * FROM public.current INNER JOIN public.rating ON public.current.name=public.rating.name;');
  return rows[0];
}

async function updateCurrentPidor(name, id) {
  await db.query(`UPDATE public.current SET id = '${id}', name = '${name}', start_date = '${Date.now()}';`);
}

async function updateRecordPidorDuration(id, time) {
  await db.query(`UPDATE public.rating SET record_duration = ${time} WHERE id = '${id}';`);
}

async function updateTotalPidorDuration(id, time) {
  await db.query(`UPDATE public.rating SET total_duration = total_duration + ${time} WHERE id = '${id}';`);
}

module.exports = {
  getAllPidors,
  updatePidorCounter,
  updatePidorSaves,
  updateCurrentPidor,
  getCurrentPidor,
  updateRecordPidorDuration,
  updateTotalPidorDuration,
};
