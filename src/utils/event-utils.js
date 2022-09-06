import dayjs from 'dayjs';

const formatEventDateTime = (date, format) => dayjs(date).format(format);

const isOfferChecked = (offers, id) => offers.includes(id);

export { formatEventDateTime, isOfferChecked };
