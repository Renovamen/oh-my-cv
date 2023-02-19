<template>
  <button class="round-btn" @click="save">
    <span class="iconify md:text-lg" data-icon="ic:baseline-save" />
  </button>
</template>

<script lang="ts" setup>
import { useShortcuts } from "@renovamen/vue-shortcuts";
import { saveResume } from "~/utils";
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
