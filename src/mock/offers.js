const OFFERS_BY_TYPE = [
  {
    type: 'taxi',
    offers: [
      {
        id: 1,
        title: 'Increase driving speed',
        price: 150
      },
      {
        id: 2,
        title: 'Turn on your music',
        price: 20
      }
    ]
  },
  {
    type: 'bus',
    offers: [
      {
        id: 1,
        title: 'Turn on the air conditioner',
        price: 50
      },
      {
        id: 2,
        title: 'Include food',
        price: 100
      },
      {
        id: 3,
        title: 'Transportation of pets',
        price: 250
      }
    ]
  },
  {
    type: 'train',
    offers: [
      {
        id: 1,
        title: 'Place of increased comfort',
        price: 300
      },
      {
        id: 2,
        title: 'Access to the restaurant',
        price: 50
      },
      {
        id: 3,
        title: 'Include bed sheets',
        price: 120
      }
    ]
  },
  {
    type: 'ship',
    offers: [
      {
        id: 1,
        title: 'VIP deck access',
        price: 500
      },
      {
        id: 2,
        title: 'Access to the fitness room',
        price: 230
      }
    ]
  },
  {
    type: 'drive',
    offers: [
      {
        id: 1,
        title: 'Car with automatic transmission',
        price: 560
      },
      {
        id: 2,
        title: 'Car accident insurance',
        price: 300
      }
    ]
  },
  {
    type: 'flight',
    offers: [
      {
        id: 1,
        title: 'Add luggage',
        price: 30
      },
      {
        id: 2,
        title: 'Switch to comfort class',
        price: 100
      },
      {
        id: 3,
        title: 'Add meal',
        price: 15
      },
      {
        id: 4,
        title: 'Choose seats',
        price: 5
      },
      {
        id: 5,
        title: 'Travel by train',
        price: 40
      }
    ]
  },
  {
    type: 'check-in',
    offers: [
      {
        id: 1,
        title: 'Add travel companion',
        price: 1000
      }
    ]
  },
  {
    type: 'sightseeing',
    offers: [
      {
        id: 1,
        title: 'Ability to stop on demand',
        price: 150
      },
      {
        id: 2,
        title: 'Personal photographer',
        price: 650
      }
    ]
  },
  {
    type: 'restaurant',
    offers: [
      {
        id: 1,
        title: 'Meeting with the chef',
        price: 200
      },
      {
        id: 2,
        title: '2 dishes of your choice',
        price: 200
      },
      {
        id: 3,
        title: 'All inclusive',
        price: 350
      }
    ]
  }
];

const getOffers = () => OFFERS_BY_TYPE;

export { getOffers };
