<template>
  <div class="app">
    <Header />

    <div class="resume-main">
      <div class="editor">
        <div ref="editorRef" class="h-full"></div>
      </div>

      <div class="preview">
        <div class="preview-paper">
          <div class="preview-header">
            <h1 v-if="frontmatter.name" v-html="frontmatter.name"></h1>
            <span v-for="(item, index) in frontmatter.header" :key="index">
              <a
                v-if="item.link"
                :href="item.link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span v-if="index !== 0"> | </span>
                <span v-html="item.text" />
              </a>
              <span v-else>
                <span v-if="index !== 0"> | </span>
                <span v-html="item.text" />
              </span>
            </span>
          </div>

          <div class="preview-content" v-html="html"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import * as monaco from "monaco-editor";
import MarkdownIt from "markdown-it";
import MarkdownItDeflist from "markdown-it-deflist";
import matter from "front-matter";
import Header from "./components/Header.vue";

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

const fetchMarkdown = (url: string) => {
  return fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw Error("Request error.");
      }
      return res.text();
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

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

const processHTML = (html: string) => {
  const dlReg = /<dl>([\s\S]*?)<\/dl>/g;
  const dlList = html.match(dlReg);

  if (dlList === null) return html;

  for (const dl of dlList) {
    const dtReg = /<dt>([\s\S]*?)<\/dt>/g;
    const dtList = dl.match(dtReg);

    if (!dtList || dtList?.length === 1) continue;

    const newDl = dl.replaceAll("</dd>", "</dd>\n</dl>\n<dl>");
    html = html.replace(dl, newDl);
  }

  return html;
};

const frontmatter = computed(() => {
  const { attributes } = matter(inputText.value);
  return attributes;
});

const html = computed(() => {
  const { body } = matter(inputText.value);
  return processHTML(md.render(body));
});
</script>
