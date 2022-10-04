import AbstractView from '../framework/view/abstract-view.js';
import { FilterType } from '../const.js';

const EmptyListMessageTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
};

const createEmptyListMessageTemplate = (filterType) => {
  const EmptyListMessageTextValue = EmptyListMessageTextType[filterType];
  return (`<p class="trip-events__msg">${EmptyListMessageTextValue}</p>`);
};

export default class EmptyListMessageView extends AbstractView {
  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createEmptyListMessageTemplate(this.#filterType);
  }
}
