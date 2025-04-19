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
        expirationDate: new Date(2026, 0, 1),
      },
      {
        id: `${++id}`,
        cardType: "Personal",
        expirationDate: new Date(2027, 0, 1),
      },
    ],
  },
  {
    name: "Bravo",
    cards: [
      {
        id: `${++id}`,
        cardType: "Anonymous",
        expirationDate: new Date(2026, 0, 1),
      },
      {
        id: `${++id}`,
        cardType: "Anonymous",
        expirationDate: new Date(2027, 0, 1),
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
  const filtered = computed(() =>
    travelers.filter(item => item.name.toLowerCase().includes(query.value.toLowerCase()))
  );

  return {
    travelers,
    filtered,
  };
}
