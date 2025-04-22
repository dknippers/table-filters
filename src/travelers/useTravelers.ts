import { computed, ref, watch } from "vue";
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

export function useTravelers(queryServer: boolean) {
  const query = ref("");
  const cardTypes = ref<CardType[]>([]);
  const filters = ref({ query, cardTypes });
  const sort = ref<SortState<TravelerSortColumn>>({ column: "name", asc: true });

  const serverResults = ref<Traveler[]>([]);

  const travelers = computed(() => {
    if (queryServer) {
      return serverResults.value;
    }

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
        return travelers;
    }
  }

  // Debounced fetch
  let debounceTimer: ReturnType<typeof setTimeout> | null = null;

  function debouncedFetch() {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      fetchFromServer();
    }, 320);
  }

  async function fetchFromServer() {
    const params = new URLSearchParams();

    if (query.value) params.append("query", query.value);
    if (cardTypes.value.length) {
      cardTypes.value.forEach(ct => params.append("cardTypes", ct));
    }
    if (sort.value.column) params.append("sortColumn", sort.value.column);
    params.append("sortAsc", String(sort.value.asc));

    const url = `/_api/travelers/all?${params.toString()}`;
    console.log(`Calling ${url}`);

    const delay = 500 + Math.random() * 300;
    await new Promise(resolve => setTimeout(resolve, delay));

    serverResults.value = [...sortTravelers(filterTravelers(all))];
  }

  if (queryServer) {
    watch([query, cardTypes, sort], debouncedFetch, { immediate: true, deep: true });
  }

  return {
    travelers,
    filters,
    sort,
  };
}
