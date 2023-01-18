<template>
  <div class="file-options hstack space-x-2">
    <button
      class="text-white bg-blue-500 hover:(bg-blue-600 dark:bg-blue-400)"
      @click="newAndSwitch"
    >
      <span
        class="iconify"
        data-icon="material-symbols:note-add-outline-rounded"
      />
      <span>{{ t("resumes.new") }}</span>
    </button>
    <button
      class="border border-dark-c hover:bg-hover-c"
      @click="saveResumesToLocal"
    >
      <span class="iconify" data-icon="ic:baseline-save-as" />
      <span>{{ t("resumes.saveas") }}</span>
    </button>
    <button
      class="border border-dark-c hover:bg-hover-c"
      @click="() => importResumesFromLocal(() => $emit('update'))"
    >
      <span class="iconify" data-icon="ic:round-upload-file" />
      <span>{{ t("resumes.import") }}</span>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { useShortcuts } from "@renovamen/vue-shortcuts";
import { newResume, saveResumesToLocal, importResumesFromLocal } from "~/utils";

defineEmits<{
  (e: "update"): void;
}>();

const router = useRouter();
const { t } = useI18n();
const { locale } = useI18n();

const newAndSwitch = async () => {
  const id = await newResume();
  router.push({ path: switchPath("edit", locale.value), query: { id: id } });
};

useShortcuts("shift+ctrl+s", saveResumesToLocal);
</script>

<style scoped>
.file-options button {
  @apply hstack space-x-1.5 px-2.5 py-1.5 rounded;
}

.file-options button .iconify {
  @apply w-5 h-5;
}
</style>
