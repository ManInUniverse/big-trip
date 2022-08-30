import { generateTripEvent } from '../mock/trip-event-mock.js';
import { destinationsData } from '../mock/trip-event-mock.js';

export default class TripEventsModel {
  tripEvents = Array.from({ length: 10 }, generateTripEvent);
  destinations = destinationsData;

  getDestinationsData = () => this.destinations;
  getTripEvents = () => this.tripEvents;
}
