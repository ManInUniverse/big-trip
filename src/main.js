import { render } from './framework/render.js';

import TripEventsModel from './model/trip-events-model.js';
import FilterModel from './model/filter-model.js';

import TripEventsPresenter from './presenter/trip-events-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';

const filterContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

const tripEventsModel = new TripEventsModel();
const filterModel = new FilterModel();

const tripEventsPresenter = new TripEventsPresenter(tripEventsContainer, tripEventsModel, filterModel);
const filterPresenter = new FilterPresenter(filterContainer, filterModel, tripEventsModel);

filterPresenter.init();
tripEventsPresenter.init();
