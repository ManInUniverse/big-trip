import { getRandomInteger } from '../utils/common-utils.js';

const DESTINATIONS = [
  {
    id: 1,
    name: 'New York City',
    description: 'New York is the most populous city in the United States. Located at the southern tip of New York State, the city is the center of the New York metropolitan area, the largest metropolitan area in the world by urban landmass.',
    pictures: [
      {
        src: `http://picsum.photos/248/152?r=${getRandomInteger(1, 10)}`,
        description: 'Gapstow Bridge'
      },
      {
        src: `http://picsum.photos/248/152?r=${getRandomInteger(1, 10)}`,
        description: 'Central Park'
      },
      {
        src: `http://picsum.photos/248/152?r=${getRandomInteger(1, 10)}`,
        description: 'Midtown Manhattan'
      },
      {
        src: `http://picsum.photos/248/152?r=${getRandomInteger(1, 10)}`,
        description: 'The Financial District'
      },
      {
        src: `http://picsum.photos/248/152?r=${getRandomInteger(1, 10)}`,
        description: 'The Deutsche Bank Center'
      }
    ]
  },
  {
    id: 2,
    name: 'Berlin',
    description: 'Berlin is the capital and largest city of Germany by both area and population. Its 3.7 million inhabitants make it the European Union\'s most populous city, according to population within city limits.',
    pictures: [
      {
        src: `http://picsum.photos/248/152?r=${getRandomInteger(1, 10)}`,
        description: 'Berlin Palace'
      },
      {
        src: `http://picsum.photos/248/152?r=${getRandomInteger(1, 10)}`,
        description: 'The Berlin Wall'
      },
      {
        src: `http://picsum.photos/248/152?r=${getRandomInteger(1, 10)}`,
        description: 'Panorama of the Gendarmenmarkt'
      },
      {
        src: `http://picsum.photos/248/152?r=${getRandomInteger(1, 10)}`,
        description: 'The Berlin Cathedral at Museum Island'
      },
      {
        src: `http://picsum.photos/248/152?r=${getRandomInteger(1, 10)}`,
        description: 'Charlottenburg Palace'
      }
    ]
  },
  {
    id: 3,
    name: 'Tokyo',
    description: 'Tokyo is the capital and largest city of Japan. Its metropolitan area is the most populous in the world, with an estimated 37.468 million residents in 2018. Tokyo is the political and economic center of the country, as well as the seat of the Emperor of Japan and the national government.',
    pictures: [
      {
        src: `http://picsum.photos/248/152?r=${getRandomInteger(1, 10)}`,
        description: 'Tokyo Metropolitan Government Building'
      },
      {
        src: `http://picsum.photos/248/152?r=${getRandomInteger(1, 10)}`,
        description: 'Ogasawara National Park'
      },
      {
        src: `http://picsum.photos/248/152?r=${getRandomInteger(1, 10)}`,
        description: 'Panoramic view of Tokyo from Tokyo Skytree'
      },
      {
        src: `http://picsum.photos/248/152?r=${getRandomInteger(1, 10)}`,
        description: 'Tokyo Tower at night'
      },
      {
        src: `http://picsum.photos/248/152?r=${getRandomInteger(1, 10)}`,
        description: 'The National Museum of Emerging Science and Innovation'
      }
    ]
  }
];

const getDestinations = () => DESTINATIONS;

export { getDestinations };
