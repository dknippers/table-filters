<script setup lang="ts">
import { computed, ref } from 'vue';
import TableComponent from '../table/TableComponent.vue';
import type { Column } from '../table/types';
import TextComponent from '../TextComponent.vue';
import type { Person } from './types';
import SearchboxComponent from '../searchbox/SearchboxComponent.vue';

const p1: Person = {
    name: "dani",
    age: 37,
}

const p2: Person = {
    name: "chen",
    age: 38
}

const columns: Column<Person>[] = [
    {
        header: "Name",
        value: person => person.name,
    },
    {
        header: "Age",
        render: person => ({
            component: TextComponent,
            props: {
                text: `${person.age}`
            }
        })
    },
    {
        header: "Combined",
        value: person => `${person.name} is ${person.age} years old`,
    },
]
const data = [p1, p2];

const query = ref("");

const filtered = computed(() => data.filter(item => item.name.toLowerCase().indexOf(query.value.toLowerCase()) > -1));

</script>

<template>
    <SearchboxComponent v-model="query" />
    <TableComponent :columns="columns" :data="filtered" />
</template>
