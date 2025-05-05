// server.js
const express = require('express');
const cors = require('cors'); // If you need to allow requests from different origins
const app = express();
const port = 8080;

app.use(cors()); // Enable CORS if needed

// Traveler data (from travelerRepository.ts)
let id = 0;
const all = [
  {
    id: ++id,
    name: 'Alpha',
    cards: [
      {
        id: `${++id}`,
        cardType: 'Personal',
        expirationDate: new Date(2025, 5, 10),
      },
      {
        id: `${++id}`,
        cardType: 'Anonymous',
        expirationDate: new Date(2027, 11, 23),
      },
    ],
  },
  {
    id: ++id,
    name: 'Bravo',
    cards: [
      {
        id: `${++id}`,
        cardType: 'Anonymous',
        expirationDate: new Date(2026, 2, 15),
      },
    ],
  },
  {
    id: ++id,
    name: 'Charlie',
    cards: [
      {
        id: `${++id}`,
        cardType: 'Anonymous',
        expirationDate: new Date(2029, 1, 5),
      },
    ],
  },
  {
    id: ++id,
    name: 'Delta',
    cards: [
      {
        id: `${++id}`,
        cardType: 'Personal',
        expirationDate: new Date(2024, 7, 19),
      },
      {
        id: `${++id}`,
        cardType: 'Anonymous',
        expirationDate: new Date(2026, 9, 30),
      },
    ],
  },
  {
    id: ++id,
    name: 'Echo',
    cards: [
      {
        id: `${++id}`,
        cardType: 'Anonymous',
        expirationDate: new Date(2028, 0, 11),
      },
    ],
  },
  {
    id: ++id,
    name: 'Foxtrot',
    cards: [
      {
        id: `${++id}`,
        cardType: 'Anonymous',
        expirationDate: new Date(2025, 3, 20),
      },
      {
        id: `${++id}`,
        cardType: 'Personal',
        expirationDate: new Date(2027, 5, 15),
      },
    ],
  },
  {
    id: ++id,
    name: 'Golf',
    cards: [
      {
        id: `${++id}`,
        cardType: 'Anonymous',
        expirationDate: new Date(2026, 8, 3),
      },
    ],
  },
  {
    id: ++id,
    name: 'Hotel',
    cards: [
      {
        id: `${++id}`,
        cardType: 'Personal',
        expirationDate: new Date(2029, 4, 12),
      },
    ],
  },
  {
    id: ++id,
    name: 'India',
    cards: [
      {
        id: `${++id}`,
        cardType: 'Personal',
        expirationDate: new Date(2025, 10, 18),
      },
    ],
  },
  {
    id: ++id,
    name: 'Juliett',
    cards: [
      {
        id: `${++id}`,
        cardType: 'Anonymous',
        expirationDate: new Date(2024, 1, 9),
      },
    ],
  },
  {
    id: ++id,
    name: 'Kilo',
    cards: [
      {
        id: `${++id}`,
        cardType: 'Personal',
        expirationDate: new Date(2028, 7, 27),
      },
      {
        id: `${++id}`,
        cardType: 'Anonymous',
        expirationDate: new Date(2025, 6, 14),
      },
    ],
  },
  {
    id: ++id,
    name: 'Lima',
    cards: [
      {
        id: `${++id}`,
        cardType: 'Personal',
        expirationDate: new Date(2026, 11, 4),
      },
    ],
  },
  {
    id: ++id,
    name: 'Mike',
    cards: [
      {
        id: `${++id}`,
        cardType: 'Anonymous',
        expirationDate: new Date(2025, 5, 25),
      },
    ],
  },
  {
    id: ++id,
    name: 'November',
    cards: [
      {
        id: `${++id}`,
        cardType: 'Personal',
        expirationDate: new Date(2027, 3, 2),
      },
    ],
  },
  {
    id: ++id,
    name: 'Oscar',
    cards: [
      {
        id: `${++id}`,
        cardType: 'Personal',
        expirationDate: new Date(2028, 8, 8),
      },
    ],
  },
  {
    id: ++id,
    name: 'Papa',
    cards: [
      {
        id: `${++id}`,
        cardType: 'Anonymous',
        expirationDate: new Date(2026, 0, 1),
      },
    ],
  },
  {
    id: ++id,
    name: 'Quebec',
    cards: [
      {
        id: `${++id}`,
        cardType: 'Anonymous',
        expirationDate: new Date(2029, 6, 17),
      },
      {
        id: `${++id}`,
        cardType: 'Anonymous',
        expirationDate: new Date(2027, 2, 28),
      },
    ],
  },
  {
    id: ++id,
    name: 'Romeo',
    cards: [
      {
        id: `${++id}`,
        cardType: 'Personal',
        expirationDate: new Date(2024, 4, 5),
      },
    ],
  },
  {
    id: ++id,
    name: 'Sierra',
    cards: [
      {
        id: `${++id}`,
        cardType: 'Anonymous',
        expirationDate: new Date(2025, 9, 22),
      },
    ],
  },
  {
    id: ++id,
    name: 'Tango',
    cards: [
      {
        id: `${++id}`,
        cardType: 'Anonymous',
        expirationDate: new Date(2026, 1, 14),
      },
    ],
  },
  {
    id: ++id,
    name: 'Uniform',
    cards: [
      {
        id: `${++id}`,
        cardType: 'Personal',
        expirationDate: new Date(2027, 8, 19),
      },
    ],
  },
  {
    id: ++id,
    name: 'Victor',
    cards: [
      {
        id: `${++id}`,
        cardType: 'Personal',
        expirationDate: new Date(2025, 7, 11),
      },
    ],
  },
  {
    id: ++id,
    name: 'Whiskey',
    cards: [
      {
        id: `${++id}`,
        cardType: 'Anonymous',
        expirationDate: new Date(2028, 2, 4),
      },
    ],
  },
  {
    id: ++id,
    name: 'X-ray',
    cards: [
      {
        id: `${++id}`,
        cardType: 'Personal',
        expirationDate: new Date(2024, 6, 30),
      },
    ],
  },
  {
    id: ++id,
    name: 'Yankee',
    cards: [
      {
        id: `${++id}`,
        cardType: 'Personal',
        expirationDate: new Date(2026, 4, 25),
      },
    ],
  },
  {
    id: ++id,
    name: 'Zulu',
    cards: [
      {
        id: `${++id}`,
        cardType: 'Anonymous',
        expirationDate: new Date(2025, 11, 31),
      },
      {
        id: `${++id}`,
        cardType: 'Personal',
        expirationDate: new Date(2027, 10, 20),
      },
    ],
  },
];

