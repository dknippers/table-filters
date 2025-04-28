<script setup lang="ts">
import { computed } from 'vue';

const page = defineModel<number>('page', { required: true });
const pageSize = defineModel<number>('pageSize', { required: true });

const props = defineProps<{
  totalPages: number;
}>();

const pages = computed(() => {
  const pages = [];

  const N = 2;

  pages.push(1);

  for (let i = 2; i < props.totalPages; i++) {
    if (Math.abs(page.value - i) <= N && !pages.includes(i)) {
      pages.push(i);
    }
  }

  if (props.totalPages > 1) {
    pages.push(props.totalPages);
  }

  return pages;
});
</script>

<template>
  <div class="container">
    <div>
      <div class="pager" v-if="totalPages > 1">
        <template v-for="(nr, idx) in pages" :key="nr">
          <div class="spacer" v-if="idx > 0 && pages[idx - 1] !== nr - 1">...</div>
          <button type="button" @click="page = nr" :class="{ active: nr === page }">
            {{ nr }}
          </button>
        </template>
      </div>
    </div>

    <div class="page-size">
      <select title="Page size" v-model="pageSize">
        <option v-for="value in [5, 10, 15, 20]" :value="value">{{ value }}</option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 5fr 1fr;
}

.pager {
  display: flex;
  gap: 1rem;
}

.page-size {
  display: flex;
  justify-content: flex-end;
}

select {
  padding: 0.5rem;
}

button {
  padding: 0.5rem 1rem;
}

.spacer {
  padding: 0.5rem 0;
}

button:hover {
  cursor: pointer;
}

.active {
  background: #2e3436;
  color: white;
}
</style>
