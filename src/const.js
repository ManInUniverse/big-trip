const SortingType = {
  DAY: 'day',
  PRICE: 'price'
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future'
};

const UserAction = {
  UPDATE_EVENT: 'UPDATE_EVENT',
  ADD_EVENT: 'ADD_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export { SortingType, UserAction, UpdateType, FilterType };
