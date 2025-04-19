<script setup lang="ts">
import { ref } from 'vue';
import SearchboxComponent from '@/searchbox/SearchboxComponent.vue';
import TravelersTable from './TravelersTable.vue';
import { useTravelers } from './useTravelers';

const query = ref("");
const { filtered } = useTravelers(query);
</script>

<template>
    <div class="travelers">
        <div class="filters">
            <SearchboxComponent v-model="query" placeholder="filter name or card type" />
        </div>

        <TravelersTable :data="filtered" />
    </div>

</template>

<style lang="less" scoped>
.travelers {
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr 3fr;
}
</style>