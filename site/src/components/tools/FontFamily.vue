<template>
  <ToolItem
    :text="t('tool.font_family')"
    icon="material-symbols:font-download-outline"
  >
    <div class="flex hstack space-x-2 w-full mb-2">
      <AutoComplete flex-1 :items="cnFonts" :default="styles.fontCN.name" />
      <span w-16>{{ t("tool.cn") }}</span>
    </div>

    <div class="flex hstack space-x-2 w-full">
      <AutoComplete flex-1 :items="enFonts" :default="styles.fontEN.name" />
      <span w-16>{{ t("tool.en") }}</span>
    </div>
  </ToolItem>
</template>

<script lang="ts" setup>
import { CN_FONTS, EN_FONTS } from "~/utils";

const { t } = useI18n();
const { styles, setStyle } = useStyleStore();

const enFonts = computed(() =>
  EN_FONTS.map((item) => ({
    text: item.name,
    function: ({ i }: { i: number }) => setStyle("fontEN", EN_FONTS[i])
  }))
);

const cnFonts = computed(() =>
  CN_FONTS.map((item) => ({
    text: item.name,
    function: ({ i }: { i: number }) => setStyle("fontCN", CN_FONTS[i])
  }))
);
</script>
