import { render } from '../render.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import AddEventView from '../view/add-event-view.js';
import EditEventView from '../view/edit-event-view.js';
import EventView from '../view/event-view.js';

export default class TripEventsPresenter {
  #tripEventsListComponent = new TripEventsListView();
  #tripEventsContainer = null;
  #tripEventsModel = null;
  #events = null;
  #destinations = null;
  #offersByType = null;

  init = (tripEventsContainer, tripEventsModel) => {
    this.#tripEventsContainer = tripEventsContainer;
    this.#tripEventsModel = tripEventsModel;
    this.#events = [...this.#tripEventsModel.events];
    this.#destinations = [...this.#tripEventsModel.destinations];
    this.#offersByType = [...this.#tripEventsModel.offersByType];

    render(this.#tripEventsListComponent, this.#tripEventsContainer);
    render(new AddEventView(this.#destinations, this.#offersByType), this.#tripEventsListComponent.element);
    render(new EditEventView(this.#events[0], this.#destinations, this.#offersByType), this.#tripEventsListComponent.element);

    for (let i = 0; i < this.#events.length; i++) {
      render(new EventView(this.#events[i], this.#destinations, this.#offersByType), this.#tripEventsListComponent.element);
    }
  };
}
