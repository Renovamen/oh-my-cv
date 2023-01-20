<template>
  <div text-center>
    <DisplayInput
      class="w-50 mx-auto"
      :text="inputName"
      :on-entered="() => renameResume(resume.id, inputName.trim())"
      @change="(text) => (inputName = text)"
    />
    <div text-xs text-light-c mt-1.5>
      {{ t("resumes.updated") }}{{ updated }}
    </div>
    <div text-xs text-light-c mt-0.5>
      {{ t("resumes.created") }}{{ created }}
    </div>
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

// Date
const formatDate = (date: string) => {
  return new Date(parseInt(date))
    .toISOString()
    .substring(0, 19)
    .replace("T", " ")
    .replaceAll("-", "/");
};

const created = formatDate(props.resume.id);
const updated = formatDate(props.resume.update);
</script>
