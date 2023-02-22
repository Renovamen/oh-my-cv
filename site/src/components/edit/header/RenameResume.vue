<template>
  <DisplayInput
    class="w-32 sm:w-50 text-sm md:text-base"
    :text="data.curResumeName"
    :on-entered="rename"
  />
</template>

<script lang="ts" setup>
import { renameResume } from "~/utils";

const { data } = useDataStore();

const rename = (text: string) => {
  data.curResumeName = text;
  renameResume(data.curResumeId!, text);
};
</script>
