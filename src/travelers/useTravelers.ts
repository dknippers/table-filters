import { computed, ref, watch } from "vue";
import type { CardType, Traveler, TravelerSortColumn } from "./types";
import { filterTravelers } from "./travelerFilters";
import type { SortState } from "@/table/types";
import { debounce } from "@/utils/utils";
import { sortTravelers } from "./travelerSorting";

const DEFAULT_PAGE_SIZE = 5;

let id = 0;

let all: Traveler[] = [
  {
    id: ++id,
    name: "Alpha",
    cards: [
      { id: `${++id}`, cardType: "Personal", expirationDate: new Date(2025, 5, 10) },
      { id: `${++id}`, cardType: "Anonymous", expirationDate: new Date(2027, 11, 23) },
    ],
  },
  {
    id: ++id,
    name: "Bravo",
    cards: [{ id: `${++id}`, cardType: "Anonymous", expirationDate: new Date(2026, 2, 15) }],
  },
  {
    id: ++id,
    name: "Charlie",
    cards: [{ id: `${++id}`, cardType: "Anonymous", expirationDate: new Date(2029, 1, 5) }],
  },
  {
    id: ++id,
    name: "Delta",
    cards: [
      { id: `${++id}`, cardType: "Personal", expirationDate: new Date(2024, 7, 19) },
      { id: `${++id}`, cardType: "Anonymous", expirationDate: new Date(2026, 9, 30) },
    ],
  },
  {
    id: ++id,
    name: "Echo",
    cards: [{ id: `${++id}`, cardType: "Anonymous", expirationDate: new Date(2028, 0, 11) }],
  },
  {
    id: ++id,
    name: "Foxtrot",
    cards: [
      { id: `${++id}`, cardType: "Anonymous", expirationDate: new Date(2025, 3, 20) },
      { id: `${++id}`, cardType: "Personal", expirationDate: new Date(2027, 5, 15) },
    ],
  },
  {
    id: ++id,
    name: "Golf",
    cards: [{ id: `${++id}`, cardType: "Anonymous", expirationDate: new Date(2026, 8, 3) }],
  },
  {
    id: ++id,
    name: "Hotel",
    cards: [{ id: `${++id}`, cardType: "Personal", expirationDate: new Date(2029, 4, 12) }],
  },
  {
    id: ++id,
    name: "India",
    cards: [{ id: `${++id}`, cardType: "Personal", expirationDate: new Date(2025, 10, 18) }],
  },
  {
    id: ++id,
    name: "Juliett",
    cards: [{ id: `${++id}`, cardType: "Anonymous", expirationDate: new Date(2024, 1, 9) }],
  },
  {
    id: ++id,
    name: "Kilo",
    cards: [
      { id: `${++id}`, cardType: "Personal", expirationDate: new Date(2028, 7, 27) },
      { id: `${++id}`, cardType: "Anonymous", expirationDate: new Date(2025, 6, 14) },
    ],
  },
  {
    id: ++id,
    name: "Lima",
    cards: [{ id: `${++id}`, cardType: "Personal", expirationDate: new Date(2026, 11, 4) }],
  },
  {
    id: ++id,
    name: "Mike",
    cards: [{ id: `${++id}`, cardType: "Anonymous", expirationDate: new Date(2025, 5, 25) }],
  },
  {
    id: ++id,
    name: "November",
    cards: [{ id: `${++id}`, cardType: "Personal", expirationDate: new Date(2027, 3, 2) }],
  },
  {
    id: ++id,
    name: "Oscar",
    cards: [{ id: `${++id}`, cardType: "Personal", expirationDate: new Date(2028, 8, 8) }],
  },
  {
    id: ++id,
    name: "Papa",
    cards: [{ id: `${++id}`, cardType: "Anonymous", expirationDate: new Date(2026, 0, 1) }],
  },
  {
    id: ++id,
    name: "Quebec",
    cards: [
      { id: `${++id}`, cardType: "Anonymous", expirationDate: new Date(2029, 6, 17) },
      { id: `${++id}`, cardType: "Anonymous", expirationDate: new Date(2027, 2, 28) },
    ],
  },
  {
    id: ++id,
    name: "Romeo",
    cards: [{ id: `${++id}`, cardType: "Personal", expirationDate: new Date(2024, 4, 5) }],
  },
  {
    id: ++id,
    name: "Sierra",
    cards: [{ id: `${++id}`, cardType: "Anonymous", expirationDate: new Date(2025, 9, 22) }],
  },
  {
    id: ++id,
    name: "Tango",
    cards: [{ id: `${++id}`, cardType: "Anonymous", expirationDate: new Date(2026, 1, 14) }],
  },
  {
    id: ++id,
    name: "Uniform",
    cards: [{ id: `${++id}`, cardType: "Personal", expirationDate: new Date(2027, 8, 19) }],
  },
  {
    id: ++id,
    name: "Victor",
    cards: [{ id: `${++id}`, cardType: "Personal", expirationDate: new Date(2025, 7, 11) }],
  },
  {
    id: ++id,
    name: "Whiskey",
    cards: [{ id: `${++id}`, cardType: "Anonymous", expirationDate: new Date(2028, 2, 4) }],
  },
  {
    id: ++id,
    name: "X-ray",
    cards: [{ id: `${++id}`, cardType: "Personal", expirationDate: new Date(2024, 6, 30) }],
  },
  {
    id: ++id,
    name: "Yankee",
    cards: [{ id: `${++id}`, cardType: "Personal", expirationDate: new Date(2026, 4, 25) }],
  },
  {
    id: ++id,
    name: "Zulu",
    cards: [
      { id: `${++id}`, cardType: "Anonymous", expirationDate: new Date(2025, 11, 31) },
      { id: `${++id}`, cardType: "Personal", expirationDate: new Date(2027, 10, 20) },
    ],
  },
];

