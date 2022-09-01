import { destinations, offersByType, generateEvent } from '../mock/event-mock.js';

export default class TripEventsModel {
  #events = Array.from({ length: 5 }, generateEvent);
  #destinations = destinations;
  #offersByType = offersByType;

  get events() {
    return this.#events;
  }

  get destinations() {
    return this.#destinations;
  }

  get offersByType() {
    return this.#offersByType;
  }
}
