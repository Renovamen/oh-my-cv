<template>
  <div
    class="h-7 w-7 sm:h-8 sm:w-8 text-white rounded bg-indigo-500 cursor-pointer"
    @click="toggleDark"
  >
    <div
      v-show="!isDark"
      class="w-full h-full flex items-center justify-center"
    >
      <span class="iconify text-sm sm:text-base" data-icon="ph:sun-bold" />
    </div>
    <div v-show="isDark" class="w-full h-full flex items-center justify-center">
      <span class="iconify text-sm sm:text-base" data-icon="ph:moon-bold" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const isDark = computed(() => store.state.ui.dark);

const toggleDark = () => {
  store.commit("ui/setDark", !isDark.value);
};
</script>
