import AbstractView from '../framework/view/abstract-view.js';
import { SortingType } from '../const.js';

const createSortingTemplate = (currentSortingType) => `
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    <div class="trip-sort__item  trip-sort__item--${SortingType.DAY}">
      <input id="sort-${SortingType.DAY}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SortingType.DAY}"  data-sorting-type="${SortingType.DAY}" ${currentSortingType === SortingType.DAY ? 'checked' : ''}>
      <label class="trip-sort__btn" for="sort-${SortingType.DAY}">${SortingType.DAY}</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--event">
      <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
      <label class="trip-sort__btn" for="sort-event">Event</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--time">
      <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time" disabled>
      <label class="trip-sort__btn" for="sort-time">Time</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--${SortingType.PRICE}">
      <input id="sort-${SortingType.PRICE}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SortingType.PRICE}"  data-sorting-type="${SortingType.PRICE}" ${currentSortingType === SortingType.PRICE ? 'checked' : ''}>
      <label class="trip-sort__btn" for="sort-${SortingType.PRICE}">${SortingType.PRICE}</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--offer">
      <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
      <label class="trip-sort__btn" for="sort-offer">Offers</label>
    </div>
  </form>
`;

export default class SortingView extends AbstractView {
  #currentSortingType = null;

  constructor(currentSortingType) {
    super();
    this.#currentSortingType = currentSortingType;
  }

  get template() {
    return createSortingTemplate(this.#currentSortingType);
  }

  setOnSortingTypeChange = (callback) => {
    this._callback.sortingTypeChange = callback;
    this.element.addEventListener('change', this.#onSortingTypeChange);
  };

  #onSortingTypeChange = (evt) => {
    if (!evt.target.closest('input[type="radio"].trip-sort__input')) {
      return;
    }

    evt.preventDefault();
    this._callback.sortingTypeChange(evt.target.dataset.sortingType);
  };
}
