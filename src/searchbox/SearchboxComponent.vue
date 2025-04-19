<script setup lang="ts">
const model = defineModel<string>({ required: true });
</script>

<template>
    <input type="text" v-model="model" placeholder="Filter ..." />
</template>
