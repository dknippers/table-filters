import { reactive, ref, watch } from 'vue';
import type { Traveler, TravelerFilters, TravelerSortColumn } from './types';
import { getTravelers } from './travelerRepository';

export function useTravelers(initial: Partial<TravelerFilters> = {}) {
  const filters = reactive<TravelerFilters>({
    query: initial.query ?? '',
    cardTypes: initial.cardTypes ?? [],
    sort: initial.sort ?? { column: 'name', asc: true },
    page: initial.page ?? 1,
    pageSize: initial.pageSize ?? 5,
  });

  const totalPages = ref(0);
  const loading = ref(true);
  const travelers = ref<Traveler[]>([]);

  function clearFilters() {
    filters.query = '';
    filters.cardTypes = [];
    filters.page = 1;
  }

  async function fetchTravelers() {
    try {
      loading.value = true;

      const pagedTravelers = await getTravelers(filters);

      if (pagedTravelers == null) {
        return;
      }

      totalPages.value = pagedTravelers?.totalPages;
      travelers.value = pagedTravelers.items;
    } catch {
      console.error('Error fetching from server');
    } finally {
      loading.value = false;
    }
  }

  watch(
    () => [filters.query, filters.cardTypes, filters.sort, filters.page, filters.pageSize],
    ([, , , newPage], [, , , oldPage]) => {
      if (oldPage === newPage && filters.page !== 1) {
        filters.page = 1;
        return;
      }

      fetchTravelers();
    },
    { deep: true }
  );

  fetchTravelers();

  return {
    travelers,
    filters,
    loading,
    totalPages,
    clearFilters,
  };
}
