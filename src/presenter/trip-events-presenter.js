import { render } from '../render.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import NewTripEventView from '../view/new-trip-event-view.js';
import TripEventView from '../view/trip-event-view.js';

export default class TripEventsPresenter {
  tripEventsListComponent = new TripEventsListView();

  init = (tripEventsContainer) => {
    this.tripEventsContainer = tripEventsContainer;

    render(this.tripEventsListComponent, tripEventsContainer);
    render(new NewTripEventView(), this.tripEventsListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new TripEventView(), this.tripEventsListComponent.getElement());
    }
  };
}
