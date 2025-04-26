<script setup lang="ts">
import SearchboxComponent from '@/searchbox/SearchboxComponent.vue';
import TravelersTable from './TravelersTable.vue';
import { cardTypes } from './types';
import { useTravelers } from './useTravelers';
import CheckboxList from '@/filters/CheckboxList.vue';
import PagerComponent from '@/paging/PagerComponent.vue';

const { travelers, filters, sort, paging, loading } = useTravelers();
</script>

<template>
    <div class="travelers">
        <div class="filters">
            <SearchboxComponent v-model="filters.query" placeholder="filter name or card type" />

            <CheckboxList v-model="filters.cardTypes" :title="'Card type'"
                :items="cardTypes.map(cardType => ({ label: cardType, value: cardType }))" />
        </div>

        <div class="table">
            <TravelersTable :data="travelers" :sort="sort" :loading="loading" />

            <PagerComponent v-model:page="paging.page" v-model:page-size="paging.pageSize"
                :total-pages="paging.totalPages" />
        </div>
    </div>

</template>

<style scoped>
.travelers {
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr 3fr;
}

.filters {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.table {
    display: grid;
    gap: 1rem;
}
</style>