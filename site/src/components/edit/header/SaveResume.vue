<template>
  <button cursor-pointer flex-center @click="save">
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
  const resume = {
    name: data.curResumeName,
    content: data.mdContent,
    styles: toRaw(styles)
  } as ResumeStorageItem;

  saveResume(id!, resume);
};

useShortcuts("ctrl+s", save);
</script>
