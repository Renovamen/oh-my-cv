<template>
  <Editable
    id="edit-rename"
    class="w-32 sm:w-50 text-sm md:text-base"
    :default="data.curResumeName"
    :on-value-commit="rename"
  />
</template>

<script lang="ts" setup>
const { data } = useDataStore();

const rename = (text: string) => {
  data.curResumeName = text;
  renameResume(data.curResumeId!, text);
};
</script>
