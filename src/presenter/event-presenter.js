import { render, replace, remove } from '../framework/render.js';
import EventView from '../view/event-view.js';
import EditEventView from '../view/edit-event-view.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class EventPresenter {
  #mode = Mode.DEFAULT;

  #event = null;
  #destinations = null;
  #offersByType = null;

  #changeData = null;
  #changeMode = null;

  #eventComponent = null;
  #editEventComponent = null;
  #tripEventsListContainer = null;

  constructor(tripEventsListContainer, changeData, changeMode) {
    this.#tripEventsListContainer = tripEventsListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (event, destinations, offersByType) => {
    this.#event = event;
    this.#destinations = destinations;
    this.#offersByType = offersByType;

    const prevEventComponent = this.#eventComponent;
    const prevEditEventComponent = this.#editEventComponent;

    this.#eventComponent = new EventView(event, destinations, offersByType);
    this.#editEventComponent = new EditEventView(event, destinations, offersByType);

    this.#eventComponent.setOnEditEventButtonClick(this.#onEditButtonClick);
    this.#editEventComponent.setOnCloseEditEventButtonClick(this.#onCloseButtonClick);
    this.#editEventComponent.setOnSubmitEventForm(this.#onFormSubmit);

    if (prevEventComponent === null || prevEditEventComponent === null) {
      render(this.#eventComponent, this.#tripEventsListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#eventComponent, prevEventComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#editEventComponent, prevEditEventComponent);
    }

    remove(prevEventComponent);
    remove(prevEditEventComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToCard();
    }
  };

  destroy = () => {
    remove(this.#eventComponent);
    remove(this.#editEventComponent);
  };

  #replaceCardToForm = () => {
    replace(this.#editEventComponent, this.#eventComponent);
    document.addEventListener('keydown', this.#onEscKeyDown);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToCard = () => {
    replace(this.#eventComponent, this.#editEventComponent);
    document.removeEventListener('keydown', this.#onEscKeyDown);
    this.#mode = Mode.DEFAULT;
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

  #onFormSubmit = (event, destinations, offersByType) => {
    this.#changeData(event, destinations, offersByType);
    this.#replaceFormToCard();
  };
}
