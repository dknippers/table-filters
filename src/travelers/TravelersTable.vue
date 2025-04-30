<script setup lang="tsx">
import TableComponent from '@/table/TableComponent.vue';
import type { Column, SortOrder } from '@/table/types';
import type { Traveler, TravelerSortBy } from './types.ts';
import StackedCell from '@/table/StackedCell.vue';

const sortBy = defineModel<TravelerSortBy>('sortyBy');
const sortOrder = defineModel<SortOrder>('sortOrder');

defineProps<{
  data: Traveler[];
  loading: boolean;
}>();

const columns: Column<Traveler, TravelerSortBy>[] = [
  {
    header: 'Name',
    value: traveler => traveler.name,
    sortBy: 'name',
  },
  {
    header: 'Cards',
    render: traveler => <StackedCell items={traveler.cards.map(card => card.cardType)} />,
  },
  {
    header: 'Expiration',
    render: traveler => <StackedCell items={traveler.cards.map(card => card.expirationDate.toLocaleDateString())} />,
  },
];
</script>

<template>
  <TableComponent
    :columns="columns"
    :data="data"
    v-model:sorty-by="sortBy"
    v-model:sort-order="sortOrder"
    :loading="loading"
  />
</template>
