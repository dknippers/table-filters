<script setup lang="ts">
defineProps<{
    text?: string;
}>();

</script>

<template>
    {{ text ?? "TODO_TEXT" }}
</template>