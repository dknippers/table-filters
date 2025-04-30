<script setup lang="ts">
import { debounce } from '@/utils/utils';
import { computed } from 'vue';

const model = defineModel<string>({ required: true });
const props = defineProps<{ placeholder?: string; debounceMs?: number }>();

const inputModel =
  props.debounceMs && props.debounceMs > 0
    ? computed({
        get: () => model.value,
        set: debounce((value: string) => {
          model.value = value;
        }, props.debounceMs),
      })
    : model;
</script>

<template>
  <input type="text" v-model="inputModel" :placeholder="placeholder" />
</template>

<style scoped>
input {
  padding: 0.5rem;
}
</style>
