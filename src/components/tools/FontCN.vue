<template>
  <Button :text="pickedFontName" :tip="t('tooltip.font_cn')">
    <template #icon>
      <span
        class="iconify"
        text="sm pc:base"
        data-icon="icon-park-outline:chinese"
      />
    </template>

    <template #dropdown>
      <Dropdown :items="items" />
    </template>
  </Button>
</template>

<script lang="ts" setup>
import { setStoreState } from "~/store";
import { CN_FONTS, onStylesUpdate, handlePageBreak } from "~/utils";
import { resolveFonts } from "~/composables";

const store = useStore();
const { t } = useI18n();
const { onFontLoaded } = resolveFonts();

const pickedFontName = computed(() => store.state.styles.fontCN.name);

const pickFont = (i: number) => {
  setStoreState("styles", "fontCN", CN_FONTS[i]);
  onStylesUpdate(store.state.styles, false);
  onFontLoaded.value.then(() => handlePageBreak(store.state.styles));
};

const items = computed(() =>
  CN_FONTS.map((item) => ({
    text: item.name,
    function: ({ i }: { i: number }) => pickFont(i)
  }))
);
</script>
