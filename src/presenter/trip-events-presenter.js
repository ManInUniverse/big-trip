import { render } from '../framework/render.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import SortingView from '../view/sorting-view.js';
import EmptyListMessageView from '../view/empty-list-message-view.js';
import EventPresenter from './event-presenter.js';
import { updateItem } from '../utils/common-utils.js';
import { SortingType } from '../const.js';

export default class TripEventsPresenter {
  #emptyListMessageComponent = new EmptyListMessageView();
  #sortingComponent = new SortingView();
  #tripEventsListComponent = new TripEventsListView();

  #tripEventsContainer = null;
  #tripEventsModel = null;

  #events = null;
  #destinations = null;
  #offersByType = null;

  #eventPresenters = new Map();

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

  #onEventChange = (updatedEvent, destinations, offersByType) => {
    this.#events = updateItem(this.#events, updatedEvent);
    this.#eventPresenters.get(updatedEvent.id).init(updatedEvent, destinations, offersByType);
  };

  #onModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #onSortingTypeChange = (sortingType) => {
    console.log(sortingType);
    // - Сортируем задачи
    // - Очищаем список
    // - Рендерим список заново
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
    if (this.#events.length === 0) {
      this.#renderEmptyListMessage();
    } else {
      this.#renderSorting();
      this.#renderTripEventsList();

      for (let i = 0; i < this.#events.length; i++) {
        this.#renderEvent(this.#events[i], this.#destinations, this.#offersByType);
      }
    }
  };

  #clearTripEvents = () => {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
  };
}
