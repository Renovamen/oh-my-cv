<template>
  <ToolItem
    :text="t('toolbar.font_family')"
    icon="material-symbols:font-download-outline"
  >
    <div class="hstack space-x-2 w-full mb-2">
      <AutoComplete flex-1 :items="cjkFonts" :default="styles.fontCJK.name" />
      <span w-13>{{ t("toolbar.cn") }}</span>
    </div>

    <div class="hstack space-x-2 w-full">
      <AutoComplete flex-1 :items="enFonts" :default="styles.fontEN.name" />
      <span w-13>{{ t("toolbar.en") }}</span>
    </div>
  </ToolItem>
</template>

<script lang="ts" setup>
import { getGoogleFonts } from "~/utils";
import {
  CJK_FONTS,
  EN_FONTS,
  CJK_NAME_MAP,
  CJK_FIRST
} from "~/utils/constants";
import type { DropdownItem } from "~/types";

const { t } = useI18n();
const { styles, setStyle } = useStyleStore();

const enFonts = computed(() => {
  const en = EN_FONTS.map(
    (item) =>
      ({
        text: item.name,
        function: () =>
          setStyle("fontEN", {
            name: item.name,
            fontFamily:
              EN_FONTS.find((font) => font.name === item.name)?.fontFamily ||
              item.name
          })
      } as DropdownItem)
  );
  return en.concat(gEnFontList.value);
});

const cjkFonts = computed(() => {
  const cn = CJK_FONTS.map(
    (item) =>
      ({
        text: item.name,
        function: () =>
          setStyle("fontCJK", {
            name: item.name,
            fontFamily:
              CJK_FONTS.find((font) => font.name === item.name)?.fontFamily ||
              item.name
          })
      } as DropdownItem)
  );
  return cn.concat(gCJKFontList.value);
});

// Setup Google Fonts
const gEnFontList = ref<DropdownItem[]>([]);
const gCJKFontList = ref<DropdownItem[]>([]);

onMounted(async () => {
  const { gfonts_en, gfonts_cjk } = await getGoogleFonts();

  gEnFontList.value = gfonts_en.map((font) => ({
    text: font.family,
    function: () => setStyle("fontEN", { name: font.family })
  }));

  gCJKFontList.value = gfonts_cjk.map((font) => {
    const family = font.family;
    const name = CJK_NAME_MAP[family] || family;
    return {
      text: name,
      function: () => setStyle("fontCJK", { name: name, fontFamily: family })
    };
  });

  const first = gCJKFontList.value.filter((item) =>
    CJK_FIRST.includes(item.text)
  );
  const after = gCJKFontList.value.filter(
    (item) => !CJK_FIRST.includes(item.text)
  );

  gCJKFontList.value = first.concat(after);
});
</script>
