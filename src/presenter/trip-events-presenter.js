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
    this.tripEvents = [...this.tripEventsModel.getTripEvents()];
    this.destinationsData = [...this.tripEventsModel.getDestinationsData()];
    this.offersData = [...this.tripEventsModel.getOffersData()];

    render(this.tripEventsListComponent, tripEventsContainer);
    render(new AddEventView(), this.tripEventsListComponent.getElement());
    render(new EditEventView(), this.tripEventsListComponent.getElement());

    for (let i = 0; i < this.tripEvents.length; i++) {
      render(new EventView(this.tripEvents[i], this.destinationsData, this.offersData), this.tripEventsListComponent.getElement());
    }
  };
}
