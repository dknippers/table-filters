import { sortFn } from '@/utils/utils';
import type { Traveler, TravelerSortBy } from './types';
import type { SortOrder } from '@/table/types';

export function sortTravelers(travelers: Traveler[], column: TravelerSortBy, sortOrder: SortOrder) {
  const asc = sortOrder === 'asc';
  switch (column) {
    case 'id':
      return sortFn(travelers, t => t.id, asc);
    case 'name':
      return sortFn(travelers, t => t.name, asc);
    default:
      return travelers;
  }
}
