<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';

import RoundCountdown from '@/components/round/RoundCountdown.vue';
import RoundWordsInput from '@/components/round/words/RoundWordsInput.vue';
import RoundWords from '@/components/round/words/RoundWords.vue';

import RoundStatsContainer from '@/components/round/stats/RoundStatsContainer.vue';

import { useRoundStore } from '@/stores/roundStore';

const roundStore = useRoundStore();
const { round, currentTypedWord, isFinished, typedWords } = storeToRefs(roundStore);

const words = computed(() => round.value.words);
const roundDuration = computed(() => round.value.roundDuration);
const isActive = computed(() => round.value.active);
</script>

<template>
  <div class="relative flex h-full flex-col justify-center overflow-hidden">
    <div class="absolute top-10 left-1/2 -translate-x-1/2">
      <RoundCountdown
        :totalDuration="roundDuration"
        :active="isActive"
      ></RoundCountdown>
    </div>
    <div v-if="words.length > 0">
      <RoundWords
        :words="words"
        :typedWords="typedWords"
      ></RoundWords>
      <RoundWordsInput
        class="absolute sm:left-1/2"
        @keydown="roundStore.insertKey"
        :word="words[typedWords.length - 1]"
        :typedWord="currentTypedWord"
        :disabled="isFinished"
      ></RoundWordsInput>
    </div>
    <div class="absolute bottom-10 left-1/2 -translate-x-1/2">
      <RoundStatsContainer></RoundStatsContainer>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
