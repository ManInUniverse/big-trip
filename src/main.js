import { render } from './render.js';
import FilterView from './view/filter-view.js';
import SortingView from './view/sorting-view.js';


const tripFiltersContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

render(new FilterView(), tripFiltersContainer);
render(new SortingView(), tripEventsContainer);

