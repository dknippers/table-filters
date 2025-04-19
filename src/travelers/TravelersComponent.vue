<script setup lang="ts">
import { ref } from 'vue';
import SearchboxComponent from '@/searchbox/SearchboxComponent.vue';
import TravelersTable from './TravelersTable.vue';
import { useTravelers } from './useTravelers';

const query = ref("");
const { filtered } = useTravelers(query);
</script>

<template>
    <SearchboxComponent v-model="query" />
    <TravelersTable :travelers="filtered" />
</template>
