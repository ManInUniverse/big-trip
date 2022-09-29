import Observable from '../framework/observable.js';
import { destinations, offersByType, generateEvent } from '../mock/event-mock.js';

export default class TripEventsModel extends Observable {
  #events = Array.from({ length: 10 }, generateEvent);
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
