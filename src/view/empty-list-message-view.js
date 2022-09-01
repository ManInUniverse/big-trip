import { createElement } from '../render.js';

const createEmptyListMessageTemplate = () => `
  <p class="trip-events__msg">Click New Event to create your first point</p>
`;

export default class EmptyListMessageView {
  #element = null;

  get template() {
    return createEmptyListMessageTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
