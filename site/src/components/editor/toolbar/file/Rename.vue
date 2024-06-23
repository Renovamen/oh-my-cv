<template>
  <div class="hstack space-x-1.5 px-3 w-full h-8">
    <span i-material-symbols:edit-square-outline-rounded text-base />
    <span>{{ $t("toolbar.file.rename") }}</span>
  </div>

  <SharedUiEditable
    class="text-sm ml-8.5 mt-1"
    :default-value="data.curResumeName"
    @submit="(text) => rename(text)"
  />
</template>

<script lang="ts" setup>
const { data } = useDataStore();

const rename = (text?: string) => {
  if (!text) return;

  data.curResumeName = text;
  renameResume(data.curResumeId!, text);
};
</script>
