<template>
  <ul bg="white dark:dark-400" text="xs pc:sm" rounded overflow-hidden>
    <li
      v-for="(item, i) in items"
      :key="`locale-${i}-${item}`"
      class="dropdown-li"
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
      <span v-if="item.icon" class="iconify text-base" :data-icon="item.icon" />
      <span>{{ item.text }}</span>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { isExternal } from "~/utils";
import type { DropdownItem } from "./types";

defineProps<{
  items: Array<DropdownItem>;
}>();

defineEmits(["select"]);

const router = useRouter();

const toLink = (path: string) =>
  isExternal(path) ? window.open(path) : router.push(path);
</script>
