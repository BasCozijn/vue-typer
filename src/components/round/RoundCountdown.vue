<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue';

const props = defineProps<{
  totalDuration: number;
  active: boolean;
}>();

const seconds = ref(props.totalDuration);

let intervalId: ReturnType<typeof setInterval> | null = null;

const start = () => {
  seconds.value = props.totalDuration;
  intervalId && clearInterval(intervalId);

  intervalId = setInterval(() => {
    if (--seconds.value <= 0) {
      clearInterval(intervalId!);
    }
  }, 1_000);
};

watch(
  () => props.active,
  (isActive) => {
    if (isActive) start();
    else intervalId && clearInterval(intervalId);
  },
  { immediate: true },
);

onBeforeUnmount(() => intervalId && clearInterval(intervalId));
</script>

<template>
  <div class="relative flex h-32 w-32 items-center justify-center">
    <div
      class="chart absolute inset-0 rounded-full"
      :class="{ running: active }"
      :style="{ '--duration': `${props.totalDuration}s` }"
    />
    <div class="absolute inset-2 flex items-center justify-center rounded-full bg-amber-50">
      <div class="z-10 text-7xl font-bold">{{ seconds }}</div>
    </div>
  </div>
</template>

<style scoped>
@property --percentage {
  syntax: '<percentage>';
  initial-value: 0%;
  inherits: false;
}

.chart {
  background: conic-gradient(rgb(245 158 11) var(--percentage), rgb(255 251 235) 0);
}

.chart.running {
  animation: timer var(--duration) linear forwards;
}

@keyframes timer {
  to {
    --percentage: 100%;
  }
}
</style>
