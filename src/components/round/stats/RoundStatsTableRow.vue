<script setup lang="ts">
import AnimatedNumberCount from '@/components/utils/AnimatedNumberCount.vue';

defineProps<{
  label: string;
  value: number;
}>();
</script>

<template>
  <div class="flex w-full items-center justify-between">
    <span class="text-xl">{{ label }}</span>
    <span class="text-2xl font-bold">
      <AnimatedNumberCount
        :value="value"
        :decimals="0"
      />
    </span>
  </div>
</template>

<style scoped></style>
