<template>
  <div
    class="z-10 h-40 w-full sm:w-96 m-auto fixed left-0 right-0 top-0 bottom-0 flex flex-col bg-white border border-gray-400 rounded shadow"
  >
    <div>
      <button
        class="absolute right-3 top-3.5 cursor-pointer"
        @click="$emit('closeImport')"
      >
        <span class="iconify" data-icon="ic:baseline-close" />
      </button>

      <div class="px-4 pt-3 pb-1 font-medium">Import a Markdown file</div>

      <div class="pt-3 flex text-sm">
        <button
          class="px-2 py-0.5 border-l border-r border-t rounded-t-sm"
          :class="[
            clickedButton === 0 && 'ml-4 bg-gray-200 border-gray-400',
            clickedButton !== 0 && 'ml-2 border-transparent'
          ]"
          @click="clickedButton = 0"
        >
          Upload a file
        </button>
        <button
          class="px-2 py-0.5 border-l border-r border-t rounded-t-sm"
          :class="[
            clickedButton === 1 && 'bg-gray-200 border-gray-400',
            clickedButton !== 1 && 'border-transparent'
          ]"
          @click="clickedButton = 1"
        >
          Paste file URL
        </button>
      </div>
    </div>

    <div class="bg-gray-200 flex-1 flex items-center px-4 rounded-b">
      <input
        v-if="clickedButton === 0"
        class="text-xs"
        accept=".md"
        type="file"
        @change="uploadFileFromLocal"
      />

      <div v-if="clickedButton === 1" class="flex w-full">
        <input
          class="flex-1 h-7 mr-1.5 px-1 text-sm rounded-sm outline-none"
          :value="pastedURL"
          @change="pastedURL = $event.target.value"
          @keyup.enter="uploadFileFromURL"
        />
        <button
          class="flex items-center justify-center w-8 h-7 bg-blue-500 hover:bg-blue-600 text-white rounded-sm"
          @click="uploadFileFromURL"
        >
          <span class="iconify" data-icon="line-md:confirm" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { fetchFile, uploadFile } from "../utils";

const emit = defineEmits<{
  (e: "closeImport"): void;
  (e: "updateMarkdownContent", content: string): void;
}>();

const clickedButton = ref(0);
const pastedURL = ref("");

const uploadFileFromURL = () => {
  if (pastedURL.value.trim() === "") return;
  fetchFile(pastedURL.value).then((content: string) => {
    emit("updateMarkdownContent", content);
  });
};

const uploadFileFromLocal = (e: any) => {
  uploadFile(e, (content: string) => {
    emit("updateMarkdownContent", content);
  });
};
</script>
