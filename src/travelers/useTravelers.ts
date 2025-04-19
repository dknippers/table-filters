import { computed } from "vue";
import type { Ref } from "vue";
import type { CardType, Traveler } from "./types";

let id = 0;

const travelers: Traveler[] = [
  {
    name: "Alpha",
    cards: [
      {
        id: `${++id}`,
        cardType: "Anonymous",
        expirationDate: new Date(2026, 3, 12),
      },
      {
        id: `${++id}`,
        cardType: "Personal",
        expirationDate: new Date(2027, 7, 15),
      },
    ],
  },
  {
    name: "Bravo",
    cards: [
      {
        id: `${++id}`,
        cardType: "Anonymous",
        expirationDate: new Date(2024, 2, 5),
      },
    ],
  },
  {
    name: "Charlie",
    cards: [
      {
        id: `${++id}`,
        cardType: "Anonymous",
        expirationDate: new Date(2028, 3, 1),
      },
      {
        id: `${++id}`,
        cardType: "Anonymous",
        expirationDate: new Date(2025, 6, 21),
      },
    ],
  },
];

function matchCardTypes(traveler: Traveler, cardTypes: CardType[]) {
  return cardTypes.length === 0 || traveler.cards.some(card => cardTypes.includes(card.cardType));
}

function matchQuery(traveler: Traveler, query: string) {
  return matchTerm(traveler.name) || traveler.cards.some(card => matchTerm(card.cardType));

  function matchTerm(term: string) {
    return term.toLowerCase().includes(query.toLowerCase());
  }
}

export function useTravelers(query: Ref<string>, cardTypes: Ref<CardType[]>) {
  const filtered = computed(() =>
    travelers.filter(
      traveler => matchQuery(traveler, query.value) && matchCardTypes(traveler, cardTypes.value)
    )
  );

  return {
    travelers,
    filtered,
  };
}
