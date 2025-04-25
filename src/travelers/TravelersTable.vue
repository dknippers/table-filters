<script setup lang="tsx">
import TableComponent from '@/table/TableComponent.vue';
import type { Column, SortState } from '@/table/types';
import type { Traveler, TravelerSortColumn } from './types.ts';
import StackedCell from '@/table/StackedCell.vue';

defineProps<{
    data: Traveler[];
    sort?: SortState;
    loading: boolean;
}>();

const columns: Column<Traveler, TravelerSortColumn>[] = [
    {
        header: "Name",
        value: traveler => traveler.name,
        sortColumn: "name"
    },
    {
        header: "Cards",
        render: traveler => <StackedCell items={traveler.cards.map(card => card.cardType)} />
    },
    {
        header: "Expiration",
        render: traveler => <StackedCell items={traveler.cards.map(card => card.expirationDate.toLocaleDateString())} />
    }
];
</script>

<template>
    <TableComponent :columns="columns" :data="data" :sort="sort" :loading="loading" />
</template>
