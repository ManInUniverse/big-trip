import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

export default class DestinationsModel extends Observable {
  #tripEventsApiService = null;
  #destinations = [];

  constructor (tripEventsApiService) {
    super();
    this.#tripEventsApiService = tripEventsApiService;
  }

  get destinations() {
    return this.#destinations;
  }

  init = async () => {
    try {
      this.#destinations = await this.#tripEventsApiService.destinations;
    } catch(err) {
      this.#destinations = [];
    }

    this._notify(UpdateType.INIT);
  };
}
