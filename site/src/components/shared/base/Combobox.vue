<template>
  <div v-bind="api.rootProps">
    <div
      v-bind="api.controlProps"
      class="hstack h-9 space-x-2 px-2 py-1 rounded border"
      :class="[api.isOpen && 'border-darker-c', !api.isOpen && 'border-c']"
    >
      <input
        v-bind="api.inputProps"
        class="w-full rounded outline-none bg-transparent capitalize"
        @focus="api.open"
      />
      <button v-bind="api.triggerProps">
        <div v-show="api.isOpen">
          <client-only>
            <span class="iconify text-lg" data-icon="ic:sharp-arrow-drop-up" />
          </client-only>
        </div>
        <div v-show="!api.isOpen">
          <client-only>
            <span class="iconify text-lg" data-icon="ic:sharp-arrow-drop-down" />
          </client-only>
        </div>
      </button>
    </div>

    <div v-bind="api.positionerProps">
      <ul
        v-if="options.length > 0"
        v-bind="api.contentProps"
        class="dropdown-container absolute z-20 w-full max-h-60"
      >
        <li
          v-for="item in options"
          :key="item.value"
          v-bind="api.getItemProps({ item })"
          class="dropdown-li"
        >
          {{ item.label }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import * as combobox from "@zag-js/combobox";
import { normalizeProps, useMachine } from "@zag-js/vue";
import type { ComboboxItem } from "~/types";

const props = defineProps<{
  id: string;
  items: Array<ComboboxItem>;
  initial?: string;
}>();

const options = ref(props.items);

const collectionRef = computed(() =>
  combobox.collection({
    items: options.value,
    itemToValue: (item) => item.value,
    itemToString: (item) => item.label
  })
);

watch(
  () => props.initial,
  () => api.value.setValue([props.initial!])
);

const [state, send] = useMachine(
  combobox.machine({
    id: props.id,
    collection: collectionRef.value,
    value: [props.initial || props.items[0].value],
    closeOnSelect: false,
    onOpenChange: ({ open }) => {
      if (!open) return;
      options.value = props.items;
    },
    onInputValueChange: ({ value }) => {
      const filtered = props.items.filter((item) =>
        item.label.toLowerCase().includes(value.toLowerCase())
      );
      options.value = filtered.length > 0 ? filtered : props.items;
    },
    onValueChange: ({ items }: { items: ComboboxItem[] }) => {
      items[0].onSelect();
    }
  }),
  {
    context: computed(() => ({
      collection: collectionRef.value
    }))
  }
);

const api = computed(() => combobox.connect(state.value, send, normalizeProps));
</script>

<style scoped>
[data-part="item"][data-highlighted] {
  @apply bg-dark-c;
}
</style>
