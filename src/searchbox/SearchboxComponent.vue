<script setup lang="ts">
const model = defineModel<string>({ required: true });
defineProps<{ placeholder?: string }>();
</script>

<template>
  <input type="text" v-model="model" :placeholder="placeholder" />
</template>

<style lang="less" scoped>
input {
  padding: 0.5rem;
}
</style>
