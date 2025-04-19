<script setup lang="ts">
import TableComponent from '@/table/TableComponent.vue';
import type { Column } from '@/table/types';
import TextComponent from '@/components/TextComponent.vue'
import type { Traveler } from './types.ts';

defineProps<{
    travelers: Traveler[];
}>();

const columns: Column<Traveler>[] = [
    {
        header: "Name",
        value: traveler => traveler.name,
    },
    {
        header: "Age",
        render: traveler => ({
            component: TextComponent,
            props: {
                text: "TODO_AGE"
            }
        })
    },
    {
        header: "Combined",
        value: traveler => "TODO_COMBINED",
    },
]
</script>

<template>
    <TableComponent :columns="columns" :data="travelers" />
</template>
