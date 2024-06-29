<template>
  <EditorToolbarBox
    :text="$t('toolbar.correct_case.text')"
    icon="i-icon-park-outline:check-correct"
    class="text-right"
  >
    <div
      p="y-2 x-3"
      bg="background lg:accent"
      class="rounded text-left"
      v-html="$t('toolbar.correct_case.desc')"
    />

    <UiButton @click="correct" size="sm" class="mt-3">
      <span i-carbon:rocket mr-1 />
      {{ $t("toolbar.correct_case.btn") }}
    </UiButton>
  </EditorToolbarBox>
</template>

<script lang="ts" setup>
import { replace } from "@ohmycv/case-police";

const { data, setAndSyncToMonaco } = useDataStore();
const toast = useToast();

const correct = async () => {
  const md = data.markdown;
  const result = replace(md);

  setAndSyncToMonaco("markdown", result?.code ?? md);

  const corrected = result?.changed.length ?? true;
  toast.correct(corrected);
};
</script>
