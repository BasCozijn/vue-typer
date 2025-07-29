<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  word: string;
  typedWord: string | undefined;
}>();

const isCorrect = computed(() => {
  return props.word === props.typedWord;
});
</script>

<template>
  <div class="text-4xl sm:text-6xl">
    <span
      v-for="char in word"
      :key="char"
      class="text-gray-800 transition-colors duration-200"
      :class="{ 'text-green-500': isCorrect }"
      >{{ char }}</span
    >&nbsp;
  </div>
</template>

<style scoped></style>
