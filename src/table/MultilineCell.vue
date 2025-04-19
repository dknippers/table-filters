<script setup lang="ts">
import MultilineSlot from "./MultilineSlot.vue";

defineProps<{
    lines: string[]
}>();
</script>

<template>
    <MultilineSlot :items="lines">
        <template #default="{ item }">
            {{ item }}
        </template>
    </MultilineSlot>
</template>
