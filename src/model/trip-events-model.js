import { generateEvent } from '../mock/event-mock.js';
import { destinationsData, offersData } from '../mock/event-mock.js';

export default class TripEventsModel {
  tripEvents = Array.from({ length: 10 }, generateEvent);
  destinations = destinationsData;
  offersData = offersData;

  getDestinationsData = () => this.destinations;
  getOffersData = () => this.offersData;
  getTripEvents = () => this.tripEvents;
}
