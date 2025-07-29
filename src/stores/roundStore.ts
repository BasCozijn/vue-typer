import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

import validateKeyInput from '@/utils/validateKeyInput';
import { useFetchWords } from '@/composables/useFetchWords';

const DURATIONS_LIST = [10, 15, 20, 30, 40, 60, 90, 120];

const defaultRound = ref({
  words: [],
  active: false,
  typedText: '',
  typedChars: 0,
  timer: 0,
  roundDuration: DURATIONS_LIST[0],
  startedAt: null as number | null,
  errors: 0,
});

export const useRoundStore = defineStore('round', () => {
  const round = ref({ ...defaultRound.value });

  let intervalId: ReturnType<typeof setInterval> | null = null;

  function clearTimer() {
    if (intervalId) clearInterval(intervalId);
    intervalId = null;
  }

  const typedWords = computed(() => round.value.typedText.split(/\s+/));
  const currentTypedWord = computed(() => typedWords.value[typedWords.value.length - 1] ?? '');

  const isFinished = computed(() => round.value.timer >= round.value.roundDuration);

  const roundDurationIsLowest = computed(() => round.value.roundDuration === DURATIONS_LIST[0]);
  const roundDurationIsHighest = computed(
    () => round.value.roundDuration === DURATIONS_LIST[DURATIONS_LIST.length - 1],
  );

  async function reset() {
    clearTimer();
    round.value = { ...defaultRound.value };
    round.value.words = await useFetchWords();
  }

  function startRound() {
    if (round.value.active) return;
    round.value.active = true;
    round.value.startedAt = Date.now();

    if (intervalId) return;
    intervalId = setInterval(() => {
      if (++round.value.timer >= round.value.roundDuration) clearTimer();
    }, 1_000);
  }

  function increaseRoundDuration() {
    if (roundDurationIsHighest.value) return;
    const newDuration = DURATIONS_LIST[DURATIONS_LIST.indexOf(round.value.roundDuration) + 1];
    round.value.roundDuration = defaultRound.value.roundDuration = newDuration;
  }

  function decreaseRoundDuration() {
    if (roundDurationIsLowest.value) return;
    const newDuration = DURATIONS_LIST[DURATIONS_LIST.indexOf(round.value.roundDuration) - 1];
    round.value.roundDuration = defaultRound.value.roundDuration = newDuration;
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
    roundDurationIsLowest,
    roundDurationIsHighest,

    reset,
    startRound,
    insertKey,
    increaseRoundDuration,
    decreaseRoundDuration,
  };
});
