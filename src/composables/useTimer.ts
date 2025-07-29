import { ref } from 'vue';

const DEFAULT_TIMER = 10;

const timer = ref<number>(DEFAULT_TIMER);
let timerInterval: ReturnType<typeof setInterval> | null = null;

const startTimer = () => {
  if (timerInterval) {
    clearInterval(timerInterval);
  }

  timer.value = DEFAULT_TIMER;
  timerInterval = setInterval(() => {
    timer.value--;
    if (timer.value <= 0) {
      clearInterval(timerInterval!);
    }
  }, 1000);
};

export default function useTimer() {
  return { timer, startTimer };
}
