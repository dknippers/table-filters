import type { Page } from '@/paging/types';
import { filterTravelers } from './travelerFilters';
import { sortTravelers } from './travelerSorting';
import type { Traveler, TravelerFilters } from './types';

let id = 0;

const all: Traveler[] = [
  {
    id: ++id,
    name: 'Alpha',
    cards: [
      { id: `${++id}`, cardType: 'Personal', expirationDate: new Date(2025, 5, 10) },
      { id: `${++id}`, cardType: 'Anonymous', expirationDate: new Date(2027, 11, 23) },
    ],
  },
  {
    id: ++id,
    name: 'Bravo',
    cards: [{ id: `${++id}`, cardType: 'Anonymous', expirationDate: new Date(2026, 2, 15) }],
  },
  {
    id: ++id,
    name: 'Charlie',
    cards: [{ id: `${++id}`, cardType: 'Anonymous', expirationDate: new Date(2029, 1, 5) }],
  },
  {
    id: ++id,
    name: 'Delta',
    cards: [
      { id: `${++id}`, cardType: 'Personal', expirationDate: new Date(2024, 7, 19) },
      { id: `${++id}`, cardType: 'Anonymous', expirationDate: new Date(2026, 9, 30) },
    ],
  },
  {
    id: ++id,
    name: 'Echo',
    cards: [{ id: `${++id}`, cardType: 'Anonymous', expirationDate: new Date(2028, 0, 11) }],
  },
  {
    id: ++id,
    name: 'Foxtrot',
    cards: [
      { id: `${++id}`, cardType: 'Anonymous', expirationDate: new Date(2025, 3, 20) },
      { id: `${++id}`, cardType: 'Personal', expirationDate: new Date(2027, 5, 15) },
    ],
  },
  {
    id: ++id,
    name: 'Golf',
    cards: [{ id: `${++id}`, cardType: 'Anonymous', expirationDate: new Date(2026, 8, 3) }],
  },
  {
    id: ++id,
    name: 'Hotel',
    cards: [{ id: `${++id}`, cardType: 'Personal', expirationDate: new Date(2029, 4, 12) }],
  },
  {
    id: ++id,
    name: 'India',
    cards: [{ id: `${++id}`, cardType: 'Personal', expirationDate: new Date(2025, 10, 18) }],
  },
  {
    id: ++id,
    name: 'Juliett',
    cards: [{ id: `${++id}`, cardType: 'Anonymous', expirationDate: new Date(2024, 1, 9) }],
  },
  {
    id: ++id,
    name: 'Kilo',
    cards: [
      { id: `${++id}`, cardType: 'Personal', expirationDate: new Date(2028, 7, 27) },
      { id: `${++id}`, cardType: 'Anonymous', expirationDate: new Date(2025, 6, 14) },
    ],
  },
  {
    id: ++id,
    name: 'Lima',
    cards: [{ id: `${++id}`, cardType: 'Personal', expirationDate: new Date(2026, 11, 4) }],
  },
  {
    id: ++id,
    name: 'Mike',
    cards: [{ id: `${++id}`, cardType: 'Anonymous', expirationDate: new Date(2025, 5, 25) }],
  },
  {
    id: ++id,
    name: 'November',
    cards: [{ id: `${++id}`, cardType: 'Personal', expirationDate: new Date(2027, 3, 2) }],
  },
  {
    id: ++id,
    name: 'Oscar',
    cards: [{ id: `${++id}`, cardType: 'Personal', expirationDate: new Date(2028, 8, 8) }],
  },
  {
    id: ++id,
    name: 'Papa',
    cards: [{ id: `${++id}`, cardType: 'Anonymous', expirationDate: new Date(2026, 0, 1) }],
  },
  {
    id: ++id,
    name: 'Quebec',
    cards: [
      { id: `${++id}`, cardType: 'Anonymous', expirationDate: new Date(2029, 6, 17) },
      { id: `${++id}`, cardType: 'Anonymous', expirationDate: new Date(2027, 2, 28) },
    ],
  },
  {
    id: ++id,
    name: 'Romeo',
    cards: [{ id: `${++id}`, cardType: 'Personal', expirationDate: new Date(2024, 4, 5) }],
  },
  {
    id: ++id,
    name: 'Sierra',
    cards: [{ id: `${++id}`, cardType: 'Anonymous', expirationDate: new Date(2025, 9, 22) }],
  },
  {
    id: ++id,
    name: 'Tango',
    cards: [{ id: `${++id}`, cardType: 'Anonymous', expirationDate: new Date(2026, 1, 14) }],
  },
  {
    id: ++id,
    name: 'Uniform',
    cards: [{ id: `${++id}`, cardType: 'Personal', expirationDate: new Date(2027, 8, 19) }],
  },
  {
    id: ++id,
    name: 'Victor',
    cards: [{ id: `${++id}`, cardType: 'Personal', expirationDate: new Date(2025, 7, 11) }],
  },
  {
    id: ++id,
    name: 'Whiskey',
    cards: [{ id: `${++id}`, cardType: 'Anonymous', expirationDate: new Date(2028, 2, 4) }],
  },
  {
    id: ++id,
    name: 'X-ray',
    cards: [{ id: `${++id}`, cardType: 'Personal', expirationDate: new Date(2024, 6, 30) }],
  },
  {
    id: ++id,
    name: 'Yankee',
    cards: [{ id: `${++id}`, cardType: 'Personal', expirationDate: new Date(2026, 4, 25) }],
  },
  {
    id: ++id,
    name: 'Zulu',
    cards: [
      { id: `${++id}`, cardType: 'Anonymous', expirationDate: new Date(2025, 11, 31) },
      { id: `${++id}`, cardType: 'Personal', expirationDate: new Date(2027, 10, 20) },
    ],
  },
];

export async function getTravelers(filters: TravelerFilters): Promise<Page<Traveler> | null> {
  const params = new URLSearchParams();

  if (filters.query) params.append('query', filters.query);
  if (filters.cardTypes.length) {
    filters.cardTypes.forEach(ct => params.append('cardTypes', ct));
  }
  if (filters.sort.column) params.append('sortColumn', filters.sort.column);
  params.append('sortAsc', String(filters.sort.asc));

  params.append('page', String(filters.page));
  params.append('pageSize', String(filters.pageSize));

  const qs = params.toString();
  const url = `/_api/travelers/all${qs.length > 0 ? `?${qs}` : ''}`;
  console.log(`Calling ${url}`);

  try {
    const delay = 500 + Math.random() * 250;
    await new Promise(resolve => setTimeout(resolve, delay));

    const filtered = filterTravelers(all, filters.query, filters.cardTypes);
    const sorted = sortTravelers(filtered, filters.sort.column, filters.sort.asc);
    const paged = sorted.slice((filters.page - 1) * filters.pageSize, filters.page * filters.pageSize);
    const totalPages = Math.ceil(sorted.length / filters.pageSize);

    return {
      items: paged,
      totalItems: sorted.length,
      totalPages,
      page: filters.page,
      pageSize: filters.pageSize,
    };
  } catch {
    console.error('Error fetching from server');
    return null;
  }
}
