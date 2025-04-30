<script setup lang="ts" generic="T">
import type { Column, SortOrder } from './types';

const sortBy = defineModel<string>('sortyBy');
const sortOrder = defineModel<SortOrder>('sortOrder');

defineProps<{
  columns: Column<T>[];
  data: T[];
  loading: boolean;
}>();

function handleSort(column: Column<T>) {
  if (sortBy == null || column.sortBy == null) {
    return;
  }

  if (sortBy.value === column.sortBy) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortOrder.value = 'asc';
  }

  sortBy.value = column.sortBy;
}
</script>

<template>
  <table>
    <thead>
      <tr>
        <th
          v-for="column in columns"
          :key="column.header"
          @click="handleSort(column)"
          :class="{ sort: column.sortBy != null }"
        >
          {{ column.header }}

          <span class="sort-icon" v-if="column.sortBy && column.sortBy === sortBy && sortOrder === 'asc'">▲</span>
          <span class="sort-icon" v-if="column.sortBy && column.sortBy === sortBy && sortOrder === 'desc'">▼</span>
          <span class="sort-icon" v-if="column.sortBy && column.sortBy !== sortBy">△</span>
        </th>
      </tr>
    </thead>

    <tbody>
      <tr v-if="loading">
        <td :colspan="columns.length" class="display">
          <div class="loader">Loading ...</div>
        </td>
      </tr>

      <tr v-if="!loading && data.length === 0">
        <td :colspan="columns.length" class="display">
          <div class="text">No results</div>
        </td>
      </tr>

      <tr v-if="!loading && data.length > 0" v-for="item in data">
        <td v-for="column in columns" :key="column.header">
          <template v-if="column.value">
            <span>{{ column.value(item) }}</span>
          </template>

          <template v-else-if="column.render">
            <component :is="column.render(item)" />
          </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="less" scoped>
table {
  border-collapse: collapse;

  td,
  th {
    vertical-align: top;
    padding: 0.5rem 1rem;
    border: 1px solid gray;
  }

  th {
    background-color: #2e3436;
    color: white;

    &.sort:hover {
      cursor: pointer;
    }

    &.sort > .sort-icon {
      font-size: 80%;
    }
  }
}

.display {
  vertical-align: middle;
}

.loader,
.text {
  font-size: 2rem;
  padding: 1rem;
  text-align: center;
}
</style>
