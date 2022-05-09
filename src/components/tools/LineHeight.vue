<template>
  <Button :tip="t('tooltip.line')">
    <template #icon>
      <span
        class="iconify"
        text="base pc:lg"
        data-icon="ic:round-format-line-spacing"
      />
    </template>

    <template #dropdown>
      <div class="w-7 pc:w-8 py-3">
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
  </Button>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import Slider from "@vueform/slider";
import "@vueform/slider/themes/default.css";
import { setStoreState } from "~/store";
import { onStylesUpdate } from "~/utils";
import Button from "~/components/base/Button.vue";

const store = useStore();
const { t } = useI18n();

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
