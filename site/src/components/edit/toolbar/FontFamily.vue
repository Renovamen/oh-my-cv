<template>
  <ToolItem
    :text="t('toolbar.font_family')"
    icon="material-symbols:font-download-outline"
  >
    <div class="hstack space-x-2 w-full mb-2">
      <Combobox
        id="font-en"
        flex-1
        :items="cjkFonts"
        :initial="styles.fontCJK.fontFamily || styles.fontCJK.name"
      />
      <span w-13>{{ t("toolbar.cn") }}</span>
    </div>

    <div class="hstack space-x-2 w-full">
      <Combobox
        id="font-cn"
        flex-1
        :items="enFonts"
        :initial="styles.fontEN.fontFamily || styles.fontEN.name"
      />
      <span w-13>{{ t("toolbar.en") }}</span>
    </div>
  </ToolItem>
</template>

<script lang="ts" setup>
import type { ComboboxItem } from "~/types";

const { t } = useI18n();
const { styles, setStyle } = useStyleStore();

const enFonts = computed(() => {
  const en = EN_FONTS.map<ComboboxItem>((item) => {
    const family =
      EN_FONTS.find((font) => font.name === item.name)?.fontFamily || item.name;
    return {
      label: item.name,
      value: family,
      onSelect: () => setStyle("fontEN", { name: item.name, fontFamily: family })
    };
  });
  return en.concat(gEnFontList.value);
});

const cjkFonts = computed(() => {
  const cn = CJK_FONTS.map<ComboboxItem>((item) => {
    const family =
      CJK_FONTS.find((font) => font.name === item.name)?.fontFamily || item.name;
    return {
      label: item.name,
      value: family,
      onSelect: () => setStyle("fontCJK", { name: item.name, fontFamily: family })
    };
  });
  return cn.concat(gCJKFontList.value);
});

// Setup Google Fonts
const gEnFontList = ref<ComboboxItem[]>([]);
const gCJKFontList = ref<ComboboxItem[]>([]);

onMounted(async () => {
  const { gfonts_en, gfonts_cjk } = await getGoogleFonts();

  gEnFontList.value = gfonts_en.map((font) => ({
    label: font.family,
    value: font.family,
    onSelect: () => setStyle("fontEN", { name: font.family })
  }));

  gCJKFontList.value = gfonts_cjk.map((font) => {
    const family = font.family;
    const name = CJK_NAME_MAP[family] || family;
    return {
      label: name,
      value: family,
      onSelect: () => setStyle("fontCJK", { name: name, fontFamily: family })
    };
  });

  const first = gCJKFontList.value.filter((item) => CJK_FIRST.includes(item.label));
  const after = gCJKFontList.value.filter((item) => !CJK_FIRST.includes(item.label));

  gCJKFontList.value = first.concat(after);
});
</script>
