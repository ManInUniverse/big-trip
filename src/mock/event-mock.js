import { getRandomInteger, getRandomArrayElement, getRandomElementsFromArray } from '../utils/common-utils.js';
import { getDestinations } from './destinations-mock.js';
import { getOffersByType } from './offers-by-type-mock.js';

import { customAlphabet } from 'nanoid';
const nanoid = customAlphabet('1234567890', 10);

const destinations = getDestinations();
const offersByType = getOffersByType();
const eventTypes = offersByType.map((element) => element.type);

const getOffersByTargetType = (targetType) => offersByType.find((element) => element.type === targetType).offers;
const getOffersId = (offers) => offers.map((offer) => offer.id);

const generateEvent = () => {
  const eventType = getRandomArrayElement(eventTypes);
  const offersId = getOffersId(getOffersByTargetType(eventType));

  return {
    basePrice: getRandomInteger(100, 1000),
    dateFrom: `2019-0${getRandomInteger(1, 7)}-0${getRandomInteger(1, 9)}T22:55:56.845Z`,
    dateTo: `2019-0${getRandomInteger(7, 9)}-11T11:22:13.375Z`,
    destination: getRandomArrayElement(destinations).id,
    id: nanoid(),
    type: eventType,
    offers: getRandomElementsFromArray(offersId, getRandomInteger(1, offersId.length))
  };
};

export { destinations, offersByType, generateEvent };
