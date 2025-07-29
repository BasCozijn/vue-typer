import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import validateKeyInput from '@/utils/validateKeyInput';
import { words as defaultWords } from '@/data/words';

interface RoundState {
  words: string[];
  active: boolean;
  typedText: string;
  timer: number;
  roundDuration: number;
}

interface UseRoundStore {
  /* getters */
  words: string[];
  typedWords: string[];
  currentTypedWord: string;
  isActive: boolean;
  isFinished: boolean;
  timer: number;
  roundDuration: number;

  /* actions */
  prepareRound(words?: string[]): void;
  startRound(): void;
  insertKey(key: string): void;
  reset(): void;
}

export const useRoundStore = defineStore('round', () => {
  /* state (refs) */
  const round = ref<RoundState>({
    words: defaultWords,
    active: false,
    typedText: '',
    timer: 10,
    roundDuration: 10,
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
  const words = computed(() => round.value.words);
  const typedWords = computed(() => round.value.typedText.split(/\s+/));
  const currentTypedWord = computed(() => typedWords.value[typedWords.value.length - 1] ?? '');
  const timer = computed(() => round.value.timer);
  const roundDuration = computed(() => round.value.roundDuration);

  const isActive = computed(() => round.value.active);
  const isFinished = computed(() => round.value.timer <= 0);

  /* actions */
  function prepareRound(newWords: string[] = defaultWords) {
    clearTimer();
    round.value = {
      words: newWords,
      active: false,
      typedText: '',
      timer: 10,
      roundDuration: 10,
    };
  }

  function startRound() {
    if (round.value.active) return;
    round.value.active = true;
    startTimer();
  }

  function insertKey(key: string) {
    if (isFinished.value || !validateKeyInput(key)) return;

    if (!round.value.active) startRound();

    if (key === 'Backspace') {
      round.value.typedText = round.value.typedText.slice(0, -1);
    } else {
      round.value.typedText += key;
    }
  }

  function reset() {
    prepareRound(round.value.words);
  }

  return {
    /* getters */
    words,
    typedWords,
    currentTypedWord,
    isActive,
    isFinished,
    timer,
    roundDuration,

    /* actions */
    prepareRound,
    startRound,
    insertKey,
    reset,
  };
});
