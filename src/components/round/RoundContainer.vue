<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';

import RoundCountdown from '@/components/round/RoundCountdown.vue';
import RoundWordsInput from '@/components/round/words/RoundWordsInput.vue';
import RoundWords from '@/components/round/words/RoundWords.vue';
import RoundRetryButton from '@/components/round/RoundRetryButton.vue';

import RoundStatsContainer from '@/components/round/stats/RoundStatsContainer.vue';

import { useRoundStore } from '@/stores/roundStore';

const roundStore = useRoundStore();
const { round, currentTypedWord, isFinished, typedWords } = storeToRefs(roundStore);

const words = computed(() => round.value?.words ?? []);
const roundDuration = computed(() => round.value?.roundDuration);
const isActive = computed(() => round.value?.active);

const currentWord = computed(() => words.value[typedWords.value.length - 1]);

onMounted(() => {
  roundStore.reset();
});
</script>

<template>
  <div class="relative flex h-full flex-col justify-center overflow-hidden">
    <div class="absolute top-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-4">
      <RoundCountdown
        v-if="roundDuration"
        :totalDuration="roundDuration"
        :active="isActive"
        :isFinished="isFinished"
      ></RoundCountdown>
      <RoundRetryButton
        v-if="isFinished"
        @click="roundStore.reset"
      >
      </RoundRetryButton>
    </div>
    <div>
      <RoundWords
        :words="words"
        :typedWords="typedWords"
        :isFinished="isFinished"
        :isActive="isActive"
      ></RoundWords>
      <RoundWordsInput
        class="absolute left-4 sm:left-[calc(50%-100px)]"
        @keydown="roundStore.insertKey"
        :word="currentWord"
        :typedWord="currentTypedWord"
        :disabled="isFinished"
      ></RoundWordsInput>
    </div>
    <div class="absolute bottom-10 left-1/2 w-full -translate-x-1/2 px-2">
      <RoundStatsContainer></RoundStatsContainer>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
