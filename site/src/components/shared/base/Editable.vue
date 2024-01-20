<template>
  <div
    class="border-1.5 rounded"
    :class="api.isEditing ? 'border-dark-c' : 'border-transparent'"
  >
    <div v-bind="api.rootProps">
      <div v-bind="api.areaProps">
        <input
          v-bind="api.inputProps"
          class="w-full text-center outline-none px-1 bg-transparent"
        />
        <div v-bind="api.previewProps" text-center truncate />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import * as editable from "@zag-js/editable";
import { normalizeProps, useMachine } from "@zag-js/vue";

const props = defineProps<{
  id: string;
  default: string;
  onValueCommit: (text: string) => void;
}>();

const [state, send] = useMachine(
  editable.machine({
    id: props.id,
    selectOnFocus: false,
    submitMode: "enter",
    onValueCommit: (details) => {
      console.log("Value submitted", details.value);
      props.onValueCommit(details.value);
    }
  })
);
const api = computed(() => editable.connect(state.value, send, normalizeProps));

onMounted(() => api.value.setValue(props.default));

watch(
  () => props.default,
  () => api.value.setValue(props.default)
);
</script>
