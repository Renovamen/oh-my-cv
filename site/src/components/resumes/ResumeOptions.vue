<template>
  <div class="resume-options absolute right-3 top-3 space-y-2">
    <button @click="duplicate">
      <span class="iconify" data-icon="ion:duplicate" />
    </button>
    <button @click="remove">
      <span
        class="iconify"
        data-icon="material-symbols:delete-outline-rounded"
      />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { deleteResume, duplicateResume } from "~/utils";
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

<style scoped>
.resume-options button {
  @apply flex-center w-8 h-8 rounded-full text-white bg-gray-500/80 hover:bg-gray-500;
}
</style>
