<script setup lang="ts">
import { computed } from 'vue';

const emit = defineEmits<{
  (e: 'keydown', value: string): void;
}>();

const onKeydown = (e: KeyboardEvent) => {
  emit('keydown', e.key);
};

const props = defineProps<{
  word: string;
  typedWord: string;
  disabled: boolean;
}>();

const typedWordIsCorrect = computed(() => {
  return props.word.includes(props.typedWord) ?? !props.typedWord.length;
});
</script>

<template>
  <div>
    <input
      class="border-none p-0 text-6xl outline-none focus:placeholder:text-transparent"
      :class="{
        'text-red-500': !typedWordIsCorrect,
      }"
      type="text"
      placeholder="Start hier"
      autocomplete="off"
      autofocus
      autocapitalize="off"
      tabindex="0"
      @keydown.prevent="onKeydown"
      :value="typedWord"
      :disabled="disabled"
    />
  </div>
</template>

<style lang="scss" scoped></style>
