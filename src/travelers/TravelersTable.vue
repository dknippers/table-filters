<script setup lang="tsx">
import TableComponent from '@/table/TableComponent.vue';
import type { Column } from '@/table/types';
import type { Traveler } from './types.ts';
import StackedCell from '@/table/StackedCell.vue';

defineProps<{
    data: Traveler[];
}>();

const columns: Column<Traveler>[] = [
    {
        header: "Name",
        value: traveler => traveler.name,
    },
    {
        header: "Cards",
        render: traveler => <StackedCell items={traveler.cards.map(card => card.cardType)} />
    },
    {
        header: "Expiration",
        render: traveler => <StackedCell items={traveler.cards.map(card => card.expirationDate.toLocaleDateString())} />
    }
]
</script>

<template>
    <TableComponent :columns="columns" :data="data" />
</template>
