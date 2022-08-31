import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

const formatEventDateTime = (date, format) => dayjs.utc(date).format(format);

const getRandomInteger = function (a = 0, b = 1) {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomArrayElement = function (targetArray) {
  return targetArray[getRandomInteger(0, targetArray.length - 1)];
};

const getRandomElementsFromArray = (targetArray, count) => targetArray.slice().sort(() => Math.random() - 0.5).slice(0, count);

export { getRandomInteger, getRandomArrayElement, formatEventDateTime, getRandomElementsFromArray };
