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
          transform: `scale(${store.state.ui.previewScale})`,
          marginBottom: `${store.state.ui.previewBottom}px`
        }"
      >
        <div class="preview-page" v-html="html" />
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
import Header from "~/components/Header.vue";
import { setStoreState } from "~/store";
import {
  fetchFile,
  handlePageBreak,
  renderPreviewHTML,
  updatePreviewScale,
  updateStyles
} from "~/utils";
import { useFonts } from "~/composables";

const store = useStore();
const { onFontLoaded } = useFonts();

const editorRef = ref<HTMLDivElement>();
let editor: monaco.editor.IStandaloneCodeEditor | undefined;

onMounted(() => {
  fetchFile("/example.md").then((text: string) => {
    setStoreState("data", "mdContent", text);

    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    editor = monaco.editor.create(editorRef.value!, {
      value: store.state.data.mdContent,
      language: "markdown",
      wordWrap: "on",
      fontSize: 13,
      automaticLayout: true
    });

    editor.onDidChangeModelContent(() => {
      setStoreState("data", "mdContent", editor!.getModel()!.getValue());
    });
  });

  // Initialize styles
  updateStyles(store.state.styles);

  // Handle page breaking after HTML changing
  watch(
    () => html.value,
    () =>
      nextTick(() => {
        onFontLoaded.value.then(() => {
          handlePageBreak(store.state.styles);
        });
      })
  );
});

onBeforeUnmount(() => {
  editor?.dispose();
});

// Update editor content after uploading a file

watch(
  () => store.state.data.fileImported,
  () => {
    editor!.getModel()!.setValue(store.state.data.mdContent);
    setStoreState("data", "fileImported", false);
  }
);

// Render HTML for previewing

const html = computed(() => renderPreviewHTML(store.state.data.mdContent));

// Handle window size changing

const { width } = useWindowSize();
const isMobile = ref(false);

const handleWindowSize = () => {
  if (width.value <= 810) isMobile.value = true;
  else isMobile.value = false;
};

handleWindowSize();

watch(
  () => width.value,
  () => {
    handleWindowSize();
    setTimeout(() => updatePreviewScale(), 50);
  }
);
</script>
