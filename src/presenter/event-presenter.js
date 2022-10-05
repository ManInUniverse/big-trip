import { render, replace, remove } from '../framework/render.js';
import EventView from '../view/event-view.js';
import EditEventView from '../view/edit-event-view.js';
import { UserAction, UpdateType } from '../const.js';

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
    this.#editEventComponent.setOnDeleteEventButtonClick(this.#onDeleteButtonClick);

    if (prevEventComponent === null || prevEditEventComponent === null) {
      render(this.#eventComponent, this.#tripEventsListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#eventComponent, prevEventComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#editEventComponent, prevEditEventComponent);
      this.#mode = Mode.DEFAULT;
    }

    remove(prevEventComponent);
    remove(prevEditEventComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#editEventComponent.reset(this.#event);
      this.#replaceFormToCard();
    }
  };

  destroy = () => {
    remove(this.#eventComponent);
    remove(this.#editEventComponent);
  };

  setSaving = () => {
    if (this.#mode === Mode.EDITING) {
      this.#editEventComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  };

  setDeleting = () => {
    if (this.#mode === Mode.EDITING) {
      this.#editEventComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  };

  setAborting = () => {
    if (this.#mode === Mode.DEFAULT) {
      this.#eventComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#editEventComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };

    this.#editEventComponent.shake(resetFormState);
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
      this.#editEventComponent.reset(this.#event);
      this.#replaceFormToCard();
    }
  };

  #onEditButtonClick = () => {
    this.#replaceCardToForm();
  };

  #onCloseButtonClick = () => {
    this.#editEventComponent.reset(this.#event);
    this.#replaceFormToCard();
  };

  #onFormSubmit = (update, destinations, offersByType) => {
    this.#changeData(UserAction.UPDATE_EVENT, UpdateType.MINOR, update, destinations, offersByType);
  };

  #onDeleteButtonClick = (event) => {
    this.#changeData(UserAction.DELETE_EVENT, UpdateType.MINOR, event);
  };
}
