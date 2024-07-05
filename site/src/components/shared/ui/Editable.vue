<template>
  <EditableRoot v-slot="{ isEditing }" v-bind="forwarded">
    <EditableArea class="w-full">
      <EditablePreview class="cursor-pointer" />
      <EditableInput />
    </EditableArea>

    <div v-if="isEditing" class="flex gap-1 mt-1">
      <UiButton
        :as="EditableSubmitTrigger"
        size="xs"
        class="flex-1 rounded hover:ring-none"
        aria-label="Submit"
      >
        <span i-material-symbols-check-rounded size-4 />
      </UiButton>

      <UiButton
        :as="EditableCancelTrigger"
        variant="secondary"
        size="xs"
        class="flex-1 rounded"
        aria-label="Cancel"
      >
        <span i-material-symbols-close-rounded size-4 />
      </UiButton>
    </div>
  </EditableRoot>
</template>

<script lang="ts" setup>
import {
  EditableSubmitTrigger,
  EditableCancelTrigger,
  type EditableRootProps,
  type EditableRootEmits,
  useForwardPropsEmits
} from "radix-vue";

const props = defineProps<EditableRootProps>();
const emits = defineEmits<EditableRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>
