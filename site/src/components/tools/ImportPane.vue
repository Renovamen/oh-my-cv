<template>
  <Pane
    class="h-40 w-full pc:w-96"
    :text="t('import.title')"
    icon="mdi:upload"
    @close="emit('closeImport')"
  >
    <div class="pt-3 flex text-sm">
      <button
        class="px-2 py-0.5"
        border="l r t rounded-t-sm"
        :class="[
          clickedButton === 0 && 'ml-4 bg-hover-c border-c',
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
          clickedButton === 1 && 'bg-hover-c border-c',
          clickedButton !== 1 && 'border-transparent'
        ]"
        @click="clickedButton = 1"
      >
        {{ t("import.from_url") }}
      </button>
    </div>

    <div flex-1 hstack px-4 bg-hover-c>
      <input
        v-if="clickedButton === 0"
        class="text-xs"
        accept=".md"
        type="file"
        @change="uploadFileFromLocal"
      />

      <div v-if="clickedButton === 1" class="flex w-full">
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
  </Pane>
</template>

<script lang="ts" setup>
import { fetchFile, uploadFile } from "@renovamen/utils";
import { setResumeContent } from "~/utils";

const { t } = useI18n();

const emit = defineEmits<{
  (e: "closeImport"): void;
}>();

const clickedButton = ref(0);
const pastedURL = ref("");

const uploadFileFromURL = () => {
  if (pastedURL.value.trim() === "") return;
  fetchFile(pastedURL.value).then((content: string) => {
    setResumeContent(content);
    emit("closeImport");
  });
};

const uploadFileFromLocal = (e: Event) => {
  uploadFile(e, (content: string) => {
    setResumeContent(content);
    emit("closeImport");
  });
};
</script>
