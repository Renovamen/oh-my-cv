<template>
  <ul text="xs pc:sm" bg-c border border-c rounded shadow-c overflow-hidden>
    <li
      v-for="(item, i) in items"
      :key="`locale-${i}-${item}`"
      class="dropdown-li justify-between"
      :class="[item.border && 'border-b border-c']"
      @click="
        () => {
          item.function
            ? item.function({ text: item.text, i: i })
            : item.link
            ? toLink(item.link)
            : null;
          $emit('select', item.text);
        }
      "
    >
      <div class="space-x-1.5 hstack">
        <span
          v-if="item.icon"
          class="iconify text-base"
          :data-icon="item.icon"
        />
        <span>{{ item.text }}</span>
      </div>
      <span v-if="item.note" text="lighter-c xs" class="hidden pc:block">
        {{ item.note }}
      </span>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { isExternal } from "@renovamen/utils";
import type { DropdownItem } from "./types";

defineProps<{
  items: Array<DropdownItem>;
}>();

defineEmits(["select"]);

const router = useRouter();

const toLink = (path: string) =>
  isExternal(path) ? window.open(path) : router.push(path);
</script>
