<template>
  <SmartPages
    :id="id"
    ref="smart"
    :content="renderMarkdown(markdown)"
    :height="getPaperPx(styles.paper, 'h')"
    :width="PAPER[styles.paper].w"
    :top="styles.marginV"
    :bottom="Math.max(styles.marginV - 10, CHROME_PRINT_BOTTOM)"
    :left="styles.marginH"
    :right="styles.marginH"
    :before-break-page="() => onFontLoaded(styles)"
    :watch="[styles.lineHeight, styles.paragraphSpace, styles.fontSize, css]"
    :watch-delay="[styles.fontCJK, styles.fontEN]"
  />
</template>

<script lang="ts" setup>
import SmartPages from "vue-smart-pages";
import { renderMarkdown, onFontLoaded } from "~/utils";
import { CHROME_PRINT_BOTTOM, PAPER, getPaperPx } from "~/utils/constants";
import type { ResumeStyles } from "~/types";

defineProps<{
  id: string;
  markdown: string;
  css?: string;
  styles: ResumeStyles;
}>();

const smart = ref();

const forceUpdate = () => {
  smart.value.resolvePages(100);
};

defineExpose({
  forceUpdate
});
</script>
