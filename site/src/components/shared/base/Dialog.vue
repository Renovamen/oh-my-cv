<template>
  <div v-bind="api.triggerProps">
    <slot name="button">Open dialog</slot>
  </div>

  <Teleport to="body">
    <div v-if="api.isOpen">
      <div v-bind="api.backdropProps" />
      <div v-bind="api.positionerProps">
        <div
          v-bind="api.contentProps"
          class="font-ui z-30 fixed m-auto left-0 right-0 top-0 bottom-0 bg-c flex flex-col overflow-hidden text-c shadow-c"
          :class="boxClass"
          border="1 gray-400 dark:gray-500 rounded-md"
        >
          <div hstack justify-between pl-4 pr-3 pt-2.5 pb-1>
            <div hstack text-sm>
              <span :class="icon" />
              <span mx-2 text-light-c>/</span>
              <span v-bind="api.titleProps">{{ title }}</span>
            </div>

            <button
              class="circle p-1 duration-100 hover:(bg-dark-c rotate-90)"
              v-bind="api.closeTriggerProps"
            >
              <span i-ic:baseline-close />
            </button>
          </div>

          <slot name="content" />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import * as dialog from "@zag-js/dialog";
import { normalizeProps, useMachine } from "@zag-js/vue";

const props = defineProps<{
  id: string;
  title: string;
  icon: string;
  boxClass?: string;
}>();

const [state, send] = useMachine(dialog.machine({ id: props.id }));
const api = computed(() => dialog.connect(state.value, send, normalizeProps));
</script>
