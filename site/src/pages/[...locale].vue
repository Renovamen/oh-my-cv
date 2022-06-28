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
    <pane class="preview-pane" min-size="30">
      <div
        class="preview"
        :style="{
          transform: `scale(${ui.previewScale})`,
          marginBottom: `${ui.previewBottom}px`
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
          :watch-delay="[styles.fontCN, styles.fontEN]"
        />
      </div>
    </pane>
  </splitpanes>
</template>

<script lang="ts" setup>
import SmartPages from "vue-smart-pages";
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";
import { updatePreviewScale, updateStyles } from "~/utils";
import { CHROME_PRINT_BOTTOM, PAPER, getPaperPx } from "~/utils/constants";

const { ui } = useUIStore();
const { styles, onFontLoaded } = useStyleStore();

// Initialize styles
onMounted(() => updateStyles());

// Render HTML for previewing
const html = usePreviewHTML();

// Handle window size changing
const { isMobile } = resolveWindowSize();

// Handle languages
const props = defineProps<{ locale: string[] | string }>();
watchLocalePath(props);
</script>
