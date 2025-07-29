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
    if (!round.value) return;

    const timer = Math.max(Date.now() - (round.value.startedAt ?? 0), 1) / 1_000;

    cpm.value = Math.round((60 / timer) * round.value.typedChars);
    wpm.value = Math.round(((60 / timer) * round.value.typedChars) / 5);
  }, 200);
}

function stopInterval() {
  statsInterval.value && clearInterval(statsInterval.value);
}

watchEffect((onCleanup) => {
  if (!isFinished.value) {
    if (round.value?.active) {
      startInterval();
      onCleanup(stopInterval);
    } else {
      cpm.value = 0;
      wpm.value = 0;
    }
  } else stopInterval();
});
</script>

<template>
  <div>
    <RoundStatsTable
      :rows="[
        { label: 'Chars', value: round?.typedChars ?? 0 },
        // { label: 'Errors', value: round?.errors ?? 0 },
        { label: 'CPM', value: cpm },
        { label: 'WPM', value: wpm },
        { label: 'Duration (s)', value: round?.roundDuration ?? 0 },
      ]"
    ></RoundStatsTable>
  </div>
</template>

<style scoped></style>
