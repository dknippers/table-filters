<script setup lang="ts">
import SearchboxComponent from '@/searchbox/SearchboxComponent.vue';
import TravelersTable from './TravelersTable.vue';
import { cardTypes } from './types';
import { useTravelers } from './useTravelers';
import CheckboxList from '@/filters/CheckboxList.vue';
import PagerComponent from '@/paging/PagerComponent.vue';

const { travelers, filters, totalPages, loading, clearFilters } = useTravelers();
</script>

<template>
  <div class="travelers">
    <div class="filters">
      <SearchboxComponent v-model="filters.query" placeholder="filter name or card type" :debounce-ms="400" />

      <CheckboxList
        v-model="filters.cardTypes"
        :title="'Card type'"
        :items="cardTypes.map(cardType => ({ label: cardType, value: cardType }))"
      />

      <button @click="clearFilters" class="clear-filters">Clear filters</button>
    </div>

    <div class="table">
      <TravelersTable
        :data="travelers"
        v-model:sorty-by="filters.sortBy"
        v-model:sort-order="filters.sortOrder"
        :loading="loading"
      />

      <PagerComponent v-model:page="filters.page" v-model:page-size="filters.pageSize" :total-pages="totalPages" />
    </div>
  </div>
</template>

<style scoped>
.travelers {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 3fr;
}

.filters {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.table {
  display: grid;
  gap: 1rem;
}

.clear-filters {
  background: #2e3436;
  color: white;
  padding: 0.5rem 1rem;
  font-size: 1rem;
}

.clear-filters:hover {
  cursor: pointer;
  background: rgb(0, 0, 0, 0.9);
}
</style>
