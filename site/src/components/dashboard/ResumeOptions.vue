<template>
  <div class="absolute right-3 top-3 space-y-2">
    <UiButton
      size="round"
      class="flex hover:ring-none bg-gray-500/80 hover:bg-gray-500"
      @click="duplicate"
    >
      <span i-ion:duplicate />
    </UiButton>
    <UiButton
      size="round"
      class="flex hover:ring-none bg-gray-500/80 hover:bg-gray-500"
      @click="remove"
    >
      <span i-material-symbols:delete-outline-rounded />
    </UiButton>
  </div>
</template>

<script lang="ts" setup>
import type { DbResume } from "~/utils/storage";

const props = defineProps<{
  resume: DbResume;
}>();

const emit = defineEmits<{
  (e: "update"): void;
}>();

const duplicate = async () => {
  await storageService.duplicateResume(props.resume.id);
  emit("update");
};

const remove = async () => {
  await storageService.deleteResume(props.resume.id);
  emit("update");
};
</script>
