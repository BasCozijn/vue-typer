<script setup lang="ts">
import { computed } from 'vue';

const emit = defineEmits<{
  (e: 'keydown', value: string): void;
}>();

const onKeydown = (e: KeyboardEvent) => {
  emit('keydown', e.key);
};

const props = defineProps<{
  word: string | undefined;
  typedWord: string;
  disabled: boolean;
}>();

const typedWordIsCorrect = computed(() => {
  return props.word?.includes(props.typedWord) ?? !props.typedWord.length;
});
</script>

<template>
  <div class="relative">
    <label
      aria-hidden="true"
      for="typed-word"
      class="absolute top-0 right-full h-full w-full cursor-text"
    >
    </label>
    <input
      id="typed-word"
      name="typed-word"
      class="border-none p-0 text-4xl outline-none focus:placeholder:text-transparent sm:text-6xl"
      :class="{
        'text-red-500': !typedWordIsCorrect,
        'placeholder:text-transparent': disabled,
      }"
      type="text"
      placeholder="Start hier"
      autocomplete="off"
      autofocus
      autocorrect="off"
      autocapitalize="off"
      tabindex="0"
      @keydown.prevent="onKeydown"
      :value="typedWord"
      :disabled="disabled"
    />
  </div>
</template>

<style lang="scss" scoped></style>
