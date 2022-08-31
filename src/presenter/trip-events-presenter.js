import { render } from '../render.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import AddEventView from '../view/add-event-view.js';
import EditEventView from '../view/edit-event-view.js';
import EventView from '../view/event-view.js';

export default class TripEventsPresenter {
  tripEventsListComponent = new TripEventsListView();

  init = (tripEventsContainer, tripEventsModel) => {
    this.tripEventsContainer = tripEventsContainer;
    this.tripEventsModel = tripEventsModel;
    this.events = [...this.tripEventsModel.getEvents()];
    this.destinations = [...this.tripEventsModel.getDestinations()];
    this.offersByType = [...this.tripEventsModel.getOffersByType()];

    render(this.tripEventsListComponent, tripEventsContainer);
    render(new AddEventView(), this.tripEventsListComponent.getElement());
    render(new EditEventView(this.events[0], this.destinations, this.offersByType), this.tripEventsListComponent.getElement());

    for (let i = 0; i < this.events.length; i++) {
      render(new EventView(this.events[i], this.destinations, this.offersByType), this.tripEventsListComponent.getElement());
    }
  };
}
