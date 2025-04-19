<script setup lang="ts" generic="T">
import type { Column } from './types';

defineProps<{
    columns: Column<T>[];
    data: T[];
}>();
</script>

<template>
    <table>
        <thead>
            <tr>
                <th v-for="column in columns" :key="column.header">{{ column.header }}</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="item in data">
                <td v-for="column in columns" :key="column.header">
                    <template v-if="column.value">
                        <span>{{ column.value(item) }}</span>
                    </template>
                    <template v-else-if="column.render">
                        <template v-for="{ component, props } in [column.render(item)]">
                            <component :is="component" v-bind="props" />
                        </template>
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
    }
}
</style>