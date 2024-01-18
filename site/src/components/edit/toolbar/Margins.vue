<template>
  <ToolItem :text="$t('toolbar.margin')" icon="radix-icons:margin">
    <div mb-4 text-light-c>
      <div hstack space-x-1 justify-end>
        <client-only>
          <span class="iconify" data-icon="icon-park-outline:margin-one" />
        </client-only>
        <span>{{ $t("toolbar.vertical") }}</span>
      </div>

      <Slider
        id="margin-v"
        unit="px"
        :default="styles.marginV"
        :on-value-change="setMarginV"
      />
    </div>

    <div text-light-c>
      <div hstack space-x-1 justify-end>
        <client-only>
          <span class="iconify" data-icon="icon-park-outline:margin" />
        </client-only>
        <span>{{ $t("toolbar.horizontal") }}</span>
      </div>

      <Slider
        id="margin-h"
        unit="px"
        :default="styles.marginH"
        :on-value-change="setMarginH"
      />
    </div>
  </ToolItem>
</template>

<script lang="ts" setup>
const { styles, setStyle } = useStyleStore();

const setMarginV = (value: number) => setStyle("marginV", value);
const setMarginH = (value: number) => setStyle("marginH", value);
</script>
