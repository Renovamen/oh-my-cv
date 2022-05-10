<template>
  <div ref="editorRef" class="h-full" />
</template>

<script lang="ts" setup>
import * as monaco from "monaco-editor";
import { useDataStore } from "~/store";
import { fetchFile } from "~/utils";
import { isDark } from "~/composables";

const { data, setData } = useDataStore();

const editorRef = ref<HTMLDivElement>();
let editor: monaco.editor.IStandaloneCodeEditor | undefined;

onMounted(() => {
  fetchFile("/example.md").then((text: string) => {
    setData("mdContent", text);

    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    editor = monaco.editor.create(editorRef.value!, {
      value: data.mdContent,
      language: "markdown",
      wordWrap: "on",
      fontSize: 13,
      automaticLayout: true
    });

    editor.onDidChangeModelContent(() => {
      setData("mdContent", editor!.getModel()!.getValue());
    });

    watch(isDark, (val) => {
      monaco.editor.setTheme(val ? "vs-dark" : "vs");
    });
  });
});

onBeforeUnmount(() => {
  editor?.dispose();
});

// Update editor content after uploading a file
watch(
  () => data.fileImported,
  () => {
    editor!.getModel()!.setValue(data.mdContent);
    setData("fileImported", false);
  }
);
</script>
