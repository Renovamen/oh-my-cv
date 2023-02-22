<template>
  <div class="display-input relative">
    <input
      ref="inputElement"
      :value="text"
      class="w-full text-center truncate outline-none px-1 md:px-5 py-0.5 bg-transparent"
      :class="[isFocus && 'focus', !isFocus && 'cursor-pointer']"
      @focus="isFocus = true"
      @blur="isFocus = false"
      @keyup.enter="enter"
    />
    <span
      class="hide-on-mobile opacity-0 flex-center absolute top-1/2 -mt-2 right-0"
    >
      <span class="iconify text-light-c" data-icon="bx:edit" />
    </span>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  text: string;
  onEntered: (text: string) => void;
}>();

const inputElement = ref<HTMLInputElement | null>(null);
const isFocus = ref(false);

const enter = (e: Event) => {
  props.onEntered((e.currentTarget as HTMLInputElement).value);
  inputElement.value?.blur();
};
</script>

<style scoped>
.display-input:hover > span {
  @apply opacity-100;
}

.display-input input.focus + span {
  @apply opacity-0;
}
</style>
