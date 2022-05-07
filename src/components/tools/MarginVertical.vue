<template>
  <BaseButton>
    <template #icon>
      <span
        class="iconify"
        text="sm pc:base"
        data-icon="icon-park-outline:margin-one"
      />
    </template>

    <template #dropdown>
      <div class="w-7 pc:w-8 py-3">
        <Slider v-model="marginV" orientation="vertical" class="mx-auto" />
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

const marginV = computed({
  get() {
    return store.state.styles.marginV;
  },
  set(value: number) {
    setStoreState("styles", "marginV", value);
    onStylesUpdate(store.state.styles);
  }
});
</script>
