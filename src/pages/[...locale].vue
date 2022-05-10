<template>
  <Header />

  <splitpanes
    class="resume-main default-theme"
    :horizontal="isMobile"
    @resize="updatePreviewScale"
  >
    <pane class="editor">
      <div ref="editorRef" class="h-full" />
    </pane>
    <pane class="preview-pane" min-size="30">
      <div
        class="preview"
        :style="{
          transform: `scale(${ui.previewScale})`,
          marginBottom: `${ui.previewBottom}px`
        }"
      >
        <div class="preview-page" v-html="html" />
      </div>
    </pane>
  </splitpanes>
</template>

<script lang="ts" setup>
import * as monaco from "monaco-editor";
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";
import { useDataStore, useUIStore } from "~/store";
import {
  fetchFile,
  handlePageBreak,
  renderPreviewHTML,
  updatePreviewScale,
  updateStyles
} from "~/utils";
import {
  resolveFonts,
  listenLocalePath,
  resolveWindowSize,
  isDark
} from "~/composables";

const { ui } = useUIStore();
const { data, setData } = useDataStore();

const { onFontLoaded } = resolveFonts();

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

  // Initialize styles
  updateStyles();

  // Handle page breaking after HTML changing
  watch(
    () => html.value,
    () =>
      nextTick(() => {
        onFontLoaded.value.then(() => {
          handlePageBreak();
        });
      })
  );
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

// Render HTML for previewing
const html = computed(() => renderPreviewHTML(data.mdContent));

// Handle window size changing
const { isMobile } = resolveWindowSize();

// Handle languages
const props = defineProps<{ locale: string[] | string }>();
listenLocalePath(props);
</script>
