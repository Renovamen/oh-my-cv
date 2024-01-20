<template>
  <ToolItem
    :text="$t('toolbar.correct_case.text')"
    icon="i-icon-park-outline:check-correct"
  >
    <div
      class="bg-c lg:bg-dark-c rounded py-2 px-3"
      v-html="$t('toolbar.correct_case.desc')"
    />

    <button
      class="rect-btn mt-3 ml-auto text-white"
      bg="blue-500 hover:(blue-600 dark:blue-400)"
      @click="correct"
    >
      <span i-carbon:rocket />
      <span>{{ $t("toolbar.correct_case.btn") }}</span>
    </button>
  </ToolItem>
</template>

<script lang="ts" setup>
import { correctCase } from "correct-case";

const { data } = useDataStore();
const toast = useToast();

const correct = async () => {
  const md = data.mdContent;
  const result = await correctCase(md);

  setResumeMd(result.text);

  const corrected = result.correctedWords ? result.correctedWords.length : true;
  toast.correct(corrected);
};
</script>
