<script setup lang="ts">
import TableComponent from '@/table/TableComponent.vue';
import type { Column } from '@/table/types';
import type { Traveler } from './types.ts';
import MultilineCell from '@/table/MultilineCell.vue';


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
        render: traveler => ({
            component: MultilineCell,
            props: {
                lines: traveler.cards.map(card => card.cardType)
            }
        })
    },
    {
        header: "Expiration",
        render: traveler => ({
            component: MultilineCell,
            props: {
                lines: traveler.cards.map(card => card.expirationDate.toLocaleDateString())
            }
        })
    },
]
</script>

<template>
    <TableComponent :columns="columns" :data="data" />
</template>
