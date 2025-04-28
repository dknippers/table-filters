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

export type TravelerSortColumn = 'id' | 'name';
