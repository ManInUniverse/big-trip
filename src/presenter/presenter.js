import { render } from '../render.js';

import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';

export default class Presenter {
  filterComponent = new FilterView();
  sortComponent = new SortView();

  init = (container) => {
    this.container = container;

    render(this.filterComponent, this.container);

  }
}
