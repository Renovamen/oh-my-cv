<template>
  <div :id="`resume-${id}`" ref="target" />
</template>

<script lang="ts" setup>
import { useSmartPages } from "@ohmycv/vue-smart-pages";
import type { ResumeStyles } from "~/composables/stores/style";

const props = defineProps<{
  id: string | number;
  markdown: string;
  css?: string;
  styles: ResumeStyles;
}>();

const constant = useConstant();
const target = ref<HTMLElement>();

const size = computed(() => ({
  height: constant.PAPER.sizeToPx(props.styles.paper, "h"),
  width: constant.PAPER.SIZES[props.styles.paper].w
}));
const margins = computed(() => ({
  top: props.styles.marginV,
  bottom: Math.max(props.styles.marginV - 10, constant.RENDER.PRINT_BOTTOM),
  left: props.styles.marginH,
  right: props.styles.marginH
}));
const html = computed(() => markdownService.renderResume(props.markdown));

const { render } = useSmartPages(target, html, size, margins, {
  beforeRender: async () => {
    await googleFontsService.presetObserver(props.styles);
  }
});

watchDebounced(
  () => [
    props.styles.lineHeight,
    props.styles.paragraphSpace,
    props.styles.fontSize,
    props.css,
    props.styles.fontCJK,
    props.styles.fontEN
  ],
  render,
  {
    debounce: 200
  }
);

defineExpose({
  render
});
</script>
