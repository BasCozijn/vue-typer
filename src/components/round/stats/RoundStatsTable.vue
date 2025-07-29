<script setup lang="ts">
import RoundStatsTableRow from '@/components/round/stats/RoundStatsTableRow.vue';

defineProps<{
  rows: { label: string; value: number }[];
}>();
</script>

<template>
  <div class="mx-auto flex w-full max-w-sm flex-col rounded bg-amber-100 p-3 shadow">
    <ul class="flex flex-col gap-2">
      <RoundStatsTableRow
        v-for="row in rows"
        :key="row.label"
        :label="row.label"
        :value="row.value"
      ></RoundStatsTableRow>
    </ul>
  </div>
</template>

<style scoped></style>
