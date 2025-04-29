import { ref, watch } from 'vue';
import type { CardType, Traveler, TravelerSortColumn } from './types';
import type { SortState } from '@/table/types';
import { debounce } from '@/utils/utils';
import { getTravelers } from './travelerRepository';

const DEFAULT_PAGE_SIZE = 5;

export function useTravelers() {
  const query = ref('');
  const page = ref(1);
  const pageSize = ref(DEFAULT_PAGE_SIZE);
  const totalPages = ref(0);
  const cardTypes = ref<CardType[]>([]);
  const filters = ref({ query, cardTypes });
  const sort = ref<SortState<TravelerSortColumn>>({ column: 'name', asc: true });
  const paging = ref({ page, pageSize, totalPages });
  const loading = ref(true);

  const travelers = ref<Traveler[]>([]);

  function clearFilters() {
    query.value = '';
    cardTypes.value = [];
    page.value = 1;
  }

  let last = 0;
  async function fetchTravelers() {
    const active = ++last;

    try {
      loading.value = true;

      const pagedTravelers = await getTravelers(
        query.value,
        cardTypes.value,
        sort.value.column,
        sort.value.asc,
        page.value,
        pageSize.value
      );

      if (pagedTravelers == null) {
        return;
      }

      if (active !== last) {
        // A newer fetch has started -- drop this stale result.
        return;
      }

      totalPages.value = pagedTravelers?.totalPages;
      travelers.value = pagedTravelers.items;
    } catch {
      console.error('Error fetching from server');
    } finally {
      if (active === last) {
        loading.value = false;
      }
    }
  }

  const debouncedFetch = debounce(() => {
    if (page.value !== 1) {
      // Will trigger a refetch via watch on page
      page.value = 1;
      return;
    }

    // Explicit fetch
    fetchTravelers();
  }, 400);

  watch(
    [cardTypes, sort, pageSize, page, query],
    (
      [newCardTypes, newSort, newPageSize, newPage, newQuery],
      [oldCardTypes, oldSort, oldPageSize, oldPage, oldQuery]
    ) => {
      const sortChanged = newSort.column !== oldSort?.column || newSort.asc !== oldSort.asc;
      const pageSizeChanged = newPageSize !== oldPageSize;
      const pageChanged = newPage !== oldPage;
      const queryChanged = newQuery !== oldQuery;
      const cardTypesChanged =
        newCardTypes.length !== oldCardTypes?.length ||
        newCardTypes.some(ct => !oldCardTypes.includes(ct));

      const anyFilterChanged = sortChanged || pageSizeChanged || cardTypesChanged || queryChanged;

      if (pageChanged) {
        fetchTravelers();
        return;
      }

      if (queryChanged && !sortChanged && !pageSizeChanged && !cardTypesChanged) {
        debouncedFetch();
        return;
      }

      if (anyFilterChanged && page.value !== 1) {
        page.value = 1;
        return;
      }

      // Filters changed on page 1
      fetchTravelers();
    },
    { deep: true, immediate: true }
  );

  return {
    travelers,
    filters,
    sort,
    paging,
    loading,
    clearFilters,
  };
}
