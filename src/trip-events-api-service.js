import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
};

export default class TripEventsApiService extends ApiService {
  get events() {
    return this._load({url: 'points'})
      .then(ApiService.parseResponse);
  }

  get destinations() {
    return this._load({url: 'destinations'})
      .then(ApiService.parseResponse);
  }

  get offersByType() {
    return this._load({url: 'offers'})
      .then(ApiService.parseResponse);
  }

  updateEvent = async (event) => {
    const response = await this._load({
      url: `points/${event.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(event)),
      headers: new Headers({'Content-Type': 'application/json'})
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };

  addEvent = async (event) => {
    const response = await this._load({
      url: 'points',
      method: Method.POST,
      body: JSON.stringify(this.#adaptToServer(event)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };

  deleteEvent = async (event) => {
    const response = await this._load({
      url: `points/${event.id}`,
      method: Method.DELETE,
    });

    return response;
  };

  #adaptToServer = (event) => {
    const adaptedEvent = {...event,
      'base_price': Number(event.basePrice),
      'date_from': event.dateFrom instanceof Date ? event.dateFrom.toISOString() : null,
      'date_to': event.dateTo instanceof Date ? event.dateTo.toISOString() : null
    };

    delete adaptedEvent.basePrice;
    delete adaptedEvent.dateFrom;
    delete adaptedEvent.dateTo;

    return adaptedEvent;
  };
}
