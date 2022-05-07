<template>
  <BaseButton>
    <template #icon>
      <span class="iconify" text="sm pc:base" data-icon="ri:font-size-2" />
    </template>

    <template #dropdown>
      <div class="w-7 pc:w-8 py-3">
        <Slider
          v-model="fontSize"
          :min="12"
          :max="20"
          orientation="vertical"
          class="mx-auto"
        />
      </div>
    </template>
  </BaseButton>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useStore } from "vuex";
import Slider from "@vueform/slider";
import "@vueform/slider/themes/default.css";
import { setStoreState } from "~/store";
import { onStylesUpdate } from "~/utils";
import BaseButton from "./BaseButton.vue";

const store = useStore();

const fontSize = computed({
  get() {
    return store.state.styles.fontSize;
  },
  set(value: number) {
    setStoreState("styles", "fontSize", value);
    onStylesUpdate(store.state.styles);
  }
});
</script>
