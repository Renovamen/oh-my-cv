<template>
  <Header />

  <splitpanes class="workspace default-theme" :horizontal="isMobile">
    <pane class="editor-pane">
      <Editor />
    </pane>

    <pane class="preview-pane" min-size="20">
      <Preview />
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
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";

const { ui } = useUIStore();
const { width } = useWindowSize();

// Responsize
const isMobile = useMobile();

// Initialize toolbar on mobile
if (isMobile.value) ui.openToolbar = false;

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
