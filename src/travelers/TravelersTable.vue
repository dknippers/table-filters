<script setup lang="tsx">
import TableComponent from '@/table/TableComponent.vue';
import type { Column, SortOrder } from '@/table/types';
import type { Traveler, TravelerSortBy } from './types.ts';
import StackedCell from '@/table/StackedCell.vue';
import { useCssModule } from 'vue';

const sortBy = defineModel<TravelerSortBy>('sortyBy');
const sortOrder = defineModel<SortOrder>('sortOrder');
const style = useCssModule();

defineProps<{
  data: Traveler[];
  loading?: boolean;
  error?: boolean;
}>();

const columns: Column<Traveler, TravelerSortBy>[] = [
  {
    header: 'Name',
    value: traveler => traveler.name,
    sortBy: 'name',
  },
  {
    header: 'Cards',
    render: traveler => (
      <StackedCell
        items={traveler.cards.map(card => (
          <span class={style.cardType}>{card.cardType}</span>
        ))}
      />
    ),
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
    :error="error"
  />
</template>

<style module>
.cardType {
  font-weight: bold;
}
</style>
