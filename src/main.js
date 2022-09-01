import { render } from './render.js';
import FilterView from './view/filter-view.js';

import TripEventsModel from './model/trip-events-model.js';

import TripEventsPresenter from './presenter/trip-events-presenter.js';

const tripFiltersContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

const tripEventsModel = new TripEventsModel();
const tripEventsPresenter = new TripEventsPresenter();

render(new FilterView(), tripFiltersContainer);

tripEventsPresenter.init(tripEventsContainer, tripEventsModel);
