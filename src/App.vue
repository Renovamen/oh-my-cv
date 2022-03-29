<template>
  <Header />

  <div class="resume-main">
    <div class="editor">
      <div ref="editorRef" class="h-full"></div>
    </div>

    <div class="preview-container">
      <div class="preview" v-html="html" />
    </div>
  </div>
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
import MarkdownIt from "markdown-it";
import MarkdownItDeflist from "markdown-it-deflist";
import matter from "front-matter";
import Header from "./components/Header.vue";
import {
  fetchMarkdown,
  handleDeflist,
  handlePageBreak,
  appendHeader
} from "./utils";

const md = new MarkdownIt({ html: true }).use(MarkdownItDeflist);

// Remember old renderer, if overridden, or proxy to default renderer
const defaultRender =
  md.renderer.rules.link_open ||
  function (tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
  };

md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
  // If you are sure other plugins can't add `target` - drop check below
  const aIndex = tokens[idx].attrIndex("target");
  if (aIndex < 0) {
    tokens[idx].attrPush(["target", "_blank"]); // add new attribute
  } else {
    (tokens[idx] as any).attrs[aIndex][1] = "_blank"; // replace value of existing attr
  }
  // pass token to default renderer.
  return defaultRender(tokens, idx, options, env, self);
};

const editorRef = ref<HTMLDivElement>();
let editor: monaco.editor.IStandaloneCodeEditor | undefined;

const inputText = ref("");

onMounted(() => {
  fetchMarkdown("/example.md").then((text: string) => {
    inputText.value = text;

    editor = monaco.editor.create(editorRef.value!, {
      value: inputText.value,
      language: "markdown",
      wordWrap: "on"
    });

    editor.onDidChangeModelContent(() => {
      inputText.value = editor!.getModel()!.getValue();
    });
  });
});

onBeforeUnmount(() => {
  editor?.dispose();
});

const frontmatter = computed(() => {
  const { attributes } = matter(inputText.value);
  return attributes;
});

const html = computed(() => {
  const { body, attributes } = matter(inputText.value);
  return appendHeader(handleDeflist(md.render(body)), attributes);
});

watch(
  () => [html.value, frontmatter.value],
  () => {
    nextTick(() => {
      handlePageBreak();
    });
  }
);
</script>
