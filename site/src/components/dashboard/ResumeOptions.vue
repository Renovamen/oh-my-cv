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
      @click="openDeleteDialog"
      :aria-label="$t('dashboard.delete')"
    >
      <span i-material-symbols:delete-outline-rounded />
      <span class="hidden text-xs group-hover/btn:inline group-focus-visible/btn:inline">
        {{ $t("dashboard.delete") }}
      </span>
    </UiButton>

    <UiDialog v-model:open="deleteDialogOpen">
      <UiDialogContent>
        <UiDialogHeader>
          <UiDialogTitle>{{ $t('dashboard.delete_confirm.title') }}</UiDialogTitle>
          <UiDialogDescription>
            {{ $t('dashboard.delete_confirm.message', { name: props.resume.name }) }}
          </UiDialogDescription>
        </UiDialogHeader>

        <div class="py-4">
          <UiInput
            v-model="deleteConfirmation"
            :placeholder="$t('dashboard.delete_confirm.placeholder')"
            @input="deleteConfirmation = $event.target.value"
          />
        </div>

        <UiDialogFooter>
          <UiButton variant="outline" @click="closeDeleteDialog">
            {{ $t('dashboard.cancel') }}
          </UiButton>
          <UiButton
            variant="destructive"
            :disabled="deleteConfirmation !== 'delete'"
            @click="confirmDelete"
          >
            {{ $t('dashboard.delete_confirm.button') }}
          </UiButton>
        </UiDialogFooter>
      </UiDialogContent>
    </UiDialog>
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

// Delete confirmation dialog state
const deleteDialogOpen = ref(false);
const deleteConfirmation = ref("");

const duplicate = async () => {
  await storageService.duplicateResume(props.resume.id);
  emit("update");
};

const openDeleteDialog = () => {
  deleteDialogOpen.value = true;
  deleteConfirmation.value = "";
};

const closeDeleteDialog = () => {
  deleteDialogOpen.value = false;
  deleteConfirmation.value = "";
};

const confirmDelete = async () => {
  if (deleteConfirmation.value === "delete") {
    await storageService.deleteResume(props.resume.id);
    emit("update");
    closeDeleteDialog();
  }
};
</script>
