import AbstractView from '../framework/view/abstract-view.js';

const createFilterItemsTemplate = (filters, currentFilterType) => filters.map(({ type, name }) =>
  `<div class="trip-filters__filter">
    <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" ${type === currentFilterType ? 'checked' : ''}>
    <label class="trip-filters__filter-label" for="filter-${type}">${name}</label>
  </div>`
).join('');

const createFilterTemplate = (filters, currentFilterType) => `
  <form class="trip-filters" action="#" method="get">
    ${createFilterItemsTemplate(filters, currentFilterType)}

    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>
`;

export default class FilterView extends AbstractView {
  #filters = null;
  #currentFilter = null;

  constructor(filters, currentFilterType) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilter);
  }

  setOnFilterTypeChange = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('change', this.#onFilterTypeChange);
  };

  #onFilterTypeChange = (evt) => {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  };
}
