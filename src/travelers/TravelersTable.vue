<script setup lang="ts">
import TableComponent from '@/table/TableComponent.vue';
import type { Column } from '@/table/types';
import type { Traveler } from './types.ts';
import TravelersTableCards from './TravelersTableCardTypes.vue';
import TravelersTableCardExpirationDates from './TravelersTableCardExpirationDates.vue';

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
            component: TravelersTableCards,
            props: {
                cards: traveler.cards
            }
        })
    },
    {
        header: "Expiration",
        render: traveler => ({
            component: TravelersTableCardExpirationDates,
            props: {
                cards: traveler.cards
            }
        })
    },
]
</script>

<template>
    <TableComponent :columns="columns" :data="data" />
</template>
