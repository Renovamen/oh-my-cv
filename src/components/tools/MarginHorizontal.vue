<template>
  <BaseButton>
    <template #icon>
      <span
        class="iconify"
        text="sm sm:base"
        data-icon="icon-park-outline:margin"
      />
    </template>

    <template #dropdown>
      <div class="w-7 sm:w-8 py-3">
        <Slider v-model="marginH" orientation="vertical" class="mx-auto" />
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

const marginH = computed({
  get() {
    return store.state.styles.marginH;
  },
  set(value: number) {
    setStoreState("styles", "marginH", value);
    onStylesUpdate(store.state.styles);
  }
});
</script>
