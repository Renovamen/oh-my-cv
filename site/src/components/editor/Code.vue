<template>
  <TabsRoot
    class="pane-container bg-background"
    flex="~ col"
    default-value="markdown"
    @update:model-value="(payload) => activate(payload)"
  >
    <TabsList
      class="relative shrink-0 hstack w-full text-sm h-9 border-b px-4"
      md="text-base h-10"
    >
      <TabsIndicator
        class="absolute left-0 bottom-0 h-0.5 bg-primary rounded-full w-[--radix-tabs-indicator-size] translate-x-[--radix-tabs-indicator-position] transition-[width,transform] duration-300"
      />

      <TabsTrigger value="markdown" p="x-2">Markdown</TabsTrigger>
      <TabsTrigger value="css" p="x-4">CSS</TabsTrigger>
    </TabsList>

    <div ref="editorRef" flex-1 />
  </TabsRoot>
</template>

<script lang="ts" setup>
import { isClient } from "@vueuse/core";
import type * as Monaco from "monaco-editor";
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
</script>
