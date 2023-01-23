<template>
  <div text-center>
    <DisplayInput
      class="w-53 mx-auto"
      :text="resume.name"
      :on-entered="rename"
    />
    <div v-if="updated" text-xs text-light-c mt-1.5>
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

const emit = defineEmits<{
  (e: "update"): void;
}>();

const rename = async (text: string) => {
  await renameResume(props.resume.id, text);
  emit("update");
};

const { t } = useI18n();

const formatDate = (date?: string) => {
  return (
    date &&
    new Date(parseInt(date))
      .toISOString()
      .substring(0, 19)
      .replace("T", " ")
      .replaceAll("-", "/")
  );
};

const created = computed(() => formatDate(props.resume.id));
const updated = computed(() => formatDate(props.resume.update));
</script>
