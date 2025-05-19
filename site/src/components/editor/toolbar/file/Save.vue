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

const { data } = useDataStore();
const { styles } = useStyleStore();

const saved = ref(false);

const unsavePrevent = (e: BeforeUnloadEvent) => {
  if (saved.value) return;

  // Cancel the event as stated by the standard.
  e.preventDefault();
  // Chrome requires returnValue to be set.
  e.returnValue = "";

  return "";
};
const unbindListener = () => window.removeEventListener("beforeunload", unsavePrevent);

const save = async () => {
  if (!data.resumeId) return;

  saved.value = true;
  await storageService.updateResume({
    id: data.resumeId,
    name: data.resumeName,
    markdown: data.markdown,
    css: data.css,
    styles: toRaw(styles)
  });
};

// Use the shortcut to save the current resume
useShortcuts("ctrl+s", save);

watchEffect((onCleanup) => {
  if (!data.resumeId) return;

  window.addEventListener("beforeunload", unsavePrevent);

  onCleanup(unbindListener);
});
</script>
