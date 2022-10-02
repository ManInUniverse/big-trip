import { remove, render } from '../framework/render.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import SortingView from '../view/sorting-view.js';
import EmptyListMessageView from '../view/empty-list-message-view.js';
import EventPresenter from './event-presenter.js';
import { SortingType, UserAction, UpdateType } from '../const.js';
import { sortEventsByDate, sortEventsByPrice } from '../utils/event-utils.js';
import { filter } from '../utils/filter-utils.js';

export default class TripEventsPresenter {
  #emptyListMessageComponent = new EmptyListMessageView();
  #sortingComponent = null;
  #tripEventsListComponent = new TripEventsListView();

  #tripEventsContainer = null;
  #tripEventsModel = null;

  #filterModel = null;

  #destinations = null;
  #offersByType = null;

  #eventPresenters = new Map();

  #currentSortingType = SortingType.DAY;

  constructor(tripEventsContainer, tripEventsModel, filterModel) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#tripEventsModel = tripEventsModel;
    this.#filterModel = filterModel;

    this.#tripEventsModel.addObserver(this.#onModelEvent);
    this.#filterModel.addObserver(this.#onModelEvent);
  }

  get events() {
    const filterType = this.#filterModel.filter;
    const events = this.#tripEventsModel.events;
    const filteredEvents = filter[filterType](events);

    switch (this.#currentSortingType) {
      case SortingType.DAY:
        return filteredEvents.sort(sortEventsByDate);
      case SortingType.PRICE:
        return filteredEvents.sort(sortEventsByPrice);
    }

    return filteredEvents;
  }

  init = () => {
    this.#destinations = [...this.#tripEventsModel.destinations];
    this.#offersByType = [...this.#tripEventsModel.offersByType];

    this.#renderTripEvents();
  };

  #onViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#tripEventsModel.updateEvent(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this.#tripEventsModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this.#tripEventsModel.deleteEvent(updateType, update);
        break;
    }
  };

  #onModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearTripEvents();
        this.#renderTripEvents();
        break;
      case UpdateType.MAJOR:
        this.#clearTripEvents({resetSortingType: true});
        this.#renderTripEvents();
        break;
    }
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
    const eventPresenter = new EventPresenter(this.#tripEventsListComponent.element, this.#onViewAction, this.#onModeChange);
    eventPresenter.init(event, destinations, offersByType);

    this.#eventPresenters.set(event.id, eventPresenter);
  };

  #renderSorting = () => {
    this.#sortingComponent = new SortingView(this.#currentSortingType);
    this.#sortingComponent.setOnSortingTypeChange(this.#onSortingTypeChange);
    render(this.#sortingComponent, this.#tripEventsContainer);
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

  #clearTripEvents = ({resetSortingType = false} = {}) => {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();

    remove(this.#sortingComponent);
    remove(this.#tripEventsListComponent);
    remove(this.#emptyListMessageComponent);

    if (resetSortingType) {
      this.#currentSortingType = SortingType.DAY;
    }
  };
}
