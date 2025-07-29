import { computed, ref } from 'vue';

import useTimer from '@/composables/useTimer';
import validateKeyInput from '@/utils/validateKeyInput';
import { words as wordsData } from '@/data/words';

interface Round {
  words: string[];
  active: boolean;
  typedText: string;
}

const rounds = ref<Round[]>([
  {
    words: wordsData,
    active: false,
    typedText: '',
  },
]);

const currentRound = computed(() => {
  return rounds.value[rounds.value.length - 1];
});

const currentRoundIndex = computed(() => {
  return rounds.value.length - 1;
});

const addInput = (key: string) => {
  rounds.value[currentRoundIndex.value].typedText += key;
};

const removeInput = () => {
  currentRound.value.typedText = currentRound.value.typedText.slice(0, -1);
};

export default function useRound() {
  const { startTimer, timer } = useTimer();

  const activateRound = () => {
    rounds.value[currentRoundIndex.value].active = true;
    startTimer();
  };

  const insertKey = (key: string) => {
    if (!validateKeyInput(key)) {
      return;
    }

    if (!currentRound.value.active) {
      activateRound();
    }

    if (key === 'Backspace') {
      removeInput();
    } else {
      addInput(key);
    }
  };

  const words = computed(() => {
    return currentRound.value.words;
  });

  const typedWords = computed(() => {
    return currentRound.value.typedText.split(' ');
  });

  const typedWordsCount = computed(() => {
    return currentRound.value.typedText.split(' ').length;
  });

  const currentTypedWord = computed(() => {
    return typedWords.value[typedWords.value.length - 1] ?? '';
  });

  const isActive = computed(() => {
    return currentRound.value.active;
  });

  const isFinished = computed(() => {
    return timer.value <= 0;
  });

  return {
    insertKey,
    currentRound,
    words,
    typedWords,
    typedWordsCount,
    currentTypedWord,
    isActive,
    isFinished,
  };
}
