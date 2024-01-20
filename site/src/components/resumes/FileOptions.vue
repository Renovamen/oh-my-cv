<template>
  <div class="file-options hstack space-x-2">
    <button :aria-label="$t('resumes.saveas')" @click="saveResumesToLocal">
      <span i-ic:baseline-save-as text-lg />
      <span>{{ $t("resumes.saveas") }}</span>
    </button>
    <button
      :aria-label="$t('resumes.import')"
      @click="() => importResumesFromLocal(() => $emit('update'))"
    >
      <span i-ic:round-upload-file text-lg />
      <span>{{ $t("resumes.import") }}</span>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { useShortcuts } from "@renovamen/vue-shortcuts";

defineEmits<{
  (e: "update"): void;
}>();

useShortcuts("shift+ctrl+s", saveResumesToLocal);
</script>

<style scoped>
.file-options button {
  @apply rect-btn border border-dark-c hover:bg-darker-c;
}
</style>
