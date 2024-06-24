<template>
  <SmartPages
    :id="id.toString()"
    ref="smart"
    :content="markdownService.renderResume(markdown)"
    :height="constant.PAPER.sizeToPx(styles.paper, 'h')"
    :width="constant.PAPER.SIZES[styles.paper].w"
    :top="styles.marginV"
    :bottom="Math.max(styles.marginV - 10, constant.RENDER.PRINT_BOTTOM)"
    :left="styles.marginH"
    :right="styles.marginH"
    :before-break-page="() => googleFontsService.presetObserver(styles)"
    :watch="[styles.lineHeight, styles.paragraphSpace, styles.fontSize, css]"
    :watch-delay="[styles.fontCJK, styles.fontEN]"
  />
</template>

<script lang="ts" setup>
import SmartPages from "@ohmycv/vue-smart-pages";
import type { ResumeStyles } from "~/composables/stores/style";

defineProps<{
  id: string | number;
  markdown: string;
  css?: string;
  styles: ResumeStyles;
}>();

const constant = useConstant();

const smart = ref();

const forceUpdate = () => {
  smart.value.resolvePages(100);
};

defineExpose({
  forceUpdate
});
</script>
