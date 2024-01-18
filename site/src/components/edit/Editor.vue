<template>
  <div class="pane-container" v-bind="api.rootProps">
    <div
      v-bind="api.tablistProps"
      class="hstack h-9 text-sm md:(h-10 text-base) w-full text-c bg-c border-b border-c px-4 space-x-2"
    >
      <button
        v-for="tab in tabList"
        v-bind="api.getTriggerProps({ value: tab.value })"
        :key="tab.value"
        class="relative leading-9 md:leading-10 px-2"
      >
        {{ tab.label }}
        <span
          v-show="api.value == tab.value"
          class="absolute w-full h-0.4 bg-blue-500 dark:bg-blue-400 left-0 bottom-0 rounded"
        />
      </button>
    </div>

    <div ref="editorRef" h-full />
  </div>
</template>

<script lang="ts" setup>
import type * as Monaco from "monaco-editor";
import * as tabs from "@zag-js/tabs";
import { normalizeProps, useMachine } from "@zag-js/vue";
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
    activate("markdown");
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
const activate = (value: "markdown" | "css") => {
  editor?.models[value].activate();
};

// Tabs UI
const tabList = [
  { value: "markdown", label: "Markdown" },
  { value: "css", label: "CSS" }
];

const [state, send] = useMachine(
  tabs.machine({
    id: "editor",
    value: "markdown",
    onValueChange: (details) => {
      activate(details.value as "markdown" | "css");
    }
  })
);
const api = computed(() => tabs.connect(state.value, send, normalizeProps));
</script>
