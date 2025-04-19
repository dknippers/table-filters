<script setup lang="ts" generic="T">
defineProps<{
    items: T[];
}>();
</script>

<template>
    <div class="items">
        <div v-for="(item, index) in items" :key="index">
            <slot :item="item" />
        </div>
    </div>
</template>

<style scoped>
.items {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}
</style>
