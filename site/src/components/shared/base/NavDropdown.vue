<template>
  <div>
    <button v-bind="api.triggerProps" class="hstack cursor-pointer space-x-1">
      <span v-if="icon" :class="icon" md:text-lg />
      <span class="truncate max-w-xs hide-on-mobile">
        {{ label }}
      </span>
    </button>

    <div v-bind="api.positionerProps">
      <ul v-bind="api.contentProps" class="dropdown-container z-40 text-xs md:text-sm">
        <li
          v-for="(item, i) in items"
          :key="`${i}-${item.label}`"
          class="dropdown-li text-c"
        >
          <nuxt-link :to="item.link" space-x-1.5 hstack>
            <span v-if="item.icon" :class="item.icon" text-base />
            <span>{{ item.label }}</span>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import * as menu from "@zag-js/menu";
import { normalizeProps, useMachine } from "@zag-js/vue";
import type { DropdownItem } from "~/types";

const props = defineProps<{
  id: string;
  label: string;
  items: DropdownItem[];
  icon?: string;
}>();

const [menuState, menuSend] = useMachine(
  menu.machine({ id: props.id, "aria-label": props.id })
);

const api = computed(() => menu.connect(menuState.value, menuSend, normalizeProps));
</script>
