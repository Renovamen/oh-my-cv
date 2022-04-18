<template>
  <!-- PC -->
  <div class="space-x-1.5 hidden sm:flex">
    <FontCN />
    <FontEN />
    <ThemeColor />
    <ParagraphSpace />
    <LineHeight />
    <FontSize />
    <MarginVertical />
    <MarginHorizontal />
  </div>

  <!-- Mobile -->
  <div class="sm:hidden">
    <BaseButton text="Tools" :dropdown-mobile-right="true">
      <template #icon>
        <span class="iconify text-sm" data-icon="jam:tools" />
      </template>

      <template #dropdown>
        <div class="space-x-1.5 flex pt-2 pb-1 px-2">
          <FontCN />
          <FontEN />
        </div>
        <div class="space-x-1.5 flex pt-1 pb-2 px-2 justify-end">
          <ParagraphSpace />
          <LineHeight />
          <FontSize />
          <MarginVertical />
          <MarginHorizontal />
          <ThemeColor />
        </div>
      </template>
    </BaseButton>
  </div>
</template>

<script lang="ts" setup>
import FontCN from "./tools/FontCN.vue";
import FontEN from "./tools/FontEN.vue";
import FontSize from "./tools/FontSize.vue";
import ThemeColor from "./tools/ThemeColor.vue";
import MarginVertical from "./tools/MarginVertical.vue";
import MarginHorizontal from "./tools/MarginHorizontal.vue";
import LineHeight from "./tools/LineHeight.vue";
import ParagraphSpace from "./tools/ParagraphSpace.vue";
import BaseButton from "./tools/BaseButton.vue";
</script>
