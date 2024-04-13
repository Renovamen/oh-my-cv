<template>
  <div class="edit-page flex flex-col">
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

    <div class="workspace size-full overflow-hidden" flex="~ 1" pb-2>
      <div v-bind="api.rootProps" px-3>
        <div class="editor-pane" v-bind="api.getPanelProps({ id: 'editor' })">
          <Editor />
        </div>

        <div v-bind="api.getResizeTriggerProps({ id: 'editor:preview' })" />

        <div class="preview-pane" v-bind="api.getPanelProps({ id: 'preview' })">
          <Preview />
        </div>
      </div>

      <div v-if="isToolbarOpen" class="tools-pane">
        <Toolbar />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import * as splitter from "@zag-js/splitter";
import { normalizeProps, useMachine } from "@zag-js/vue";

// Horizontal splitpane
const [state, send] = useMachine(
  splitter.machine({
    id: "h",
    size: [{ id: "editor" }, { id: "preview" }]
  })
);

const api = computed(() => splitter.connect(state.value, send, normalizeProps));

// Fetch resume data
const route = useRoute();
(async () => await switchResume(route.params.id as string))();

// Toogle toolbar
const { width } = useWindowSize();
const isToolbarOpen = ref(width.value > 1024);
</script>

<style scoped>
[data-scope="splitter"][data-part="resize-trigger"] {
  @apply relative w-3 outline-none;
}

[data-scope="splitter"][data-part="resize-trigger"]::after {
  @apply content-[""] absolute bg-gray-400/40 w-1 h-10 rounded-full inset-0 m-auto;
}
</style>
