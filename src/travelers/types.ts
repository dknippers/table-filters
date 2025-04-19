export type Traveler = {
  name: string;
  cards: Card[];
};

export type Card = {
  id: string;
  cardType: CardType;
  expirationDate: Date;
};

export type CardType = "Anonymous" | "Personal";
