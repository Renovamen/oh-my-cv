<template>
  <UiButton
    class="gap-x-1.5 w-full h-8 justify-start"
    variant="ghost"
    size="sm"
    @click="save"
  >
    <span i-ic:baseline-save text-base />
    {{ $t("toolbar.file.save") }}
    <span class="flex-1 tracking-widest" text="xs right muted-foreground">⌘ S</span>
  </UiButton>
</template>

<script lang="ts" setup>
import { useShortcuts } from "@ohmycv/vue-shortcuts";
import { gistService } from "~/utils/storage";

const { data } = useDataStore();
const { styles } = useStyleStore();

const save = async () => {
  if (!data.resumeId) return;

  await storageService.updateResume({
    id: data.resumeId,
    name: data.resumeName,
    markdown: data.markdown,
    css: data.css,
    styles: toRaw(styles)
  });

  if (gistService.hasToken() && gistService.isAutoSyncEnabled()) {
    storageService.syncToGithub().catch((err) => {
      console.warn("GitHub auto-sync error:", err);
    });
  }
};

// Use the shortcut to save the current resume
useShortcuts("ctrl+s", save);
</script>
