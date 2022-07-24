const moment = require('moment');

function parseDays(diff) {
  const m = new moment.duration(diff);
  let str = '';
  const days = Math.floor(m.days());
  const hours = Math.floor(m.hours());
  const minutes = Math.floor(m.minutes());
  const seconds = Math.floor(m.seconds());

  if (days) {
    if (days === 1) {
      str = str.concat(` ${days} день`);
    } else if (days === 2 || days === 3 || days === 4) {
      str = str.concat(` ${days} дня`);
    } else {
      str = str.concat(` ${days} дней`);
    }
  }

  if (hours) {
    if (hours === 1) {
      str = str.concat(` ${hours} час`);
    } else if (hours === 2 || hours === 3 || hours === 4) {
      str = str.concat(` ${hours} часа`);
    } else {
      str = str.concat(` ${hours} часов`);
    }
  }

  if (minutes) {
    str = str.concat(` ${minutes} мин`);
  }

  if (seconds) {
    str = str.concat(` ${seconds} сек`);
  }

  return str;
}

module.exports = {
  parseDays,
};
