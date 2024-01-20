<template>
  <div flex-1 px-4 py-6 space-y-6 bg-dark-c text-sm>
    <div v-bind="api.rootProps" class="w-full space-y-2">
      <div
        v-bind="api.dropzoneProps"
        class="py-12 hover:bg-darker-c cursor-pointer"
        border="~ c dashed rounded"
      >
        <input v-bind="api.hiddenInputProps" />
        <div text-center>{{ $t("import.from_local") }}</div>
      </div>

      <div v-if="localFile" class="bg-darker-c rounded py-1 px-2">
        {{ localFile }}
      </div>
    </div>

    <div hstack>
      <div flex-1 border="t c" />
      <div px-5>OR</div>
      <div flex-1 border="t c" />
    </div>

    <div class="hstack w-full space-x-1.5">
      <input
        class="flex-1 h-7 px-2 rounded-sm outline-none bg-c"
        :value="pastedURL"
        :placeholder="$t('import.from_url')"
        @change="pastedURL = ($event.target as HTMLTextAreaElement).value"
        @keyup.enter="uploadFileFromURL"
      />
      <button
        class="flex-center w-8 h-7 bg-blue-500 hover:bg-blue-600 text-white rounded-sm"
        @click="uploadFileFromURL"
      >
        <span i-line-md:confirm />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import * as fileUpload from "@zag-js/file-upload";
import { normalizeProps, useMachine } from "@zag-js/vue";
import { fetchFile } from "@renovamen/utils";

// File component component
const localFile = ref<string | null>(null);

const [state, send] = useMachine(
  fileUpload.machine({
    id: "import-dialog",
    accept: ".md",
    onFileAccept: ({ files }) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        const content = reader.result as string;
        setResumeMd(content);
      };
      reader.readAsText(files[0]);

      localFile.value = files[0].name;
      pastedURL.value = "";
    }
  })
);
const api = computed(() => fileUpload.connect(state.value, send, normalizeProps));

// Fetched file from pasted URL
const pastedURL = ref("");

const uploadFileFromURL = () => {
  if (pastedURL.value.trim() === "") return;
  fetchFile(pastedURL.value).then((content: string) => {
    setResumeMd(content);
    localFile.value = null;
  });
};
</script>
