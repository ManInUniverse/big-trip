import { remove, render, RenderPosition } from '../framework/render.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import SortingView from '../view/sorting-view.js';
import EmptyListMessageView from '../view/empty-list-message-view.js';
import EventPresenter from './event-presenter.js';
import AddEventPresenter from './add-event-presenter.js';
import { SortingType, UserAction, UpdateType, FilterType } from '../const.js';
import { sortEventsByDate, sortEventsByPrice } from '../utils/event-utils.js';
import { filter } from '../utils/filter-utils.js';
import LoadingMessageView from '../view/loading-message-view.js';

export default class TripEventsPresenter {
  #emptyListMessageComponent = null;
  #sortingComponent = null;
  #tripEventsListComponent = new TripEventsListView();
  #loadingMessageComponent = new LoadingMessageView();
  #tripEventsContainer = null;

  #tripEventsModel = null;
  #destinationsModel = null;
  #offersByTypeModel = null;
  #filterModel = null;

  #eventPresenters = new Map();
  #addEventPresenter = null;

  #currentSortingType = SortingType.DAY;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;

  constructor(tripEventsContainer, tripEventsModel, destinationsModel, offerByTypeModel, filterModel) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#tripEventsModel = tripEventsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersByTypeModel = offerByTypeModel;
    this.#filterModel = filterModel;

    this.#addEventPresenter = new AddEventPresenter(this.#tripEventsListComponent.element, this.#onViewAction);

    this.#tripEventsModel.addObserver(this.#onModelEvent);
    this.#filterModel.addObserver(this.#onModelEvent);
  }

  get events() {
    this.#filterType = this.#filterModel.filter;
    const events = this.#tripEventsModel.events;
    const filteredEvents = filter[this.#filterType](events);

    switch (this.#currentSortingType) {
      case SortingType.DAY:
        return filteredEvents.sort(sortEventsByDate);
      case SortingType.PRICE:
        return filteredEvents.sort(sortEventsByPrice);
    }

    return filteredEvents;
  }

  init = () => {
    this.#renderTripEvents();
  };

  createTripEvent = (callback) => {
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#addEventPresenter.init(this.#destinationsModel.destinations, this.#offersByTypeModel.offersByType, callback);
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
        this.#eventPresenters.get(data.id).init(data, this.#destinationsModel.destinations, this.#offersByTypeModel.offersByType);
        break;
      case UpdateType.MINOR:
        this.#clearTripEvents();
        this.#renderTripEvents();
        break;
      case UpdateType.MAJOR:
        this.#clearTripEvents({resetSortingType: true});
        this.#renderTripEvents();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingMessageComponent);
        this.#renderTripEvents();
        break;
    }
  };

  #onModeChange = () => {
    this.#addEventPresenter.destroy();
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #onSortingTypeChange = (sortingType) => {
    this.#currentSortingType = sortingType;
    this.#clearTripEvents();
    this.#renderTripEvents();
  };

  #renderEvent = (event) => {
    const eventPresenter = new EventPresenter(this.#tripEventsListComponent.element, this.#onViewAction, this.#onModeChange);
    eventPresenter.init(event, this.#destinationsModel.destinations, this.#offersByTypeModel.offersByType);

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
    this.#emptyListMessageComponent = new EmptyListMessageView(this.#filterType);
    render(this.#emptyListMessageComponent, this.#tripEventsContainer);
  };

  #renderLoadingMessage = () => {
    render(this.#loadingMessageComponent, this.#tripEventsContainer, RenderPosition.AFTERBEGIN);
  };

  #renderTripEvents = () => {
    if (this.#isLoading) {
      this.#renderLoadingMessage();
      return;
    }

    if (this.events.length === 0) {
      this.#renderEmptyListMessage();
    } else {
      this.#renderSorting();
      this.#renderTripEventsList();
      this.events.forEach((event) => this.#renderEvent(event, this.#destinationsModel.destinations, this.#offersByTypeModel.offersByType));
    }
  };

  #clearTripEvents = ({resetSortingType = false} = {}) => {
    this.#addEventPresenter.destroy();
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();

    remove(this.#sortingComponent);
    remove(this.#loadingMessageComponent);

    if (this.#emptyListMessageComponent) {
      remove(this.#emptyListMessageComponent);
    }

    if (resetSortingType) {
      this.#currentSortingType = SortingType.DAY;
    }
  };
}
