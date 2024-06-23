<template>
  <EditableRoot
    v-slot="{ isEditing }"
    :default-value="defaultValue"
    submit-mode="enter"
    @submit="(text) => emit('submit', text)"
    auto-resize
  >
    <EditableArea class="w-full">
      <EditablePreview />
      <EditableInput />
    </EditableArea>

    <div v-if="isEditing" class="flex gap-1 mt-1">
      <UiButton
        :as="EditableSubmitTrigger"
        size="xs"
        class="flex-1 rounded hover:ring-none"
      >
        <span i-material-symbols-check-rounded size-4 />
      </UiButton>

      <UiButton
        :as="EditableCancelTrigger"
        variant="secondary"
        size="xs"
        class="flex-1 rounded"
      >
        <span i-material-symbols-close-rounded size-4 />
      </UiButton>
    </div>
  </EditableRoot>
</template>

<script lang="ts" setup>
import { EditableSubmitTrigger, EditableCancelTrigger } from "#components";

defineProps<{
  defaultValue?: string;
}>();

const emit = defineEmits<{
  (e: "submit", payload?: string): void;
}>();
</script>
