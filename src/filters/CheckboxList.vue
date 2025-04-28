<script setup lang="ts" generic="T">
const model = defineModel<T[]>({ required: true });
defineProps<{
  title?: string;
  items: { label: string; value: T }[];
}>();
</script>

<template>
  <div class="checkbox-list">
    <div v-if="title" class="title">{{ title }}</div>
    <label v-for="item in items">
      <input type="checkbox" :value="item.value" v-model="model" />
      {{ item.label }}
    </label>
  </div>
</template>

<style lang="less" scoped>
.checkbox-list {
  display: flex;
  flex-direction: column;

  > .title {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
}
</style>
