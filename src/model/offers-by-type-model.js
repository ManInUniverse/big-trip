import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

export default class OffersByTypeModel extends Observable {
  #tripEventsApiService = null;
  #offersByType = [];

  constructor (tripEventsApiService) {
    super();
    this.#tripEventsApiService = tripEventsApiService;
  }

  get offersByType() {
    return this.#offersByType;
  }

  init = async () => {
    try {
      this.#offersByType = await this.#tripEventsApiService.offersByType;
    } catch(err) {
      this.#offersByType = [];
    }

    this._notify(UpdateType.INIT);
  };
}
