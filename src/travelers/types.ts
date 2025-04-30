import type { SortOrder } from '@/table/types';

export type Traveler = {
  id: number;
  name: string;
  cards: Card[];
};

export type Card = {
  id: string;
  cardType: CardType;
  expirationDate: Date;
};

export const cardTypes = ['Anonymous', 'Personal'] as const;

export type CardType = (typeof cardTypes)[number];

export type TravelerSortBy = 'id' | 'name';

export type TravelerFilters = {
  query: string;
  cardTypes: CardType[];
  sortBy: TravelerSortBy;
  sortOrder: SortOrder;
  page: number;
  pageSize: number;
};
