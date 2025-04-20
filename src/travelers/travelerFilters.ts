import type { CardType, Traveler } from "./types";

export function filterQuery(traveler: Traveler, query: string): boolean {
  const words = query.split(" ").filter(Boolean);
  return words.every(
    word =>
      contains(traveler.name, word) || traveler.cards.some(card => contains(card.cardType, word))
  );

  function contains(haystack: string, needle: string): boolean {
    return haystack.toLowerCase().includes(needle.toLowerCase());
  }
}

export function filterCardTypes(traveler: Traveler, cardTypes: CardType[]): boolean {
  return cardTypes.length === 0 || traveler.cards.some(card => cardTypes.includes(card.cardType));
}
