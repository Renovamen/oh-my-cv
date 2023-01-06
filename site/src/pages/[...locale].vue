<template>
  <Header />

  <splitpanes
    class="workspace default-theme"
    :horizontal="isMobile"
    @resize="updatePreviewScale"
  >
    <pane class="editor-pane">
      <Editor />
    </pane>

    <pane class="preview-pane" min-size="20">
      <div
        class="preview"
        :style="{
          transform: `scale(${ui.previewScale})`,
          marginBottom: `${ui.previewBottom}px`,
          marginLeft: `${ui.previewLeft}px`,
          marginRight: `${ui.previewRight}px`
        }"
      >
        <SmartPages
          :content="html"
          :height="getPaperPx(styles.paper, 'h')"
          :width="PAPER[styles.paper].w"
          :top="styles.marginV"
          :bottom="Math.max(styles.marginV - 10, CHROME_PRINT_BOTTOM)"
          :left="styles.marginH"
          :right="styles.marginH"
          :before-break-page="onFontLoaded"
          :after-break-page="updatePreviewScale"
          :watch="[styles.lineHeight, styles.paragraphSpace, styles.fontSize]"
          :watch-delay="[styles.fontCJK, styles.fontEN]"
        />
      </div>
      <Zoom />
    </pane>

    <pane
      v-if="!isMobile && ui.openToolbar"
      class="toolbar-pane"
      :size="size"
      :min-size="minSize"
      :max-size="maxSize"
    >
      <Toolbar />
    </pane>
  </splitpanes>

  <Toolbar
    v-if="isMobile && ui.openToolbar"
    class="toolbar-mobile fixed z-10 right-0 top-12 w-68 max-w-full pb-10 border-l border-c"
  />
</template>

<script lang="ts" setup>
import SmartPages from "vue-smart-pages";
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";
import { fitPreviewWidth, updatePreviewScale } from "~/utils";
import { CHROME_PRINT_BOTTOM, PAPER, getPaperPx } from "~/utils/constants";

const { ui } = useUIStore();
const { styles, onFontLoaded } = useStyleStore();
const { width } = useWindowSize();

// Render HTML for previewing
const html = usePreviewHTML();

// Initialize preview scale
onMounted(() => setTimeout(fitPreviewWidth, 50));

// Responsize
const isMobile = useMobile();

// Handle languages
const props = defineProps<{ locale: string[] | string }>();
watchLocalePath(props);

// Handle notifications
watchToast();

// Splitpane sizes
const size = ~~((300 / width.value) * 100);
const minSize = computed(() => ~~((250 / width.value) * 100));
const maxSize = computed(() => ~~((350 / width.value) * 100));
</script>
