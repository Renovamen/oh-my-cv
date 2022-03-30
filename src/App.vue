<template>
  <Header @update-markdown-content="updateMarkdownContent" />

  <splitpanes
    class="resume-main default-theme"
    :horizontal="isMobile"
    @resize="handlePaneResize"
  >
    <pane class="editor">
      <div ref="editorRef" class="h-full" />
    </pane>
    <pane class="preview-pane" min-size="30">
      <div
        class="preview-container"
        :style="{
          transform: `scale(${previewScale})`
        }"
      >
        <div class="preview" v-html="html" />
      </div>
    </pane>
  </splitpanes>
</template>

<script lang="ts" setup>
import {
  ref,
  onMounted,
  onBeforeUnmount,
  computed,
  watch,
  nextTick
} from "vue";
import * as monaco from "monaco-editor";
import { useWindowSize } from "@vueuse/core";
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";
import Header from "./components/Header.vue";
import { fetchMarkdown, handlePageBreak, renderPreviewHTML } from "./utils";

const editorRef = ref<HTMLDivElement>();
let editor: monaco.editor.IStandaloneCodeEditor | undefined;

const inputText = ref("");

onMounted(() => {
  fetchMarkdown("/example.md").then((text: string) => {
    inputText.value = text;

    editor = monaco.editor.create(editorRef.value!, {
      value: inputText.value,
      language: "markdown",
      wordWrap: "on",
      fontSize: 13,
      automaticLayout: true
    });

    editor.onDidChangeModelContent(() => {
      inputText.value = editor!.getModel()!.getValue();
    });
  });

  handleWindowSize();
  handlePaneResize();
});

onBeforeUnmount(() => {
  editor?.dispose();
});

// Update Markdown content

const updateMarkdownContent = (content: string) => {
  editor!.getModel()!.setValue(content);
};

// Render HTML for previewing

const html = computed(() => renderPreviewHTML(inputText.value));

watch(
  () => html.value,
  () => {
    nextTick(() => {
      handlePageBreak();
    });
  }
);

// Handle window size changing

const { width } = useWindowSize();
const isMobile = ref(false);

const handleWindowSize = () => {
  if (width.value <= 810) isMobile.value = true;
  else isMobile.value = false;
};

watch(
  () => width.value,
  () => {
    handleWindowSize();
    nextTick(() => {
      handlePaneResize();
    });
  }
);

// Handle pane size changing

const previewScale = ref(1);

const handlePaneResize = () => {
  const pane = document.querySelector(".preview-pane") as HTMLElement;
  const paneW = pane.clientWidth;

  if (paneW >= 804) previewScale.value = 1;
  else previewScale.value = (width.value <= 810 ? width.value : paneW) / 804;
};
</script>
