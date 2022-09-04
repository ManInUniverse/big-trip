import { render, replace } from '../framework/render.js';
import EventView from '../view/event-view.js';
import EditEventView from '../view/edit-event-view.js';

export default class EventPresenter {
  #event = null;
  #destinations = null;
  #offersByType = null;

  #eventComponent = null;
  #editEventComponent = null;
  #tripEventsListContainer = null;

  constructor(tripEventsListContainer) {
    this.#tripEventsListContainer = tripEventsListContainer;
  }

  init = (event, destinations, offersByType) => {
    this.#event = event;
    this.#destinations = destinations;
    this.#offersByType = offersByType;

    this.#eventComponent = new EventView(event, destinations, offersByType);
    this.#editEventComponent = new EditEventView(event, destinations, offersByType);

    this.#eventComponent.setOnEditEventButtonClick(this.#onEditButtonClick);
    this.#editEventComponent.setOnCloseEditEventButtonClick(this.#onCloseButtonClick);
    this.#editEventComponent.setOnSubmitEventForm(this.#onFormSubmit);

    render(this.#eventComponent, this.#tripEventsListContainer);
  };

  #replaceCardToForm = () => {
    replace(this.#editEventComponent, this.#eventComponent);
    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  #replaceFormToCard = () => {
    replace(this.#eventComponent, this.#editEventComponent);
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToCard();
    }
  };

  #onEditButtonClick = () => {
    this.#replaceCardToForm();
  };

  #onCloseButtonClick = () => {
    this.#replaceFormToCard();
  };

  #onFormSubmit = () => {
    this.#replaceFormToCard();
  };
}
