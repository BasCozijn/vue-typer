import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import validateKeyInput from '@/utils/validateKeyInput';
import { useFetchWords } from '@/composables/useFetchWords';

const defaultRound = {
  words: [],
  active: false,
  typedText: '',
  typedChars: 0,
  timer: 0,
  roundDuration: 10,
  startedAt: null as number | null,
};

export const useRoundStore = defineStore('round', () => {
  const round = ref({ ...defaultRound });

  let intervalId: ReturnType<typeof setInterval> | null = null;

  function startTimer() {
    if (intervalId) return;
    intervalId = setInterval(() => {
      if (++round.value.timer >= round.value.roundDuration) {
        clearTimer();
      }
    }, 1_000);
  }

  function clearTimer() {
    if (intervalId) clearInterval(intervalId);
    intervalId = null;
  }

  const typedWords = computed(() => round.value.typedText.split(/\s+/));
  const currentTypedWord = computed(() => typedWords.value[typedWords.value.length - 1] ?? '');

  const isFinished = computed(() => round.value.timer >= round.value.roundDuration);

  async function reset() {
    clearTimer();
    round.value = { ...defaultRound };

    const newWords = await useFetchWords();
    round.value.words = newWords;
  }

  function startRound() {
    if (round.value.active) return;
    round.value.active = true;
    round.value.startedAt = Date.now();
    startTimer();
  }

  function insertKey(key: string) {
    if (isFinished.value || !validateKeyInput(key)) return;

    if (!round.value.active) startRound();

    if (key === 'Backspace') {
      round.value.typedText = round.value.typedText.slice(0, -1);
      round.value.typedChars--;
    } else {
      round.value.typedText += key;
      round.value.typedChars++;
    }
  }

  return {
    round,
    typedWords,
    currentTypedWord,
    isFinished,

    reset,
    startRound,
    insertKey,
  };
});
