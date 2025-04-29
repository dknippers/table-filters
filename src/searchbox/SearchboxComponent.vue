<script setup lang="ts">
import { debounce } from '@/utils/utils';
import { computed } from 'vue';

const model = defineModel<string>({ required: true });
defineProps<{ placeholder?: string }>();

const debouncedSetValue = debounce((v: string) => (model.value = v), 400);

const input = computed({
  get: () => model.value,
  set: debouncedSetValue,
});
</script>

<template>
  <input type="text" v-model="input" :placeholder="placeholder" />
</template>

<style scoped>
input {
  padding: 0.5rem;
}
</style>
