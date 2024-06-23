<template>
  <div class="flex gap-2">
    <UiButton :aria-label="$t('dashboard.saveas')" @click="exportToJSON">
      <span i-ic:baseline-save-as size-4 mr-1 />
      {{ $t("dashboard.saveas") }}
    </UiButton>
    <UiButton
      class="bg-neutral-800 hover:(bg-neutral-800/90 ring-neutral-800/40) dark:(bg-secondary hover:bg-background hover:ring-secondary/40)"
      :aria-label="$t('dashboard.import')"
      @click="() => storageService.importFromJson(() => $emit('update'))"
    >
      <span i-ic:round-upload-file size-4 mr-1 />
      {{ $t("dashboard.import") }}
    </UiButton>
  </div>
</template>

<script lang="ts" setup>
import { useShortcuts } from "@ohmycv/vue-shortcuts";

defineEmits<{
  (e: "update"): void;
}>();

const exportToJSON = () => storageService.exportToJSON();

useShortcuts("shift+ctrl+s", exportToJSON);
</script>
