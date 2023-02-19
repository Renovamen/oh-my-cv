<template>
  <OnClickOutside
    relative
    @click="isFocus = true"
    @trigger="
      () => {
        isFocus = false;
        editTimes = 0;
        searchTerm = lastSearchTerm;
      }
    "
  >
    <div
      class="hstack h-9 space-x-2 px-2 py-1 rounded border"
      :class="[isFocus && 'border-darker-c', !isFocus && 'border-c']"
    >
      <input
        v-model="searchTerm"
        class="w-full rounded outline-none bg-transparent capitalize"
        @input="editTimes++"
      />
      <div text-light-c>
        <div v-show="isFocus">
          <span class="iconify text-lg" data-icon="ic:sharp-arrow-drop-up" />
        </div>
        <div v-show="!isFocus">
          <span class="iconify text-lg" data-icon="ic:sharp-arrow-drop-down" />
        </div>
      </div>
    </div>
    <Dropdown
      v-show="isFocus && filteredItems.length > 0"
      class="absolute z-20 w-full max-h-60"
      :items="filteredItems"
      @select="handleSelect"
    />
  </OnClickOutside>
</template>

<script lang="ts" setup>
import { OnClickOutside } from "@vueuse/components";
import type { DropdownItem } from "~/types";

const props = defineProps<{
  items: Array<DropdownItem>;
  default?: string;
}>();

const emit = defineEmits(["select"]);

const isFocus = ref(false);
const editTimes = ref(0);

const searchTerm = ref("");
const lastSearchTerm = ref("");

const resetSearchTerm = () => {
  searchTerm.value = props.default || props.items[0].text;
  lastSearchTerm.value = searchTerm.value;
};

resetSearchTerm();

watch(() => props.default, resetSearchTerm);

const handleSelect = (text: string) => {
  searchTerm.value = text;
  lastSearchTerm.value = text;
  emit("select", text);
};

const filteredItems = computed(() =>
  editTimes.value > 0
    ? props.items.filter((item) =>
        item.text
          .toLocaleLowerCase()
          .includes(searchTerm.value.toLocaleLowerCase())
      )
    : props.items
);
</script>
