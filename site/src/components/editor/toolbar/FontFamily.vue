<template>
  <EditorToolbarBox
    :text="$t('toolbar.font_family.title')"
    icon="i-material-symbols:font-download-outline"
  >
    <div class="w-full hstack gap-x-2 mb-2">
      <SharedUiCombobox
        v-if="loaded"
        id="font-cjk"
        class="flex-1"
        :items="localCjk.concat(gfCjk)"
        :default-value="styles.fontCJK.fontFamily || styles.fontCJK.name"
      />
      <UiSkeleton v-else class="flex-1 h-9" />
      <span w-13>{{ $t("toolbar.font_family.cjk") }}</span>
    </div>

    <div class="hstack gap-x-2 w-full mb2">
      <SharedUiCombobox
        v-if="loaded"
        id="font-en"
        class="flex-1"
        :items="localEn.concat(gfEn)"
        :default-value="styles.fontEN.fontFamily || styles.fontEN.name"
      />
      <UiSkeleton v-else class="flex-1 h-9" />
      <span w-13>{{ $t("toolbar.font_family.en") }}</span>
    </div>

    <div v-if="machineFonts.length > 0" class="hstack gap-x-2 w-full">
      <SharedUiCombobox
        v-if="loaded"
        id="font-machine"
        class="flex-1"
        :items="machineFonts"
        :default-value="styles.fontMachine.fontFamily || styles.fontMachine.name"
      />
      <UiSkeleton v-else class="flex-1 h-9" />
      <span w-13>{{ $t("toolbar.font_family.machine") }}</span>
    </div>
  </EditorToolbarBox>
</template>

<script lang="ts" setup>
import type { ComboboxItem } from "~/components/shared/ui/Combobox.vue";

const { styles, setStyle } = useStyleStore();
const { FONT } = useConstant();

const localEn = FONT.LOCAL.EN.map<ComboboxItem>((item) => {
  const family =
    FONT.LOCAL.EN.find((font) => font.name === item.name)?.fontFamily || item.name;

  return {
    label: item.name,
    value: family,
    onSelect: () => setStyle("fontEN", { name: item.name, fontFamily: family })
  };
});

const localCjk = FONT.LOCAL.CJK.map<ComboboxItem>((item) => {
  const family =
    FONT.LOCAL.CJK.find((font) => font.name === item.name)?.fontFamily || item.name;

  return {
    label: item.name,
    value: family,
    onSelect: () => setStyle("fontCJK", { name: item.name, fontFamily: family })
  };
});

// Setup Google Fonts
const loaded = ref(false);

const gfEn = ref<ComboboxItem[]>([]);
const gfCjk = ref<ComboboxItem[]>([]);

const machineFonts = ref<ComboboxItem[]>([]);

onMounted(async () => {
  const { en, cjk } = await googleFontsService.get();

  gfEn.value = en.map((font) => ({
    label: font.family,
    value: font.family,
    onSelect: () => setStyle("fontEN", { name: font.family })
  }));

  gfCjk.value = cjk
    .map((font) => {
      const family = font.family;
      const name = FONT.GF.CJK_FAMILY_TO_NAME[family] || family;

      return {
        label: name,
        value: family,
        onSelect: () => setStyle("fontCJK", { name: name, fontFamily: family })
      };
    })
    .sort(
      (a, b) =>
        Number(FONT.GF.CJK_FIRST.includes(b.label)) -
        Number(FONT.GF.CJK_FIRST.includes(a.label))
    );

  if ("queryLocalFonts" in window) {
    // @ts-ignore: Chrome 103 Experimental
    window.queryLocalFonts().then((fonts) => {
      const uniqFamily: Record<string, boolean> = {};

      for (const font of fonts) {
        if (uniqFamily[font.family]) {
          continue;
        } else {
          uniqFamily[font.family] = true;
        }

        machineFonts.value.push({
          label: font.fullName,
          value: font.family,
          onSelect: () =>
            setStyle("fontMachine", { name: font.fullName, fontFamily: font.family })
        });
      }
    });
  }

  loaded.value = true;
});
</script>
