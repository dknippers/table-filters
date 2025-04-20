import { computed, ref } from "vue";
import type { CardType, Traveler, TravelerSortColumn } from "./types";
import { filterCardTypes, filterQuery } from "./travelerFilters";
import type { SortState } from "@/table/types";
import { sortFn } from "@/utils/utils";

let id = 0;

const all: Traveler[] = [
  {
    id: ++id,
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
    id: ++id,
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
    id: ++id,
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
  const sort = ref<SortState<TravelerSortColumn>>({ column: "name", asc: true });

  const travelers = computed(() => {
    const filtered = filterTravelers(all);
    return sortTravelers(filtered);
  });

  function filterTravelers(travelers: Traveler[]) {
    return travelers.filter(
      traveler => filterQuery(traveler, query.value) && filterCardTypes(traveler, cardTypes.value)
    );
  }

  function sortTravelers(travelers: Traveler[]) {
    switch (sort.value.column) {
      case "id":
        return sortFn(travelers, t => t.id, sort.value.asc);
      case "name":
        return sortFn(travelers, t => t.name, sort.value.asc);
      default:
        return travelers; // No sort
    }
  }

  return {
    travelers,
    filters,
    sort,
  };
}
