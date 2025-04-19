<script setup lang="ts">
import type { Card } from './types';

defineProps<{
    cards: Card[]
}>();
</script>

<template>
    <div class="cards">
        <div v-for="card in cards" :key="card.id">
            <div class="card">
                {{ card.expirationDate.toLocaleDateString() }}
            </div>
        </div>
    </div>
</template>

<style scoped>
.cards {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}
</style>