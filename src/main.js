import { render } from './framework/render.js';

import TripEventsApiService from './trip-events-api-service.js';
const AUTHORIZATION = 'Basic slo34rlodir984uj';
const END_POINT = 'https://18.ecmascript.pages.academy/big-trip';
const tripEventsApiService = new TripEventsApiService(END_POINT, AUTHORIZATION);

import TripEventsModel from './model/trip-events-model.js';
import DestinationsModel from './model/destinations-model.js';
import OffersByTypeModel from './model/offers-by-type-model.js';
import FilterModel from './model/filter-model.js';

import TripEventsPresenter from './presenter/trip-events-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';

import AddEventButtonView from './view/add-event-button-view.js';
const addEventButtonComponent = new AddEventButtonView();
const addEventButtonContainer = document.querySelector('.trip-main');

const filterContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

const tripEventsModel = new TripEventsModel(tripEventsApiService);
const destinationsModel = new DestinationsModel(tripEventsApiService);
const offersByTypeModel = new OffersByTypeModel(tripEventsApiService);
const filterModel = new FilterModel();

const tripEventsPresenter = new TripEventsPresenter(tripEventsContainer, tripEventsModel, destinationsModel, offersByTypeModel, filterModel);
const filterPresenter = new FilterPresenter(filterContainer, filterModel, tripEventsModel);

const onAddEventFormClose = () => {
  addEventButtonComponent.element.disabled = false;
};

const onAddEventButtonClick = () => {
  tripEventsPresenter.createTripEvent(onAddEventFormClose);
  addEventButtonComponent.element.disabled = true;
};

filterPresenter.init();

tripEventsPresenter.init();

Promise.all([destinationsModel.init(), offersByTypeModel.init(), tripEventsModel.init()])
  .then(() => {
    render(addEventButtonComponent, addEventButtonContainer);
    addEventButtonComponent.setOnAddEventButtonClick(onAddEventButtonClick);
  });
