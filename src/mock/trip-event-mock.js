import { getRandomInteger, getRandomArrayElement } from '../utils.js';
import { getDestinations } from './destinations-mock.js';
import { getOffers } from './offers-mock.js';

const destinationsData = getDestinations();
const offersData = getOffers();
const typesOfTravel = offersData.map((offer) => offer.type);

const getOffersByType = (typeOfTravel) => offersData.find((offer) => typeOfTravel === offer.type).offers;
const getOffersId = (offersByType) => offersByType.map((offer) => offer.id);

const generateTripEvent = () => {
  const typeOfTravel = getRandomArrayElement(typesOfTravel);
  return {
    basePrice: getRandomInteger(100, 1000),
    dateFrom: '2019-07-10T22:55:56',
    dateTo: '2019-07-10T22:55:56',
    destination: getRandomArrayElement(destinationsData).id,
    id: getRandomInteger(0, 1000),
    type: typeOfTravel,
    offers: getOffersId(getOffersByType(typeOfTravel))
  };
};

export { destinationsData, generateTripEvent };
