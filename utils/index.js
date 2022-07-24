function parseDays(moment) {
  let str = '';
  const days = Math.floor(moment.days());
  const hours = Math.floor(moment.hours());
  const minutes = Math.floor(moment.minutes());
  const seconds = Math.floor(moment.seconds());

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
    if (minutes === 1) {
      str = str.concat(` ${minutes} минуту`);
    } else if (minutes === 2 || minutes === 3 || minutes === 4) {
      str = str.concat(` ${minutes} минуты`);
    } else {
      str = str.concat(` ${minutes} минут`);
    }
  }

  if (seconds) {
    if (seconds === 1) {
      str = str.concat(` ${seconds} секунду`);
    } else if (seconds === 2 || seconds === 3 || seconds === 4) {
      str = str.concat(` ${seconds} секунды`);
    } else {
      str = str.concat(` ${seconds} секунд`);
    }
  }

  return str;
}

module.exports = {
  parseDays,
};
