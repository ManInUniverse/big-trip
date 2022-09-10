import dayjs from 'dayjs';

const formatEventDateTime = (date, format) => dayjs(date).format(format);

const isOfferChecked = (offers, id) => offers.includes(id);

const sortEventsByDate = (eventA, eventB) => dayjs(eventA.dateFrom).diff(dayjs(eventB.dateFrom));

const sortEventsByPrice = (eventA, eventB) => eventB.basePrice - eventA.basePrice;

export { formatEventDateTime, isOfferChecked, sortEventsByDate, sortEventsByPrice };
