import { createElement } from '../render.js';
import { formatEventDateTime } from '../utils.js';

const createOffersTemplate = (offersData, type, offers) => {
  const offersArrayByType = offersData.find((elem) => elem.type === type).offers;
  const currentOffersArray = offersArrayByType.filter((elem) => offers.includes(elem.id));

  const offersTemplatesArray = [];

  for (let i = 0; i < currentOffersArray.length; i++) {
    const { title, price } = currentOffersArray[i];
    const offerTemplate =
    `<li class="event__offer">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </li>`;
    offersTemplatesArray.push(offerTemplate);
  }
  return offersTemplatesArray.join('');
};

const createEventTemplate = (tripEvent, destinationsData, offersData) => {
  const { basePrice, dateFrom, dateTo, destination, type, offers } = tripEvent;
  const destinationName = destinationsData.find((dest) => dest.id === destination).name;

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${formatEventDateTime(dateFrom, 'YYYY-MM-DD')}">${formatEventDateTime(dateFrom, 'MMM DD')}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${destinationName}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${formatEventDateTime(dateFrom, 'YYYY-MM-DDTHH:mm')}">${formatEventDateTime(dateFrom, 'H:mm')}</time>
            &mdash;
            <time class="event__end-time" datetime="${formatEventDateTime(dateTo, 'YYYY-MM-DDTHH:mm')}">${formatEventDateTime(dateTo, 'H:mm')}</time>
          </p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${createOffersTemplate(offersData, type, offers)}
        </ul>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class EventView {
  constructor(tripEvent, destinationsData, offersData) {
    this.tripEvent = tripEvent;
    this.destinationsData = destinationsData;
    this.offersData = offersData;
  }

  getTemplate() {
    return createEventTemplate(this.tripEvent, this.destinationsData, this.offersData);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
