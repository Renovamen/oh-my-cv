<template>
  <BaseButton>
    <template #icon>
      <span
        class="iconify"
        text="sm sm:base"
        data-icon="mdi:format-line-height"
      />
    </template>

    <template #dropdown>
      <div class="w-7 sm:w-8 py-3">
        <Slider
          v-model="lineHeight"
          :min="100"
          :max="200"
          :step="5"
          :format="(value) => value / 100"
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

const lineHeight = computed({
  get() {
    return store.state.styles.lineHeight;
  },
  set(value: number) {
    setStoreState("styles", "lineHeight", value);
    onStylesUpdate(store.state.styles);
  }
});
</script>
