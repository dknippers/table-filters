import { sortFn } from '@/utils/utils';
import type { Traveler, TravelerSortColumn } from './types';
import type { Column } from '@/table/types';

export function sortTravelers(travelers: Traveler[], column: TravelerSortColumn, asc: boolean) {
  switch (column) {
    case 'id':
      return sortFn(travelers, t => t.id, asc);
    case 'name':
      return sortFn(travelers, t => t.name, asc);
    default:
      return travelers;
  }
}
