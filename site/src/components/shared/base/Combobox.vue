<template>
  <div v-bind="api.rootProps" relative>
    <div
      v-bind="api.controlProps"
      class="hstack h-9 space-x-2 px-2 py-1 rounded border"
      :class="api.open ? 'border-darker-c' : 'border-c'"
    >
      <input
        v-bind="api.inputProps"
        class="w-full outline-none bg-transparent capitalize"
      />
      <button v-bind="api.triggerProps" size-5 flex-center>
        <span
          :class="api.open ? 'i-ic:sharp-arrow-drop-up' : 'i-ic:sharp-arrow-drop-down'"
          text-lg
        />
      </button>
    </div>

    <div v-bind="api.positionerProps">
      <ul
        v-if="options.length > 0"
        v-bind="api.contentProps"
        class="dropdown-container z-20 max-h-60 -mt-1"
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
  default: string;
}>();

const getItemByValue = (value: string) => props.items.find((i) => i.value === value);

const options = ref(props.items);

const collectionRef = computed(() =>
  combobox.collection({
    items: options.value,
    itemToValue: (item) => item.value,
    itemToString: (item) => item.label
  })
);

const [state, send] = useMachine(
  combobox.machine({
    id: props.id,
    collection: collectionRef.value,
    value: [props.default],
    inputValue: getItemByValue(props.default)?.label || "",
    openOnClick: true,
    closeOnSelect: false,
    onOpenChange: () => {
      options.value = props.items;
    },
    onInputValueChange: ({ inputValue }) => {
      const filtered = props.items.filter((item) =>
        item.label.toLowerCase().includes(inputValue.toLowerCase())
      );
      options.value = filtered.length > 0 ? filtered : props.items;
    },
    onValueChange: ({ value }) => {
      const item = getItemByValue(value[0]);
      item?.onSelect();
    }
  }),
  {
    context: computed(() => ({
      collection: collectionRef.value
    }))
  }
);

const api = computed(() => combobox.connect(state.value, send, normalizeProps));

const setDefaultValue = () => {
  api.value.setValue([props.default]);
  api.value.setInputValue(getItemByValue(props.default)?.label || "");
};

watchOnce(() => props.default, setDefaultValue);

watchOnce(
  () => props.items,
  () => {
    options.value = props.items;
    setDefaultValue();
  }
);
</script>

<style scoped>
[data-part="item"][data-highlighted] {
  @apply bg-dark-c;
}
</style>
