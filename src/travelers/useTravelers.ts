import { reactive, ref, watchEffect } from 'vue';
import type { Traveler, TravelerFilters } from './types';
import { useFetch } from '@/composables/useFetch';
import { createQueryString } from '@/utils/createQueryString';
import type { Page } from '@/paging/types';
import { mapTraveler } from './travelerMapper';

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
  const travelers = ref<Traveler[]>([]);
  const { fetchData, loading, error } = useFetch<Page<Traveler>>('http://localhost:8080/travelers');

  function clearFilters() {
    filters.query = '';
    filters.cardTypes = [];
    filters.page = 1;
  }

  async function fetchTravelers() {
    const qs = createQueryString(filters);
    const page = await fetchData(qs);
    if (page == null) {
      return;
    }

    travelers.value = page.items.map(traveler => mapTraveler(traveler));
    totalPages.value = page.totalPages;
  }

  watchEffect(async () => {
    await fetchTravelers();
  });

  return {
    travelers,
    filters,
    loading,
    error,
    totalPages,
    clearFilters,
  };
}
