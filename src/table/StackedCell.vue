<script setup lang="ts">
import { isVNode, type VNode } from 'vue';
defineProps<{
  items: (string | number | boolean | VNode)[];
}>();
</script>

<template>
  <div class="items">
    <div v-for="(item, index) in items" :key="index">
      <component v-if="isVNode(item)" :is="item" />
      <span v-else>{{ item }}</span>
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
