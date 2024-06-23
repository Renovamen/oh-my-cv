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
import type { ResumeListItem } from "~/types";

const props = defineProps<{
  resume: ResumeListItem;
}>();

const emit = defineEmits<{
  (e: "update"): void;
}>();

const duplicate = async () => {
  await duplicateResume(props.resume.id);
  emit("update");
};

const remove = async () => {
  await deleteResume(props.resume.id);
  emit("update");
};
</script>
