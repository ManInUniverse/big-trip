import { render } from './framework/render.js';
import { generateEvent, destinations, offersByType } from './mock/event-mock.js';

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

const tripEventsModel = new TripEventsModel(Array.from({ length: 10 }, generateEvent));
const destinationsModel = new DestinationsModel(destinations);
const offersByTypeModel = new OffersByTypeModel(offersByType);
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

render(addEventButtonComponent, addEventButtonContainer);
addEventButtonComponent.setOnAddEventButtonClick(onAddEventButtonClick);

filterPresenter.init();
tripEventsPresenter.init();
