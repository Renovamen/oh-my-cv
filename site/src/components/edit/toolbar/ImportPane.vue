<template>
  <PopupPane
    class="h-40 w-full md:w-96"
    :text="t('import.title')"
    icon="mdi:upload"
    @close="emit('closeImport')"
  >
    <div class="hstack pt-3 text-sm">
      <button
        class="px-2 py-0.5"
        border="l r t rounded-t-sm"
        :class="[
          activatedTab === 0 && 'ml-4 bg-dark-c border-c',
          activatedTab !== 0 && 'ml-2 border-transparent'
        ]"
        @click="activatedTab = 0"
      >
        {{ t("import.from_local") }}
      </button>
      <button
        class="px-2 py-0.5"
        border="l r t rounded-t-sm"
        :class="[
          activatedTab === 1 && 'bg-dark-c border-c',
          activatedTab !== 1 && 'border-transparent'
        ]"
        @click="activatedTab = 1"
      >
        {{ t("import.from_url") }}
      </button>
    </div>

    <div flex-1 hstack px-4 bg-dark-c>
      <div v-if="activatedTab === 0" class="hstack text-xs space-x-1.5">
        <button
          class="px-1.5 py-0.5 rounded-[3px] border border-dark-c hover:(bg-gray-200 dark:bg-gray-700)"
          @click="uploadFileFromLocal"
        >
          Choose File
        </button>
        <span>No file choosen</span>
      </div>

      <div v-if="activatedTab === 1" class="hstack w-full">
        <input
          class="flex-1 h-7 mr-1.5 px-1 text-sm rounded-sm outline-none bg-c"
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
  </PopupPane>
</template>

<script lang="ts" setup>
import { fetchFile, uploadFile } from "@renovamen/utils";
import { setResumeMd } from "~/utils";

const { t } = useI18n();

const emit = defineEmits<{
  (e: "closeImport"): void;
}>();

const activatedTab = ref(0);
const pastedURL = ref("");

const uploadFileFromURL = () => {
  if (pastedURL.value.trim() === "") return;
  fetchFile(pastedURL.value).then((content: string) => {
    setResumeMd(content);
    emit("closeImport");
  });
};

const uploadFileFromLocal = () => {
  uploadFile((content: string) => {
    setResumeMd(content);
    emit("closeImport");
  }, ".md");
};
</script>
