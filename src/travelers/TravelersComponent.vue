<script setup lang="ts">
import { ref } from 'vue';
import SearchboxComponent from '@/searchbox/SearchboxComponent.vue';
import TravelersTable from './TravelersTable.vue';
import { cardTypes, type CardType } from './types';
import { useTravelers } from './useTravelers';

const query = ref("");
const selectedCardTypes = ref<CardType[]>([]);

const { filtered } = useTravelers(query, selectedCardTypes);
</script>

<template>
    <div class="travelers">
        <div class="filters">
            <SearchboxComponent v-model="query" placeholder="filter name or card type" />

            <div class="filter">
                <div class="title">Card type</div>
                <label v-for="cardType in cardTypes">
                    <input type="checkbox" :value="cardType" v-model="selectedCardTypes">
                    {{ cardType }}
                </label>
            </div>
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

.filters {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .filter {
        display: flex;
        flex-direction: column;

        >.title {
            font-weight: bold;
            margin-bottom: 0.5rem;
        }
    }
}
</style>