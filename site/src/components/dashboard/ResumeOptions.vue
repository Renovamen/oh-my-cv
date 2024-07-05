<template>
  <div flex="~ col gap-y-2" items-end>
    <UiButton
      size="round"
      class="group/btn gap-x-1 transition-all bg-gray-500/90 hover:(bg-gray-500 ring-none w-auto px-2) focus-visible:(w-auto px-2)"
      @click="duplicate"
      :aria-label="$t('dashboard.duplicate')"
    >
      <span i-ion:duplicate />
      <span class="hidden text-xs group-hover/btn:inline group-focus-visible/btn:inline">
        {{ $t("dashboard.duplicate") }}
      </span>
    </UiButton>

    <UiButton
      size="round"
      variant="destructive"
      class="group/btn gap-x-1 transition-all bg-destructive/90 hover:(bg-destructive w-auto px-2) focus-visible:(w-auto px-2)"
      @click="remove"
      :aria-label="$t('dashboard.delete')"
    >
      <span i-material-symbols:delete-outline-rounded />
      <span class="hidden text-xs group-hover/btn:inline group-focus-visible/btn:inline">
        {{ $t("dashboard.delete") }}
      </span>
    </UiButton>
  </div>
</template>

<script lang="ts" setup>
import type { DbResume } from "~/utils/storage";

const props = defineProps<{
  resume: DbResume;
}>();

const emit = defineEmits<{
  (e: "update"): void;
}>();

const duplicate = async () => {
  await storageService.duplicateResume(props.resume.id);
  emit("update");
};

const remove = async () => {
  await storageService.deleteResume(props.resume.id);
  emit("update");
};
</script>
