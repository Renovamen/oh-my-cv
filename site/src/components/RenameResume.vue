<template>
  <Pane
    class="h-25 w-full pc:w-96"
    :text="t('resume_name.rename')"
    icon="bx:edit"
    @close="emit('closeRename')"
  >
    <div flex-1 flex p-4 bg-hover-c>
      <input
        v-model="inputName"
        class="flex-1 h-7 mr-1.5 px-1 text-sm rounded-sm outline-none bg-c"
        @keyup.enter="rename"
      />
      <button
        class="flex-center w-8 h-7 bg-blue-500 hover:bg-blue-600 text-white rounded-sm"
        @click="rename"
      >
        <span class="iconify" data-icon="line-md:confirm" />
      </button>
    </div>
  </Pane>
</template>

<script lang="ts" setup>
import { saveResume } from "~/utils";

const { t } = useI18n();
const { data, setData } = useDataStore();

const emit = defineEmits<{
  (e: "closeRename"): void;
}>();

const inputName = ref(data.curResumeName);

const rename = () => {
  setData("curResumeName", inputName.value);
  saveResume();
  emit("closeRename");
};
</script>
