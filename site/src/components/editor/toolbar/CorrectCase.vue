<template>
  <EditorToolbarBox
    :text="$t('toolbar.correct_case.title')"
    icon="i-icon-park-outline:check-correct"
  >
    <UiAlert>
      <UiAlertTitle>{{ $t("toolbar.correct_case.example.title") }}</UiAlertTitle>
      <UiAlertDescription>
        {{ $t("toolbar.correct_case.example.content") }}
      </UiAlertDescription>
    </UiAlert>

    <UiAlert variant="info" class="mt-3">
      <UiAlertTitle>{{ $t("toolbar.correct_case.note.title") }}</UiAlertTitle>
      <UiAlertDescription>
        {{ $t("toolbar.correct_case.note.content") }}
      </UiAlertDescription>
    </UiAlert>

    <div class="mt-3 text-right">
      <UiButton @click="correct" size="sm">
        <span i-carbon:rocket mr-1 />
        {{ $t("toolbar.correct_case.btn") }}
      </UiButton>
    </div>
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
  toast.correct(result?.changed);
};
</script>
