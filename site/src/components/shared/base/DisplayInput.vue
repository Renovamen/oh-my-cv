<template>
  <div class="display-input relative">
    <input
      ref="inputElement"
      :value="text"
      class="w-full text-center truncate outline-none px-1 md:px-5 py-0.5 bg-transparent"
      :class="[isFocus && 'focus', !isFocus && 'cursor-pointer']"
      @focus="isFocus = true"
      @blur="
        () => {
          isFocus = false;
          $emit('change', lastSavedText);
        }
      "
      @keyup.enter="enter"
      @input="(e) => $emit('change', (e.currentTarget as HTMLInputElement).value)"
    />
    <span
      class="iconify hide-on-mobile absolute w-4 h-4 top-1/2 -mt-2 right-0 text-light-c opacity-0"
      data-icon="bx:edit"
    />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  text: string;
  onEntered: () => void;
}>();

defineEmits<{
  (e: "change", text: string): void;
}>();

const inputElement = ref<HTMLInputElement | null>(null);
const lastSavedText = ref(props.text);
const isFocus = ref(false);

const enter = (e: Event) => {
  props.onEntered();
  lastSavedText.value = (e.currentTarget as HTMLInputElement).value;
  inputElement.value?.blur();
};
</script>

<style scoped>
.display-input:hover .iconify {
  @apply opacity-100;
}

.display-input input.focus + .iconify {
  @apply !opacity-0;
}
</style>
