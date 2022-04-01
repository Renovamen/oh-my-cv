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
          transform: `scale(${previewScale})`,
          marginBottom: `${previewBottom}px`
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
import { useStore } from "vuex";
import * as monaco from "monaco-editor";
import { useWindowSize } from "@vueuse/core";
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";
import Header from "./components/Header.vue";
import {
  fetchFile,
  handlePageBreak,
  renderPreviewHTML,
  onStylesUpdate
} from "./utils";

const editorRef = ref<HTMLDivElement>();
let editor: monaco.editor.IStandaloneCodeEditor | undefined;

const inputText = ref("");

onMounted(() => {
  fetchFile("/example.md").then((text: string) => {
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
});

onBeforeUnmount(() => {
  editor?.dispose();
});

// Update Markdown content

const updateMarkdownContent = (content: string) => {
  editor!.getModel()!.setValue(content);
};

// Render HTML for previewing
const store = useStore();
const html = computed(() => renderPreviewHTML(inputText.value));
let hasInitStyles = false;

watch(
  () => html.value,
  () => {
    nextTick(() => {
      if (hasInitStyles) handlePageBreak(store.state);
      else {
        onStylesUpdate(store.state);
        hasInitStyles = true;
      }

      handlePaneResize();
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
    handlePaneResize();
  }
);

// Handle pane size changing

const previewScale = ref(1);
const previewBottom = ref(0);

const handlePaneResize = () => {
  const pane = document.querySelector(".preview-pane") as HTMLElement;
  const paneW = pane.clientWidth;

  const preview = document.querySelector(".preview-container") as HTMLElement;
  const previewH = preview.clientHeight;

  if (paneW >= 804) previewScale.value = 1;
  else previewScale.value = (width.value <= 810 ? width.value : paneW) / 804;

  previewBottom.value = -(1 - previewScale.value) * previewH;
};
</script>
