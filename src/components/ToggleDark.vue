<template>
  <div class="btn w-7 sm:w-8 text-white bg-indigo-500" @click="toggleDark">
    <div v-show="!isDark" class="w-full h-full flex-center">
      <span class="iconify" text="sm sm:base" data-icon="ph:sun-bold" />
    </div>
    <div v-show="isDark" class="w-full h-full flex-center">
      <span class="iconify" text="sm sm:base" data-icon="ph:moon-bold" />
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
