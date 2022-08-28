import { getRandomInteger, getRandomArrayElement } from '../utils.js';
import { getDestinations } from '../mock/destinations.js';
import { getOffers } from '../mock/offers.js';

const destinations = getDestinations();
const offers = getOffers();
const typesOfTravel = offers.map((offer) => offer.type);

const getOffersByType = (typeOfTravel) => offers.find((offer) => typeOfTravel === offer.type).offers;
const getOffersId = (offersByType) => offersByType.map((offer) => offer.id);

const generateTripEvent = () => {
  const typeOfTravel = getRandomArrayElement(typesOfTravel);
  return {
    basePrice: getRandomInteger(100, 1000),
    dateFrom: null,
    dateTo: null,
    destination: getRandomArrayElement(destinations).id,
    id: getRandomInteger(0, 1000),
    type: typeOfTravel,
    offers: getOffersId(getOffersByType(typeOfTravel))
  };
};

export { generateTripEvent };
