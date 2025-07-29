<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { Tween, Group } from '@tweenjs/tween.js';

const props = defineProps({
  value: {
    type: Number,
    required: true,
  },
  initialValue: {
    type: Number,
    default: 0,
  },
  duration: {
    type: Number,
    default: 500,
  },
  startTimeout: {
    type: Number,
    default: 0,
  },
  initialCountingDisabled: {
    type: Boolean,
    default: false,
  },
  decimals: {
    type: Number,
    default: 2,
  },
});

const AnimatedNumberCount = ref(Number(props.initialValue || props.value).toFixed(props.decimals));

const tweenGroup = new Group();

let animationFrameId: number | null = null;

const tween = (startValue: number, endValue: number) => {
  if (startValue === endValue - 1) {
    AnimatedNumberCount.value = endValue.toFixed(props.decimals);
    return;
  }

  const tweenObject = { tweeningValue: startValue };

  const tweenInstance = new Tween(tweenObject)
    .to({ tweeningValue: endValue }, props.duration)
    .onUpdate(({ tweeningValue }) => {
      AnimatedNumberCount.value = Number(tweeningValue).toFixed(props.decimals);
    });

  tweenGroup.add(tweenInstance);
  tweenInstance.start();
};

const animate = (time: number) => {
  tweenGroup.update(time);
  animationFrameId = requestAnimationFrame(animate);
};

watch(
  () => props.value,
  (newV, oldV) => {
    if (newV !== oldV) {
      tween(oldV, newV);
    }
  },
);

onMounted(() => {
  if (!props.initialCountingDisabled) {
    setTimeout(() => tween(Number(AnimatedNumberCount.value), props.value), props.startTimeout);
  }

  animationFrameId = requestAnimationFrame(animate);
});

onBeforeUnmount(() => {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
  }
  tweenGroup.removeAll();
});
</script>

<template>
  <span>{{ AnimatedNumberCount }}</span>
</template>
