<template>
  <OnClickOutside
    class="!m-auto z-30 fixed h-40 w-full pc:w-96 left-0 right-0 top-0 bottom-0 flex flex-col shadow"
    bg="white dark:dark-400"
    border="1 gray-400 dark:gray-500 rounded"
    @trigger="$emit('closeImport')"
  >
    <div>
      <button
        class="absolute right-3 top-2.5 cursor-pointer"
        @click="$emit('closeImport')"
      >
        <span class="iconify" data-icon="ic:baseline-close" />
      </button>

      <div p="x-4 t-3 b-1" font="medium">{{ t("import.title") }}</div>

      <div class="pt-3 flex text-sm">
        <button
          class="px-2 py-0.5"
          border="l r t rounded-t-sm"
          :class="[
            clickedButton === 0 && 'ml-4 bg-gray-200 dark:bg-dark-100 border-c',
            clickedButton !== 0 && 'ml-2 border-transparent'
          ]"
          @click="clickedButton = 0"
        >
          {{ t("import.from_local") }}
        </button>
        <button
          class="px-2 py-0.5"
          border="l r t rounded-t-sm"
          :class="[
            clickedButton === 1 && 'bg-gray-200 dark:bg-dark-100 border-c',
            clickedButton !== 1 && 'border-transparent'
          ]"
          @click="clickedButton = 1"
        >
          {{ t("import.from_url") }}
        </button>
      </div>
    </div>

    <div class="flex-1 hstack px-4 rounded-b" bg="gray-200 dark:dark-100">
      <input
        v-if="clickedButton === 0"
        class="text-xs"
        accept=".md"
        type="file"
        @change="uploadFileFromLocal"
      />

      <div v-if="clickedButton === 1" class="flex w-full">
        <input
          class="flex-1 h-7 mr-1.5 px-1 text-sm rounded-sm outline-none dark:bg-dark-400"
          :value="pastedURL"
          @change="pastedURL = ($event.target as HTMLTextAreaElement).value"
          @keyup.enter="uploadFileFromURL"
        />
        <button
          class="flex-center w-8 h-7 bg-blue-500 hover:bg-blue-600 text-white rounded-sm"
          @click="uploadFileFromURL"
        >
          <span class="iconify" data-icon="line-md:confirm" />
        </button>
      </div>
    </div>
  </OnClickOutside>
</template>

<script lang="ts" setup>
import { OnClickOutside } from "@vueuse/components";
import { fetchFile, uploadFile } from "~/utils";

const { t } = useI18n();
const { setData } = useDataStore();

const emit = defineEmits<{
  (e: "closeImport"): void;
}>();

const clickedButton = ref(0);
const pastedURL = ref("");

const uploadFileFromURL = () => {
  if (pastedURL.value.trim() === "") return;
  fetchFile(pastedURL.value).then((content: string) => {
    setData("mdContent", content);
    setData("fileImported", true);
    emit("closeImport");
  });
};

const uploadFileFromLocal = (e: Event) => {
  uploadFile(e, (content: string) => {
    setData("mdContent", content);
    setData("fileImported", true);
    emit("closeImport");
  });
};
</script>
