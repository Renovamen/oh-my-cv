<template>
  <div ref="editorRef" class="h-full" />
</template>

<script lang="ts" setup>
import type * as Monaco from "monaco-editor";
import { fetchFile, isClient } from "~/utils";
import { setupMonaco } from "~/monaco";

const { data, setData } = useDataStore();

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

    monaco.editor.setTheme(isDark.value ? "vs-dark" : "vs");

    watch(isDark, (val) => {
      monaco.editor.setTheme(val ? "vs-dark" : "vs");
    });
  }

  // Load example markdown content
  fetchFile("/example.md").then((text: string) => {
    setData("mdContent", text);
    editor?.setValue(text);
  });
});

onBeforeUnmount(() => editor?.dispose());

// Update editor content after uploading a file
watch(
  () => data.fileImported,
  () => {
    editor?.setValue(data.mdContent);
    setData("fileImported", false);
  }
);
</script>
