<template>
  <div ref="editorRef" class="h-full" />
</template>

<script lang="ts" setup>
import type * as Monaco from "monaco-editor";
import { isClient, fallToFirstResume } from "~/utils";
import { setupMonaco } from "~/monaco";

const { data, setData, toggleImportedFlag } = useDataStore();

const editorRef = ref<HTMLDivElement>();
let editor: Monaco.editor.IStandaloneCodeEditor | undefined;

// Setup
onMounted(async () => {
  // Monaco editor
  if (isClient && editorRef.value && !editor) {
    const { monaco } = await setupMonaco();

    editor = monaco.editor.create(editorRef.value, {
      value: data.mdContent,
      language: "markdown",
      wordWrap: "on",
      fontSize: 13,
      automaticLayout: true
    });

    editor!.onDidChangeModelContent(() => {
      setData("mdContent", editor!.getValue());
    });

    monaco.editor.defineTheme("vs-dark-dimmed", {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#374151",
        "editor.lineHighlightBorder": "#4b5563",
        "dropdown.background": "#4b5563",
        "menu.separatorBackground": "#6b7280"
      }
    });

    monaco.editor.setTheme(isDark.value ? "vs-dark-dimmed" : "vs");

    watch(isDark, (val) => {
      monaco.editor.setTheme(val ? "vs-dark-dimmed" : "vs");
    });
  }

  // Load saved resume from localStorage
  fallToFirstResume();
});

onBeforeUnmount(() => editor?.dispose());

// Update editor content after uploading a file
watch(
  () => data.fileImported,
  () => {
    if (data.fileImported) {
      editor?.setValue(data.mdContent);
      toggleImportedFlag(false);
    }
  }
);
</script>
