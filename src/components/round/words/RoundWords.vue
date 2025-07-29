<script setup lang="ts">
import { ref, watch, useTemplateRef } from 'vue';

import RoundWordsItem from './RoundWordsItem.vue';

const props = defineProps<{
  words: string[];
  typedWords: string[];
  isFinished: boolean;
  isActive: boolean;
}>();

const moveX = ref<number>(0);
const wordsRef = useTemplateRef<HTMLDivElement[]>('wordsRef');

watch(
  () => props.typedWords.length,
  (current, previous) => {
    if (current > previous) {
      const x = wordsRef.value?.[previous - 1]?.offsetWidth;
      moveX.value -= x ?? 0;
    } else {
      const x = wordsRef.value?.[current - 1]?.offsetWidth;
      moveX.value += x ?? 0;
    }
  },
);

watch(
  () => props.isFinished,
  (finished) => {
    if (!finished) moveX.value = 0;
  },
);
</script>

<template>
  <div
    class="no-scrollbar relative h-12 w-full overflow-x-hidden mask-radial-[100%_100%] mask-radial-from-75% mask-radial-at-left sm:h-16"
  >
    <div
      :style="{ '--move-words-x': `${moveX}px` }"
      class="ease absolute left-4 flex translate-x-(--move-words-x) transition-transform duration-100 sm:left-[calc(50%-100px)]"
      :class="{ 'duration-300': isFinished || !isActive }"
    >
      <ul class="flex">
        <li
          v-for="(word, index) in words"
          ref="wordsRef"
          :key="`word-${index}`"
        >
          <RoundWordsItem
            :word="word"
            :typedWord="typedWords[index]"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>
