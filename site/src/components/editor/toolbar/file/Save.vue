<template>
  <UiButton
    class="space-x-1.5 w-full h-8 justify-start"
    variant="ghost"
    size="sm"
    @click="save"
  >
    <span i-ic:baseline-save text-base />
    <span>{{ $t("toolbar.file.save") }}</span>
    <span class="flex-1 tracking-widest" text="xs right muted-foreground">⌘ S</span>
  </UiButton>
</template>

<script lang="ts" setup>
import { useShortcuts } from "@ohmycv/vue-shortcuts";

const { data } = useDataStore();
const { styles } = useStyleStore();

const save = async () => {
  if (!data.curResumeId) return;

  await storageService.updateResume({
    id: data.curResumeId,
    name: data.curResumeName,
    markdown: data.mdContent,
    css: data.cssContent,
    styles: toRaw(styles)
  });
};

// Use the shortcut to save the current resume
useShortcuts("ctrl+s", save);
</script>
