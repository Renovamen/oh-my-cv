<template>
  <Button :tip="t('tooltip.paragraph')">
    <template #icon>
      <span
        class="iconify"
        text="sm pc:base"
        data-icon="icon-park-outline:paragraph-break-two"
      />
    </template>

    <template #dropdown>
      <div class="w-7 pc:w-8 py-3">
        <Slider
          v-model="paragraphSpace"
          :max="50"
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

const paragraphSpace = computed({
  get() {
    return store.state.styles.paragraphSpace;
  },
  set(value: number) {
    setStoreState("styles", "paragraphSpace", value);
    onStylesUpdate(store.state.styles);
  }
});
</script>
