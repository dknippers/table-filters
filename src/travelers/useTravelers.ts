import { computed, ref } from "vue";
import type { CardType, Traveler } from "./types";
import { filterCardTypes, filterQuery } from "./travelerFilters";

let id = 0;

const all: Traveler[] = [
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

export function useTravelers() {
  const query = ref("");
  const cardTypes = ref<CardType[]>([]);
  const filters = ref({ query, cardTypes });

  const travelers = computed(() =>
    all.filter(
      traveler => filterQuery(traveler, query.value) && filterCardTypes(traveler, cardTypes.value)
    )
  );

  return {
    travelers,
    filters,
  };
}
