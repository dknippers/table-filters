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
                <th v-for="column in columns" :key="column.name">{{ column.name }}</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="item in data">
                <td v-for="column in columns" :key="column.name">
                    <template v-if="column.render">
                        <template v-for="{ component, props } in [column.render(item)]">
                            <component :is="component" v-bind="props" />
                        </template>
                    </template>
                    <template v-else>
                        <span>{{ column.value(item) }}</span>
                    </template>
                </td>
            </tr>
        </tbody>
    </table>
</template>