<template>
  <ToolItem
    :text="$t('toolbar.font_family')"
    icon="i-material-symbols:font-download-outline"
  >
    <div class="w-full hstack space-x-2 mb-2">
      <Combobox
        id="font-cjk"
        flex-1
        :items="localCjkFonts.concat(googleCjkFonts)"
        :default="styles.fontCJK.fontFamily || styles.fontCJK.name"
      />
      <span w-13>{{ $t("toolbar.cjk") }}</span>
    </div>

    <div class="hstack space-x-2 w-full">
      <Combobox
        id="font-en"
        flex-1
        :items="localEnFonts.concat(googleEnFonts)"
        :default="styles.fontEN.fontFamily || styles.fontEN.name"
      />
      <span w-13>{{ $t("toolbar.en") }}</span>
    </div>
  </ToolItem>
</template>

<script lang="ts" setup>
import type { ComboboxItem } from "~/types";

const { styles, setStyle } = useStyleStore();

const localEnFonts = EN_FONTS.map<ComboboxItem>((item) => {
  const family =
    EN_FONTS.find((font) => font.name === item.name)?.fontFamily || item.name;

  return {
    label: item.name,
    value: family,
    onSelect: () => setStyle("fontEN", { name: item.name, fontFamily: family })
  };
});

const localCjkFonts = CJK_FONTS.map<ComboboxItem>((item) => {
  const family =
    CJK_FONTS.find((font) => font.name === item.name)?.fontFamily || item.name;

  return {
    label: item.name,
    value: family,
    onSelect: () => setStyle("fontCJK", { name: item.name, fontFamily: family })
  };
});

// Setup Google Fonts
const googleEnFonts = ref<ComboboxItem[]>([]);
const googleCjkFonts = ref<ComboboxItem[]>([]);

onMounted(async () => {
  const { gfonts_en, gfonts_cjk } = await getGoogleFonts();

  googleEnFonts.value = gfonts_en.map((font) => ({
    label: font.family,
    value: font.family,
    onSelect: () => setStyle("fontEN", { name: font.family })
  }));

  const gCjkFonts = gfonts_cjk.map((font) => {
    const family = font.family;
    const name = CJK_NAME_MAP[family] || family;
    return {
      label: name,
      value: family,
      onSelect: () => setStyle("fontCJK", { name: name, fontFamily: family })
    };
  });

  const first = gCjkFonts.filter((item) => CJK_FIRST.includes(item.label));
  const after = gCjkFonts.filter((item) => !CJK_FIRST.includes(item.label));

  googleCjkFonts.value = first.concat(after);
});
</script>
