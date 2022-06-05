<template>
  <Header />

  <splitpanes
    class="resume-main default-theme"
    :horizontal="isMobile"
    @resize="updatePreviewScale"
  >
    <pane class="editor">
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
        <div class="preview-page" v-html="html" />
      </div>
    </pane>
  </splitpanes>
</template>

<script lang="ts" setup>
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";
import { updatePreviewScale, updateStyles } from "~/utils";

const { ui } = useUIStore();

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
