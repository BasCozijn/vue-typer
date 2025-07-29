<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { storeToRefs } from 'pinia';

import RoundStatsTable from '@/components/round/stats/RoundStatsTable.vue';

import { useRoundStore } from '@/stores/roundStore';

const roundStore = useRoundStore();
const { round, isFinished } = storeToRefs(roundStore);

const cpm = ref(0);
const wpm = ref(0);

const statsInterval = ref<ReturnType<typeof setInterval> | null>(null);

function startInterval() {
  statsInterval.value = setInterval(() => {
    const timer = Math.max(Date.now() - (round.value.startedAt ?? 0), 1) / 1_000;

    cpm.value = Math.round((60 / timer) * round.value.typedChars);
    wpm.value = Math.round(((60 / timer) * round.value.typedChars) / 5);
  }, 200);
}

function stopInterval() {
  statsInterval.value && clearInterval(statsInterval.value);
}

watchEffect((onCleanup) => {
  if (round.value.active && !isFinished.value) {
    startInterval();
    onCleanup(stopInterval);
  } else {
    stopInterval();
  }
});
</script>

<template>
  <div>
    <RoundStatsTable
      :rows="[
        { label: 'CPM', value: cpm },
        { label: 'WPM', value: wpm },
      ]"
    ></RoundStatsTable>
  </div>
</template>

<style scoped></style>
