<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

import RoundCountdown from '@/components/RoundCountdown.vue';
import RoundInput from '@/components/RoundInput.vue';
import RoundWords from '@/components/RoundWords.vue';

import { useRoundStore } from '@/stores/roundStore';

const roundStore = useRoundStore();
const { words, currentTypedWord, isFinished, typedWords, roundDuration, isActive } =
  storeToRefs(roundStore);
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
      <RoundInput
        class="absolute sm:left-1/2"
        @keydown="roundStore.insertKey"
        :word="words[typedWords.length - 1]"
        :typedWord="currentTypedWord"
        :disabled="isFinished"
      ></RoundInput>
    </div>
    <div class="absolute bottom-10 left-1/2 -translate-x-1/2">CPM: 0, WPM: 0</div>
  </div>
</template>

<style lang="scss" scoped></style>
