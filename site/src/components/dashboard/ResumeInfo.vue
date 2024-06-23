<template>
  <div class="text-center">
    <SharedUiEditable
      class="w-53 mx-auto"
      :default-value="resume.name"
      @submit="(text) => rename(text)"
    />

    <div v-if="updated" text="xs muted-foreground" mt-1.5>
      {{ $t("dashboard.updated") }}{{ updated }}
    </div>
    <div text="xs muted-foreground" mt-0.5>
      {{ $t("dashboard.created") }}{{ created }}
    </div>
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

const rename = async (text?: string) => {
  if (!text) return;

  await renameResume(props.resume.id, text);
  emit("update");
};

const formatDate = (date?: string) =>
  date &&
  new Date(parseInt(date))
    .toISOString()
    .substring(0, 19)
    .replace("T", " ")
    .replaceAll("-", "/");

const created = computed(() => formatDate(props.resume.id));
const updated = computed(() => formatDate(props.resume.update));
</script>
