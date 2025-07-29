<script setup lang="ts">
import { ref, watch, useTemplateRef } from 'vue';

import RoundsWordsItem from './RoundsWordsItem.vue';

const props = defineProps<{
  words: string[];
  typedWords: string[];
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
</script>

<template>
  <div
    class="no-scrollbar relative h-16 w-full overflow-x-hidden mask-radial-[100%_100%] mask-radial-from-75% mask-radial-at-left"
  >
    <div
      :style="{ '--move-words-x': `${moveX}px` }"
      class="ease absolute left-1/2 flex translate-x-(--move-words-x) transition-all duration-100"
    >
      <ul class="flex">
        <li
          v-for="(word, index) in words"
          ref="wordsRef"
          :key="`word-${index}`"
        >
          <RoundsWordsItem
            :word="word"
            :typedWord="typedWords[index]"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>
