import { destinations, offersByType, generateEvent } from '../mock/event-mock.js';

export default class TripEventsModel {
  events = Array.from({ length: 10 }, generateEvent);
  destinations = destinations;
  offersByType = offersByType;

  getEvents = () => this.events;
  getDestinations = () => this.destinations;
  getOffersByType = () => this.offersByType;
}
