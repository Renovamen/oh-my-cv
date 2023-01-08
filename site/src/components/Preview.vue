<template>
  <Zoom ref="zoom" :scale="scale" p-1>
    <SmartPages
      class="preview"
      :content="html"
      :height="getPaperPx(styles.paper, 'h')"
      :width="PAPER[styles.paper].w"
      :top="styles.marginV"
      :bottom="Math.max(styles.marginV - 10, CHROME_PRINT_BOTTOM)"
      :left="styles.marginH"
      :right="styles.marginH"
      :before-break-page="onFontLoaded"
      :watch="[styles.lineHeight, styles.paragraphSpace, styles.fontSize]"
      :watch-delay="[styles.fontCJK, styles.fontEN]"
    />
  </Zoom>

  <div
    class="zoom-bar hstack fixed bottom-3 lg:(bottom-auto top-15) ml-3 shadow-c rounded-full overflow-hidden text-white bg-blue-500 lg:opacity-0 hover:opacity-100"
  >
    <button @click="scale *= 1.1">
      <span class="iconify" data-icon="lucide:zoom-in" />
    </button>
    <button @click="scale /= 1.1">
      <span class="iconify" data-icon="lucide:zoom-out" />
    </button>
    <button @click="fitWidth">
      <span class="iconify" data-icon="fluent:arrow-autofit-width-20-filled" />
    </button>
    <button @click="fitHeight">
      <span class="iconify" data-icon="fluent:arrow-autofit-height-20-filled" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import SmartPages from "vue-smart-pages";
import Zoom from "@renovamen/vue-zoom";
import { CHROME_PRINT_BOTTOM, PAPER, getPaperPx } from "~/utils/constants";

const scale = ref(1);
const zoom = ref<HTMLElement>();

const html = usePreviewHTML();
const { width, height } = useElementSize(zoom);
const { styles, onFontLoaded } = useStyleStore();

const fitWidth = () => {
  scale.value = width.value / getPaperPx(styles.paper, "w");
};

const fitHeight = () => {
  scale.value = height.value / getPaperPx(styles.paper, "h");
};

setTimeout(fitWidth, 300);
</script>

<style scoped>
.zoom-bar button {
  @apply flex-center h-10 w-10 text-lg hover:bg-blue-600;
}
</style>
