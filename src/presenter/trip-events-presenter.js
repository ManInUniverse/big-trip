import { render } from '../framework/render.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import SortingView from '../view/sorting-view.js';
import EmptyListMessageView from '../view/empty-list-message-view.js';
import EventPresenter from './event-presenter.js';
import { SortingType } from '../const.js';
import { sortEventsByDate, sortEventsByPrice } from '../utils/event-utils.js';

export default class TripEventsPresenter {
  #emptyListMessageComponent = new EmptyListMessageView();
  #sortingComponent = new SortingView();
  #tripEventsListComponent = new TripEventsListView();

  #tripEventsContainer = null;
  #tripEventsModel = null;

  #destinations = null;
  #offersByType = null;

  #eventPresenters = new Map();

  #currentSortingType = SortingType.DAY;

  constructor(tripEventsContainer, tripEventsModel) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#tripEventsModel = tripEventsModel;
  }

  get events() {
    switch (this.#currentSortingType) {
      case SortingType.DAY:
        return [...this.#tripEventsModel.events].sort(sortEventsByDate);
      case SortingType.PRICE:
        return [...this.#tripEventsModel.events].sort(sortEventsByPrice);
    }

    return this.#tripEventsModel.events;
  }

  init = () => {
    this.#destinations = [...this.#tripEventsModel.destinations];
    this.#offersByType = [...this.#tripEventsModel.offersByType];

    this.#renderTripEvents();
  };

  #onEventChange = (updatedEvent, destinations, offersByType) => {
    //Здесь будем вызывать обновление модели
    this.#eventPresenters.get(updatedEvent.id).init(updatedEvent, destinations, offersByType);
  };

  #onModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #onSortingTypeChange = (sortingType) => {
    if (this.#currentSortingType === sortingType) {
      return;
    }

    this.#currentSortingType = sortingType;
    this.#clearTripEvents();
    this.#renderTripEvents();
  };

  #renderEvent = (event, destinations, offersByType) => {
    const eventPresenter = new EventPresenter(this.#tripEventsListComponent.element, this.#onEventChange, this.#onModeChange);
    eventPresenter.init(event, destinations, offersByType);

    this.#eventPresenters.set(event.id, eventPresenter);
  };

  #renderSorting = () => {
    render(this.#sortingComponent, this.#tripEventsContainer);
    this.#sortingComponent.setOnSortingTypeChange(this.#onSortingTypeChange);
  };

  #renderTripEventsList = () => {
    render(this.#tripEventsListComponent, this.#tripEventsContainer);
  };

  #renderEmptyListMessage = () => {
    render(this.#emptyListMessageComponent, this.#tripEventsContainer);
  };

  #renderTripEvents = () => {
    if (this.events.length === 0) {
      this.#renderEmptyListMessage();
    } else {
      this.#renderSorting();
      this.#renderTripEventsList();
      this.events.forEach((event) => this.#renderEvent(event, this.#destinations, this.#offersByType));
    }
  };

  #clearTripEvents = () => {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
  };
}
