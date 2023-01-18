<template>
  <div text-center>
    <DisplayInput
      class="w-50 mx-auto"
      :text="inputName"
      :on-entered="() => renameResume(resume.id, inputName.trim())"
      @change="(text) => (inputName = text)"
    />
    <div text-xs text-light-c mt-1.5>{{ t("resumes.created") }}{{ date }}</div>
  </div>
</template>

<script lang="ts" setup>
import { renameResume } from "~/utils";
import type { ResumeListItem } from "~/types";

const props = defineProps<{
  resume: ResumeListItem;
}>();

const { t } = useI18n();

// Rename
const inputName = ref(props.resume.name);

// Create date
const date = new Date(parseInt(props.resume.id)).toLocaleString();
</script>
