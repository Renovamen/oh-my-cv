<template>
  <DisplayInput
    class="w-50"
    :text="inputName"
    :on-entered="() => renameResume(data.curResumeId!, inputName.trim())"
    @change="(text) => (inputName = text)"
  />
</template>

<script lang="ts" setup>
import { renameResume } from "~/utils";

const { data } = useDataStore();
const inputName = ref(data.curResumeName);
</script>
