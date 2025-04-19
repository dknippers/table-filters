export type Traveler = {
  name: string;
  cards: Card[];
};

export type Card = {
  id: string;
  cardType: CardType;
  expirationDate: Date;
};

export const cardTypes = ["Anonymous", "Personal"] as const;

export type CardType = (typeof cardTypes)[number];
