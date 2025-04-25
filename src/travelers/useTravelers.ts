import { computed, ref, watch } from "vue";
import type { CardType, Traveler, TravelerSortColumn } from "./types";
import { filterTravelers } from "./travelerFilters";
import type { SortState } from "@/table/types";
import { sortFn, debounce } from "@/utils/utils";
import { sortTravelers } from "./travelerSorting";

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
  const loading = ref(true);

  const travelers = ref<Traveler[]>([]);

  let last = 0;
  async function fetchTravelers() {
    const params = new URLSearchParams();

    if (query.value) params.append("query", query.value);
    if (cardTypes.value.length) {
      cardTypes.value.forEach(ct => params.append("cardTypes", ct));
    }
    if (sort.value.column) params.append("sortColumn", sort.value.column);
    params.append("sortAsc", String(sort.value.asc));

    const qs = params.toString();
    const url = `/_api/travelers/all${qs.length > 0 ? `?${qs}` : ""}`;
    console.log(`Calling ${url}`);

    const active = ++last;

    try {
      loading.value = true;
      const delay = 500 + Math.random() * 300;
      await new Promise(resolve => setTimeout(resolve, delay));

      if (active !== last) {
        // A newer fetch has started -- drop this stale result.
        return;
      }

      const sorted = sortTravelers(all, sort.value.column, sort.value.asc);
      const filtered = filterTravelers(sorted, query.value, cardTypes.value);
      travelers.value = [...filtered];
    } catch {
      console.error("Error fetching from server");
    } finally {
      if (active === last) {
        loading.value = false;
      }
    }
  }

  watch([cardTypes, sort], fetchTravelers, { deep: true, immediate: true });
  watch([query], debounce(fetchTravelers, 320));

  return {
    travelers,
    filters,
    sort,
    loading,
  };
}

export function useTravelersClient() {
  const query = ref("");
  const cardTypes = ref<CardType[]>([]);
  const filters = ref({ query, cardTypes });
  const sort = ref<SortState<TravelerSortColumn>>({ column: "name", asc: true });

  const travelers = computed(() => {
    const filtered = filterTravelers(all, query.value, cardTypes.value);
    return sortTravelers(filtered, sort.value.column, sort.value.asc);
  });

  return {
    travelers,
    filters,
    sort,
  };
}
