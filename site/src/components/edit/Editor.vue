<template>
  <div class="pane-container">
    <div
      class="hstack h-9 text-sm md:(h-10 text-base) w-full text-c bg-c border-b border-c px-4 space-x-2"
    >
      <button
        class="relative leading-9 md:leading-10 px-2"
        @click="activateMarkdown"
      >
        Markdown
        <span
          v-show="!activatedTab"
          class="absolute w-full h-0.4 bg-blue-500 dark:bg-blue-400 left-0 bottom-0 rounded"
        />
      </button>
      <button
        class="relative leading-9 md:leading-10 px-2"
        @click="activateCSS"
      >
        CSS
        <span
          v-show="activatedTab"
          class="absolute w-full h-0.4 bg-blue-500 dark:bg-blue-400 left-0 bottom-0 rounded"
        />
      </button>
    </div>
    <div ref="editorRef" h-full />
  </div>
</template>

<script lang="ts" setup>
import type * as Monaco from "monaco-editor";
import { isClient } from "@renovamen/utils";
import { setupMonacoEditor } from "~/monaco";

const editorRef = ref<HTMLDivElement>();

let editor:
  | {
      editor: Monaco.editor.IStandaloneCodeEditor;
      models: {
        [key: string]: {
          getModel: () => Monaco.editor.ITextModel;
          activate: () => void;
          dispose: () => void;
        };
      };
      dispose: () => void;
    }
  | undefined;

// Setup Monaco editor
onMounted(async () => {
  if (isClient && editorRef.value && !editor) {
    editor = await setupMonacoEditor(editorRef.value);
    activateMarkdown();
  }
});

onBeforeUnmount(() => editor?.dispose());

// Watch the updates of editor content on other places
const { data, toggleMdFlag, toggleCssFlag } = useDataStore();

watch(
  () => data.mdFlag,
  () => {
    if (data.mdFlag) {
      editor?.models["markdown"].getModel().setValue(data.mdContent);
      toggleMdFlag(false);
    }
  }
);

watch(
  () => data.cssFlag,
  () => {
    if (data.cssFlag) {
      editor?.models["css"].getModel().setValue(data.cssContent);
      toggleCssFlag(false);
    }
  }
);

// Change model
const activatedTab = ref(0);

const activateMarkdown = () => {
  editor?.models["markdown"].activate();
  activatedTab.value = 0;
};

const activateCSS = () => {
  editor?.models["css"].activate();
  activatedTab.value = 1;
};
</script>
