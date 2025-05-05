import type { Traveler } from './types';

export function mapTraveler(traveler: Traveler): Traveler {
  // Date fields from the server are not converted to Date objects, so we need to do it manually
  return {
    ...traveler,
    cards: traveler.cards.map(card => ({
      ...card,
      expirationDate: parseDate(card.expirationDate),
    })),
  };

  function parseDate(value: any) {
    if (typeof value !== 'string' || value.length === 0) {
      return value;
    }

    return new Date(value);
  }
}
