const { client: db } = require('../db/db');

async function getAllPidors() {
  const { rows: pidors } = await db.query('SELECT * FROM public.rating;');
  return pidors;
}

async function updatePidorCounter(name) {
  await db.query(`UPDATE public.rating SET counter = counter + 1 WHERE name = '${name}';`);
}

async function getLastPidor() {
  const { rows } = await db.query('SELECT * FROM public.last INNER JOIN public.rating ON public.last.name=public.rating.name;');
  return rows[0];
}

async function updateLastPidor(name, id) {
  await db.query(`UPDATE public.last SET id = '${id}', name = '${name}', start_date = '${Date.now()}';`);
}

async function updateRecordPidorDuration(name, time) {
  await db.query(`UPDATE public.rating SET record_duration = ${time} WHERE name = '${name}';`);
}

async function updateTotalPidorDuration(name, time) {
  await db.query(`UPDATE public.rating SET total_duration = ${time} WHERE name = '${name}';`);
}

module.exports = {
  getAllPidors,
  updatePidorCounter,
  updateLastPidor,
  getLastPidor,
  updateRecordPidorDuration,
  updateTotalPidorDuration,
};
