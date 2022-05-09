<template>
  <!-- PC -->
  <div class="space-x-1.5 hidden pc:flex">
    <FontCN />
    <FontEN />
    <ThemeColor />
    <ParagraphSpace />
    <LineHeight />
    <FontSize />
    <MarginVertical />
    <MarginHorizontal />
    <Paper />
  </div>

  <!-- Mobile -->
  <div class="pc:hidden">
    <Button text="Tools" :dropdown-mobile-right="true">
      <template #icon>
        <span class="iconify text-sm" data-icon="jam:tools" />
      </template>

      <template #dropdown>
        <div class="space-x-1.5 flex justify-end" p="t-2 b-1 x-2">
          <FontCN />
          <FontEN />
          <ThemeColor />
        </div>
        <div class="space-x-1.5 flex justify-end" p="t-1 b-2 x-2">
          <ParagraphSpace />
          <LineHeight />
          <FontSize />
          <MarginVertical />
          <MarginHorizontal />
          <Paper />
        </div>
      </template>
    </Button>
  </div>
</template>

<script lang="ts" setup>
import Button from "~/components/base/Button.vue";
import FontCN from "./tools/FontCN.vue";
import FontEN from "./tools/FontEN.vue";
import FontSize from "./tools/FontSize.vue";
import ThemeColor from "./tools/ThemeColor.vue";
import MarginVertical from "./tools/MarginVertical.vue";
import MarginHorizontal from "./tools/MarginHorizontal.vue";
import LineHeight from "./tools/LineHeight.vue";
import ParagraphSpace from "./tools/ParagraphSpace.vue";
import Paper from "./tools/Paper.vue";
</script>
