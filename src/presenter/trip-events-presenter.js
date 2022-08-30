import { render } from '../render.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import EventCreatorView from '../view/event-creator-view.js';
import EventEditorView from '../view/event-editor-view.js';
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
    render(new EventCreatorView(), this.tripEventsListComponent.getElement());
    render(new EventEditorView(), this.tripEventsListComponent.getElement());

    for (let i = 0; i < this.tripEvents.length; i++) {
      render(new EventView(this.tripEvents[i], this.destinationsData, this.offersData), this.tripEventsListComponent.getElement());
    }
  };
}
