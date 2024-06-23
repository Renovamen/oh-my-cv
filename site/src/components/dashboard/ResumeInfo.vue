<template>
  <div class="text-center">
    <SharedUiEditable
      class="w-53 mx-auto"
      :default-value="resume.name"
      submit-mode="enter"
      auto-resize
      @submit="(text) => rename(text)"
    />

    <div text="xs muted-foreground" mt-1.5>
      {{ $t("dashboard.updated") }}{{ updated_at }}
    </div>
    <div text="xs muted-foreground" mt-0.5>
      {{ $t("dashboard.created") }}{{ created_at }}
    </div>
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

const rename = async (text?: string) => {
  if (!text) return;

  await storageService.updateResume(
    {
      id: props.resume.id,
      name: text
    },
    false
  );

  emit("update");
};

const formatDate = (date?: string) =>
  date &&
  new Date(parseInt(date))
    .toISOString()
    .substring(0, 19)
    .replace("T", " ")
    .replaceAll("-", "/");

const created_at = computed(() => formatDate(props.resume.created_at));
const updated_at = computed(() => formatDate(props.resume.updated_at));
</script>
