import { render } from '../framework/render.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import SortingView from '../view/sorting-view.js';
import EmptyListMessageView from '../view/empty-list-message-view.js';
import EventPresenter from './event-presenter.js';

export default class TripEventsPresenter {
  #emptyListMessageComponent = new EmptyListMessageView();
  #sortingComponent = new SortingView();
  #tripEventsListComponent = new TripEventsListView();

  #tripEventsContainer = null;
  #tripEventsModel = null;

  #events = null;
  #destinations = null;
  #offersByType = null;

  constructor(tripEventsContainer, tripEventsModel) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#tripEventsModel = tripEventsModel;
  }

  init = () => {
    this.#events = [...this.#tripEventsModel.events];
    this.#destinations = [...this.#tripEventsModel.destinations];
    this.#offersByType = [...this.#tripEventsModel.offersByType];

    this.#renderTripEvents();
  };

  #renderEvent = (event, destinations, offersByType) => {
    const eventPresenter = new EventPresenter(this.#tripEventsListComponent.element);
    eventPresenter.init(event, destinations, offersByType);
  };

  #renderTripEvents = () => {
    if (this.#events.length === 0) {
      render(this.#emptyListMessageComponent, this.#tripEventsContainer);
    } else {
      render(this.#sortingComponent, this.#tripEventsContainer);
      render(this.#tripEventsListComponent, this.#tripEventsContainer);
      for (let i = 0; i < this.#events.length; i++) {
        this.#renderEvent(this.#events[i], this.#destinations, this.#offersByType);
      }
    }
  };
}
