import { render, replace } from '../framework/render.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import EditEventView from '../view/edit-event-view.js';
import EventView from '../view/event-view.js';
import SortingView from '../view/sorting-view.js';
import EmptyListMessageView from '../view/empty-list-message-view.js';

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
    const eventComponent = new EventView(event, destinations, offersByType);
    const editEventComponent = new EditEventView(event, destinations, offersByType);

    const replaceCardToForm = () => {
      replace(editEventComponent, eventComponent);
    };

    const replaceFormToCard = () => {
      replace(eventComponent, editEventComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    eventComponent.setOnEditEventButtonClick(() => {
      replaceCardToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    editEventComponent.setOnSubmitEventForm(() => {
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    editEventComponent.setOnCloseEditEventButtonClick(() => {
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(eventComponent, this.#tripEventsListComponent.element);
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
