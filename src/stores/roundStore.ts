import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import validateKeyInput from '@/utils/validateKeyInput';
import { words as defaultWords } from '@/data/words';

interface RoundState {
  words: string[];
  active: boolean;
  typedText: string;
  typedChars: number;
  timer: number;
  roundDuration: number;
  startedAt: number | null; // timestamp
}

export const useRoundStore = defineStore('round', () => {
  /* state (refs) */
  const round = ref<RoundState>({
    words: defaultWords,
    active: false,
    typedText: '',
    typedChars: 0,
    timer: 10,
    roundDuration: 10,
    startedAt: null,
  });

  let intervalId: ReturnType<typeof setInterval> | null = null;

  function startTimer() {
    if (intervalId) return;
    intervalId = setInterval(() => {
      if (--round.value.timer <= 0) {
        clearTimer();
      }
    }, 1_000);
  }

  function clearTimer() {
    if (intervalId) clearInterval(intervalId);
    intervalId = null;
  }

  /* getters (computed) */
  const typedWords = computed(() => round.value.typedText.split(/\s+/));
  const currentTypedWord = computed(() => typedWords.value[typedWords.value.length - 1] ?? '');

  const isFinished = computed(() => round.value.timer <= 0);

  /* actions */
  function prepareRound(newWords: string[] = defaultWords) {
    clearTimer();
    round.value = {
      words: newWords,
      active: false,
      typedText: '',
      typedChars: 0,
      timer: 10,
      roundDuration: 10,
      startedAt: null,
    };
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

  function reset() {
    prepareRound(round.value.words);
  }

  return {
    /* getters */
    round,
    typedWords,
    currentTypedWord,
    isFinished,

    /* actions */
    prepareRound,
    startRound,
    insertKey,
    reset,
  };
});
