<template>
  <button class="round-btn" @click="save">
    <span i-ic:baseline-save md:text-lg />
  </button>
</template>

<script lang="ts" setup>
import { useShortcuts } from "@ohmycv/vue-shortcuts";
import type { ResumeStorageItem } from "~/types";

const { data } = useDataStore();
const { styles } = useStyleStore();

const save = () => {
  const id = data.curResumeId;
  const update = new Date().getTime().toString(); // record update time
  const resume = {
    name: data.curResumeName,
    markdown: data.mdContent,
    css: data.cssContent,
    styles: toRaw(styles),
    update: update
  } as ResumeStorageItem;

  saveResume(id!, resume);
};

useShortcuts("ctrl+s", save);
</script>
