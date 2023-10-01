<template>
  <div class="edit-page">
    <Header>
      <template #middle>
        <RenameResume />
      </template>
      <template #tail>
        <SaveResume />
        <ToggleToolbar
          :is-toolbar-open="isToolbarOpen"
          @toggle-toolbar="isToolbarOpen = !isToolbarOpen"
        />
      </template>
    </Header>

    <splitpanes class="workspace default-theme">
      <pane class="editor-pane pl-2 pr-1">
        <Editor />
      </pane>

      <pane class="preview-pane px-1 pt-0" min-size="20">
        <Preview />
      </pane>

      <pane
        v-if="!isMobile && isToolbarOpen"
        class="toolbar-pane pl-1"
        :size="size"
        :min-size="minSize"
        :max-size="maxSize"
      >
        <Toolbar />
      </pane>
    </splitpanes>

    <Toolbar v-if="isMobile && isToolbarOpen" class="toolbar-mobile" />
  </div>
</template>

<script lang="ts" setup>
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";

// Fetch resume data
const route = useRoute();
(async () => await switchResume(route.params.id as string))();

// Toogle toolbar
const isMobile = useMobile();
const isToolbarOpen = ref(!isMobile.value);

// Handle notifications
watchToast();

// Splitpane sizes
const { width } = useWindowSize();

const size = ~~((300 / width.value) * 100);
const minSize = computed(() => ~~((250 / width.value) * 100));
const maxSize = computed(() => ~~((350 / width.value) * 100));
</script>
