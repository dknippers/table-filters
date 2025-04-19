<script setup lang="tsx">
import TableComponent from '@/table/TableComponent.vue';
import type { Column } from '@/table/types';
import type { Card, Traveler } from './types.ts';
import MultilineCell from '@/table/MultilineCell.vue';
import MultilineSlot from '@/table/MultilineSlot.vue';


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
        render: traveler => <MultilineCell lines={traveler.cards.map(card => card.cardType)} />
    },
    {
        header: "Expiration",
        render: traveler => <MultilineCell lines={traveler.cards.map(card => card.expirationDate.toLocaleDateString())} />
    },
]
</script>

<template>
    <TableComponent :columns="columns" :data="data" />
</template>
