import { reactive, ref, watch, watchEffect } from 'vue';
import type { Traveler, TravelerFilters } from './types';
import { getTravelers } from './travelerRepository';

export function useTravelers(initial: Partial<TravelerFilters> = {}) {
  const filters = reactive<TravelerFilters>({
    query: initial.query ?? '',
    cardTypes: initial.cardTypes ?? [],
    sortBy: initial.sortBy ?? 'name',
    sortOrder: initial.sortOrder ?? 'asc',
    page: initial.page ?? 1,
    pageSize: initial.pageSize ?? 5,
  });

  const totalPages = ref(0);
  const loading = ref(true);
  const travelers = ref<Traveler[]>([]);

  const isStale = ref(true);

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

      totalPages.value = pagedTravelers.totalPages;
      travelers.value = pagedTravelers.items;
    } catch {
      console.error('Error fetching from server');
    } finally {
      loading.value = false;
    }
  }

  watch(
    () => [filters.query, filters.cardTypes, filters.sortBy, filters.sortOrder, filters.pageSize],
    () => {
      filters.page = 1;
      isStale.value = true;
    }
  );

  watch(
    () => filters.page,
    () => {
      isStale.value = true;
    }
  );

  watchEffect(async () => {
    if (isStale.value) {
      await fetchTravelers();
      isStale.value = false;
    }
  });

  return {
    travelers,
    filters,
    loading,
    totalPages,
    clearFilters,
  };
}
