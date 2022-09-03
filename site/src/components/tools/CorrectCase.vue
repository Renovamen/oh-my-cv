<template>
  <ToolItem
    :text="t('toolbar.correct_case.text')"
    icon="icon-park-outline:check-correct"
  >
    <div bg-hover-c rounded py-2 px-3>
      {{ t("toolbar.correct_case.desc") }}
    </div>

    <button btn ml-auto @click="correct">
      <span class="iconify" data-icon="carbon:rocket" />
      <span>{{ t("toolbar.correct_case.btn") }}</span>
    </button>
  </ToolItem>
</template>

<script lang="ts" setup>
import { correctCase } from "correct-case";
import { setResumeContent } from "~/utils";

const { t } = useI18n();
const { data } = useDataStore();
const { setToastFlag } = useToastStore();

const correct = async () => {
  const md = data.mdContent;
  const result = await correctCase(md);

  setResumeContent(result.text);

  const corrected = result.correctedWords ? result.correctedWords.length : true;
  setToastFlag("correct", corrected);
};
</script>