export function useTravelers() {
  const query = ref("");
  const page = ref(1);
  const pageSize = ref(DEFAULT_PAGE_SIZE);
  const totalPages = ref(0);
  const cardTypes = ref<CardType[]>([]);
  const filters = ref({ query, cardTypes });
  const sort = ref<SortState<TravelerSortColumn>>({ column: "name", asc: true });
  const paging = ref({ page, pageSize, totalPages });
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

    params.append("page", String(paging.value.page));
    params.append("pageSize", String(paging.value.pageSize));

    const qs = params.toString();
    const url = `/_api/travelers/all${qs.length > 0 ? `?${qs}` : ""}`;
    console.log(`Calling ${url}`);

    const active = ++last;

    try {
      loading.value = true;
      const delay = 500 + Math.random() * 250;
      await new Promise(resolve => setTimeout(resolve, delay));

      if (active !== last) {
        // A newer fetch has started -- drop this stale result.
        return;
      }

      const filtered = filterTravelers(all, query.value, cardTypes.value);
      const sorted = sortTravelers(filtered, sort.value.column, sort.value.asc);

      const paged = sorted.slice((page.value - 1) * pageSize.value, page.value * pageSize.value);
      totalPages.value = Math.ceil(sorted.length / pageSize.value);

      travelers.value = paged;
    } catch {
      console.error("Error fetching from server");
    } finally {
      if (active === last) {
        loading.value = false;
      }
    }
  }

  function refresh() {
    if (page.value !== 1) {
      // This will trigger a fetchTravelers via the watch
      page.value = 1;
    } else {
      // Page was already at 1 so do a refresh manually
      fetchTravelers();
    }
  }

  watch([page], fetchTravelers, { immediate: true });
  watch([cardTypes, sort, pageSize], refresh, { deep: true });
  watch([query], debounce(refresh, 320));

  return {
    travelers,
    filters,
    sort,
    paging,
    loading,
  };
}

export function useTravelersClient() {
  const query = ref("");
  const cardTypes = ref<CardType[]>([]);
  const filters = ref({ query, cardTypes });
  const sort = ref<SortState<TravelerSortColumn>>({ column: "name", asc: true });
  const page = ref(1);
  const pageSize = ref(DEFAULT_PAGE_SIZE);
  const totalPages = ref(0);
  const paging = ref({ page, pageSize, totalPages });
  const loading = ref(false);

  watch([query, cardTypes, sort, pageSize], () => (page.value = 1), { deep: true });

  const travelers = computed(() => {
    const filtered = filterTravelers(all, query.value, cardTypes.value);
    const sorted = sortTravelers(filtered, sort.value.column, sort.value.asc);
    const paged = sorted.slice((page.value - 1) * pageSize.value, page.value * pageSize.value);
    totalPages.value = Math.ceil(sorted.length / pageSize.value);

    return paged;
  });

  return {
    travelers,
    filters,
    sort,
    paging,
    loading,
  };
}
