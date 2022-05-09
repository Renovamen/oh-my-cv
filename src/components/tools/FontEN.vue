<template>
  <Button :text="pickedFontName" :tip="t('tooltip.font_en')">
    <template #icon>
      <span
        class="iconify"
        text="sm pc:base"
        data-icon="icon-park-outline:english"
      />
    </template>

    <template #dropdown>
      <Dropdown :items="items" />
    </template>
  </Button>
</template>

<script lang="ts" setup>
import { setStoreState } from "~/store";
import { EN_FONTS, onStylesUpdate, handlePageBreak } from "~/utils";
import { resolveFonts } from "~/composables";

const store = useStore();
const { t } = useI18n();
const { onFontLoaded } = resolveFonts();

const pickedFontName = computed(() => store.state.styles.fontEN.name);

const pickFont = (i: number) => {
  setStoreState("styles", "fontEN", EN_FONTS[i]);
  onStylesUpdate(store.state.styles, false);
  onFontLoaded.value.then(() => handlePageBreak(store.state.styles));
};

const items = computed(() =>
  EN_FONTS.map((item) => ({
    text: item.name,
    function: ({ i }: { i: number }) => pickFont(i)
  }))
);
</script>
