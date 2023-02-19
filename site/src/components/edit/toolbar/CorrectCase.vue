<template>
  <ToolItem
    :text="t('toolbar.correct_case.text')"
    icon="icon-park-outline:check-correct"
  >
    <div
      class="bg-c lg:bg-dark-c rounded py-2 px-3"
      v-html="t('toolbar.correct_case.desc')"
    />

    <button
      class="hstack space-x-1 mt-3 ml-auto px-2 py-1.5 rounded text-white"
      bg="blue-500 hover:(blue-600 dark:blue-400)"
      @click="correct"
    >
      <span class="iconify" data-icon="carbon:rocket" />
      <span>{{ t("toolbar.correct_case.btn") }}</span>
    </button>
  </ToolItem>
</template>

<script lang="ts" setup>
import { correctCase } from "correct-case";
import { setResumeMd } from "~/utils";

const { t } = useI18n();
const { data } = useDataStore();
const { setToastFlag } = useToastStore();

const correct = async () => {
  const md = data.mdContent;
  const result = await correctCase(md);

  setResumeMd(result.text);

  const corrected = result.correctedWords ? result.correctedWords.length : true;
  setToastFlag("correct", corrected);
};
</script>
