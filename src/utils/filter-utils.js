import { FilterType } from '../const';
import { isEventFuture } from './event-utils.js';

const filter = {
  [FilterType.EVERYTHING]: (events) => events,
  [FilterType.FUTURE]: (events) => events.filter((event) => isEventFuture(event.dateFrom)),
};

export { filter };
