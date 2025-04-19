import { computed } from "vue";
import type { Ref } from "vue";
import type { Traveler } from "./types";

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

export function useTravelers(query: Ref<string>) {
  function includes(term: string) {
    return term.toLowerCase().includes(query.value.toLowerCase());
  }

  const filtered = computed(() =>
    travelers.filter(
      item => includes(item.name) || item.cards.some(card => includes(card.cardType))
    )
  );

  return {
    travelers,
    filtered,
  };
}
