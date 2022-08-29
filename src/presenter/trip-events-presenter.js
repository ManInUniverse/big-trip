import { render } from '../render.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import TripEventCreatorView from '../view/trip-event-creator-view.js';
import TripEventEditorView from '../view/trip-event-editor-view.js';
import TripEventView from '../view/trip-event-view.js';

export default class TripEventsPresenter {
  tripEventsListComponent = new TripEventsListView();

  init = (tripEventsContainer, tripEventsModel) => {
    this.tripEventsContainer = tripEventsContainer;
    this.tripEventsModel = tripEventsModel;
    this.tripEvents = [...this.tripEventsModel.getTripEvents()];

    render(this.tripEventsListComponent, tripEventsContainer);
    render(new TripEventCreatorView(), this.tripEventsListComponent.getElement());
    render(new TripEventEditorView(), this.tripEventsListComponent.getElement());

    for (let i = 0; i < this.tripEvents.length; i++) {
      render(new TripEventView(this.tripEvents[i]), this.tripEventsListComponent.getElement());
    }
  };
}
