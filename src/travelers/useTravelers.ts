import { computed, reactive } from 'vue';
import type { Traveler, TravelerFilters } from './types';
import { useFetch } from '@/composables/useFetch';
import { createQueryString } from '@/utils/createQueryString';
import type { Page } from '@/paging/types';
import { mapTraveler } from './travelerMapper';

const BASE_URL = 'http://localhost:8080/_api/travelers/getall';

export function useTravelers(initial: Partial<TravelerFilters> = {}) {
  const filters = reactive<TravelerFilters>({
    query: initial.query ?? '',
    cardTypes: initial.cardTypes ?? [],
    sortBy: initial.sortBy ?? 'name',
    sortOrder: initial.sortOrder ?? 'asc',
    page: initial.page ?? 1,
    pageSize: initial.pageSize ?? 5,
  });

  const url = computed(() => {
    const qs = createQueryString(filters);
    return `${BASE_URL}${qs.length > 0 ? `?${qs}` : ''}`;
  });

  const { data: page, loading, error } = useFetch<Page<Traveler>>(url);

  const travelers = computed(() => page.value?.items.map(traveler => mapTraveler(traveler)) ?? []);
  const totalPages = computed(() => page.value?.totalPages ?? 0);

  function clearFilters() {
    filters.query = '';
    filters.cardTypes = [];
    filters.page = 1;
  }

  return {
    travelers,
    filters,
    loading,
    error,
    totalPages,
    clearFilters,
  };
}