// --- Filter Functions (from travelerFilters.ts) ---
function filterQuery(traveler, query) {
  const words = query.split(' ').filter(Boolean);
  return words.every(
    word => contains(traveler.name, word) || traveler.cards.some(card => contains(card.cardType, word))
  );

  function contains(haystack, needle) {
    return haystack.toLowerCase().includes(needle.toLowerCase());
  }
}

function filterCardTypes(traveler, cardTypes) {
  return cardTypes.length === 0 || traveler.cards.some(card => cardTypes.includes(card.cardType));
}

function filterTravelers(travelers, query, cardTypes) {
  return travelers.filter(traveler => filterQuery(traveler, query) && filterCardTypes(traveler, cardTypes));
}

// --- Sort Function (from travelerSorting.ts) ---
function sortTravelers(travelers, column, sortOrder) {
  const asc = sortOrder === 'asc';
  switch (column) {
    case 'id':
      return [...travelers].sort((a, b) => (asc ? a.id - b.id : b.id - a.id));
    case 'name':
      return [...travelers].sort((a, b) => (asc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)));
    default:
      return travelers;
  }
}

// --- Main API Endpoint ---
app.get('/_api/travelers/getall', (req, res) => {
  const { query, cardTypes, sortBy, sortOrder, page, pageSize } = req.query;

  // Check if cardTypes exists and is already an array (when multiple values are sent)
  // or if it's a single string that needs to be split.
  const cardTypesArray = Array.isArray(cardTypes)
    ? cardTypes // It's already an array from multiple query params
    : cardTypes // It's a single string
      ? cardTypes.split(',') // Split the single string
      : []; // Default to an empty array if not provided

  let filteredTravelers = all;

  filteredTravelers = filterTravelers(filteredTravelers, query ?? '', cardTypesArray);

  let sortedTravelers = sortTravelers(filteredTravelers, sortBy, sortOrder);

  const pageNumber = parseInt(page) || 1;
  const pageSizeNumber = parseInt(pageSize) || 5;
  const pagedTravelers = sortedTravelers.slice((pageNumber - 1) * pageSizeNumber, pageNumber * pageSizeNumber);

  const totalPages = Math.ceil(sortedTravelers.length / pageSizeNumber);

  res.json({
    items: pagedTravelers,
    totalItems: sortedTravelers.length,
    totalPages: totalPages,
    page: pageNumber,
    pageSize: pageSizeNumber,
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
