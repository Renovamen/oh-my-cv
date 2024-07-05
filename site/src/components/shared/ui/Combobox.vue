<template>
  <div v-bind="api.getRootProps()" relative>
    <div
      v-bind="api.getControlProps()"
      class="group hstack h-9 gap-x-2 px-2 py-1 rounded-md border-1.5 data-[focus]:border-primary"
    >
      <input
        v-bind="api.getInputProps()"
        class="w-full outline-none bg-transparent capitalize"
      />
      <button v-bind="api.getTriggerProps()" size-5 flex-center>
        <span
          class="text-lg i-ic:sharp-arrow-drop-down group-data-[focus]:i-ic:sharp-arrow-drop-up"
        />
      </button>
    </div>

    <div v-bind="api.getPositionerProps()">
      <ul
        v-if="options.length > 0"
        v-bind="api.getContentProps()"
        class="z-20 max-h-60 -mt-1 p-1 bg-background border rounded-md shadow-c overflow-y-scroll"
      >
        <li
          v-for="item in options"
          :key="item.value"
          v-bind="api.getItemProps({ item })"
          class="px-2 py-1.5 rounded-sm truncate cursor-pointer data-[highlighted]:(bg-accent text-accent-foreground) data-[state=checked]:(bg-accent text-accent-foreground)"
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

export interface ComboboxItem {
  label: string;
  value: string;
  onSelect: () => void;
}

const props = defineProps<{
  id: string;
  items: Array<ComboboxItem>;
  defaultValue: string;
}>();

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
    value: [props.defaultValue],
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
      const item = props.items.find((i) => i.value === value[0]);
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
</script>
