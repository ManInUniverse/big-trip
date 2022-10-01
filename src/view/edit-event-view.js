import { formatEventDateTime, isOfferChecked } from '../utils/event-utils.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const createOffersTemplate = (type, offers, offersByType) => {
  const offersByCurrentType = offersByType.find((element) => element.type === type).offers;

  return offersByCurrentType.map(({ id, title, price }) =>
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${title}-1" type="checkbox" name="event-offer-${title}" data-offer-id="${id}" ${isOfferChecked(offers, id) ? 'checked' : ''}>
      <label class="event__offer-label" for="event-offer-${title}-1">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>`
  ).join('');
};

const createDestinationListTemplate = (destinations) => destinations.map((element) => `<option value="${element.name}"></option>`).join('');

const createEventTypeListTemplate = (offersByType, type) => {
  const eventTypes = offersByType.map((element) => element.type);

  return eventTypes.map((eventType) =>
    `<div class="event__type-item">
      <input id="event-type-${eventType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${eventType}" ${eventType === type ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--${eventType}" for="event-type-${eventType}-1">${eventType}</label>
    </div>`
  ).join('');
};

const createEditEventTemplate = (event, destinations, offersByType) => {
  const { basePrice, dateFrom, dateTo, destination, type, offers } = event;
  const destinationName = destinations.find((element) => element.id === destination).name;
  const destinationDescription = destinations.find((element) => element.id === destination).description;

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${createEventTypeListTemplate(offersByType, type)}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationName}" list="destination-list-1">
            <datalist id="destination-list-1">
              ${createDestinationListTemplate(destinations)}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatEventDateTime(dateFrom, 'DD/MM/YY HH:mm')}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatEventDateTime(dateTo, 'DD/MM/YY HH:mm')}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">
              ${createOffersTemplate(type, offers, offersByType)}
            </div>
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${destinationDescription}</p>
          </section>
        </section>
      </form>
    </li>`
  );
};

export default class EditEventView extends AbstractStatefulView {
  #dateFromPicker = null;
  #dateToPicker = null;

  #destinations = null;
  #offersByType = null;

  constructor(event, destinations, offersByType) {
    super();
    this._state = EditEventView.parseEventToState(event);
    this.#destinations = destinations;
    this.#offersByType = offersByType;

    this.#setInnerHandlers();

    this.#setDatePickers();
  }

  get template() {
    return createEditEventTemplate(this._state, this.#destinations, this.#offersByType);
  }

  setOnCloseEditEventButtonClick = (callback) => {
    this._callback.closeClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#onCloseEditEventButtonClick);
  };

  #onCloseEditEventButtonClick = (evt) => {
    evt.preventDefault();
    this._callback.closeClick();
  };

  setOnSubmitEventForm = (callback) => {
    this._callback.submitEventForm = callback;
    this.element.querySelector('form').addEventListener('submit', this.#onSubmitEventForm);
  };

  #onSubmitEventForm = (evt) => {
    evt.preventDefault();
    this._callback.submitEventForm(EditEventView.parseStateToEvent(this._state), this.#destinations, this.#offersByType);
  };

  setOnDeleteEventButtonClick = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#onDeleteEventButtonClick);
  };

  #onDeleteEventButtonClick = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(EditEventView.parseStateToEvent(this._state));
  };

  static parseEventToState = (event) => ({...event});

  static parseStateToEvent = (state) => {
    const event = {...state};
    return event;
  };

  #setInnerHandlers = () => {
    this.element.addEventListener('change', this.#onOfferChange);
    this.element.addEventListener('change', this.#onEventTypeChange);
    this.element.addEventListener('change', this.#onDestinationChange);
  };

  #onOfferChange = (evt) => {
    if (!evt.target.closest('input[type="checkbox"].event__offer-checkbox')) {
      return;
    }

    evt.preventDefault();
    const checkedOffers = [...this._state.offers];
    if (evt.target.checked) {
      checkedOffers.push(Number(evt.target.dataset.offerId));
    } else {
      const idIndex = checkedOffers.indexOf(Number(evt.target.dataset.offerId));
      checkedOffers.splice(idIndex, 1);
    }

    this.updateElement({
      offers: checkedOffers
    });
  };

  #onEventTypeChange = (evt) => {
    if (!evt.target.closest('input[type="radio"].event__type-input')) {
      return;
    }

    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offers: []
    });
  };

  #onDestinationChange = (evt) => {
    if (!evt.target.closest('input[type="text"].event__input--destination')) {
      return;
    }

    evt.preventDefault();
    const newDestination = this.#destinations.find((destination) => destination.name === evt.target.value).id;
    this.updateElement({
      destination: newDestination
    });
  };

  #onDateFromChange = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate
    });
  };

  #onDateToChange = ([userDate]) => {
    this.updateElement({
      dateTo: userDate
    });
  };

  #setDatePickers = () => {
    this.#dateFromPicker = flatpickr(this.element.querySelector('input[name="event-start-time"].event__input--time'), {
      enableTime: true,
      dateFormat: 'd/m/y H:i',
      defaultDate: this._state.dateFrom,
      onChange: this.#onDateFromChange
    });
    this.#dateToPicker = flatpickr(this.element.querySelector('input[name="event-end-time"].event__input--time'), {
      enableTime: true,
      dateFormat: 'd/m/y  H:i',
      defaultDate: this._state.dateTo,
      onChange: this.#onDateToChange
    });
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();

    this.setOnSubmitEventForm(this._callback.submitEventForm);
    this.setOnCloseEditEventButtonClick(this._callback.closeClick);
    this.setOnDeleteEventButtonClick(this._callback.deleteClick);

    this.#setDatePickers();
  };

  removeElement = () => {
    super.removeElement();

    if (this.#dateFromPicker || this.#dateToPicker) {
      this.#dateFromPicker.destroy();
      this.#dateToPicker.destroy();
      this.#dateFromPicker = null;
      this.#dateToPicker = null;
    }
  };

  reset = (event) => {
    this.updateElement(EditEventView.parseEventToState(event));
  };
}
