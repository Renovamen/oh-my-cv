<template>
  <div class="hstack space-x-1.5 px-3 w-full h-8">
    <span i-material-symbols:edit-square-outline-rounded text-base />
    <span>{{ $t("toolbar.file.rename") }}</span>
  </div>

  <SharedUiEditable
    class="text-sm ml-8.5 mt-1"
    :default-value="data.resumeName"
    submit-mode="enter"
    auto-resize
    @submit="(text) => rename(text)"
  />
</template>

<script lang="ts" setup>
const { data } = useDataStore();

const rename = async (text?: string) => {
  if (!text || !data.resumeId) return;

  data.resumeName = text;

  await storageService.updateResume(
    {
      id: data.resumeId,
      name: text
    },
    false
  );
};
</script>
