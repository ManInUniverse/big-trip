import dayjs from 'dayjs';

const formatEventDateTime = (date, format) => dayjs(date).format(format);

export { formatEventDateTime };
