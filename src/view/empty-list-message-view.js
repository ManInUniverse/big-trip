import AbstractView from '../framework/view/abstract-view.js';

const createEmptyListMessageTemplate = () => `
  <p class="trip-events__msg">Click New Event to create your first point</p>
`;

export default class EmptyListMessageView extends AbstractView {
  get template() {
    return createEmptyListMessageTemplate();
  }
}
