<script setup lang="ts">
defineProps<{
  label: string;
  value: number | string;
}>();
</script>

<template>
  <div class="flex w-full items-center justify-between">
    <span class="text-xl">{{ label }}</span>
    <span class="text-2xl font-bold">{{ value }}</span>
  </div>
</template>

<style scoped></style>
