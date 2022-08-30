import { generateTripEvent } from '../mock/trip-event-mock.js';
import { destinationsData, offersData } from '../mock/trip-event-mock.js';

export default class TripEventsModel {
  tripEvents = Array.from({ length: 10 }, generateTripEvent);
  destinations = destinationsData;
  offersData = offersData;

  getDestinationsData = () => this.destinations;
  getOffersData = () => this.offersData;
  getTripEvents = () => this.tripEvents;
}
