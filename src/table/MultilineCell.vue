<script setup lang="ts">
defineProps<{
    lines: string[]
}>();
</script>

<template>
    <div class="lines">
        <div v-for="(line, index) in lines" :key="index">
            {{ line }}
        </div>
    </div>
</template>

<style scoped>
.lines {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}
</style>