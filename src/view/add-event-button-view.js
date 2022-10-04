import AbstractView from '../framework/view/abstract-view';

const createAddEventButtonTemplate = () => (`
  <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>
  `);

export default class AddEventButtonView extends AbstractView {
  get template() {
    return createAddEventButtonTemplate();
  }

  setOnAddEventButtonClick = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#onAddEventButtonClick);
  };

  #onAddEventButtonClick = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };
}
