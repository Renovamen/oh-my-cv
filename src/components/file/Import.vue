<template>
  <OnClickOutside
    class="import-pane z-30 fixed h-40 w-full pc:w-96 left-0 right-0 top-0 bottom-0 flex flex-col bg-white border border-gray-400 rounded shadow"
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
          class="px-2 py-0.5 border-l border-r border-t rounded-t-sm"
          :class="[
            clickedButton === 0 && 'ml-4 bg-gray-200 border-gray-400',
            clickedButton !== 0 && 'ml-2 border-transparent'
          ]"
          @click="clickedButton = 0"
        >
          {{ t("import.from_local") }}
        </button>
        <button
          class="px-2 py-0.5 border-l border-r border-t rounded-t-sm"
          :class="[
            clickedButton === 1 && 'bg-gray-200 border-gray-400',
            clickedButton !== 1 && 'border-transparent'
          ]"
          @click="clickedButton = 1"
        >
          {{ t("import.from_url") }}
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
import { setStoreState } from "~/store";

const { t } = useI18n();

const emit = defineEmits<{
  (e: "closeImport"): void;
}>();

const clickedButton = ref(0);
const pastedURL = ref("");

const uploadFileFromURL = () => {
  if (pastedURL.value.trim() === "") return;
  fetchFile(pastedURL.value).then((content: string) => {
    setStoreState("data", "mdContent", content);
    setStoreState("data", "fileImported", true);
    emit("closeImport");
  });
};

const uploadFileFromLocal = (e: Event) => {
  uploadFile(e, (content: string) => {
    setStoreState("data", "mdContent", content);
    setStoreState("data", "fileImported", true);
    emit("closeImport");
  });
};
</script>

<style scoped>
.import-pane {
  margin: auto !important;
}
</style>
