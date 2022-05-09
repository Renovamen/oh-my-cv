<template>
  <ul>
    <li
      v-for="(item, i) in items"
      :key="`locale-${i}-${item}`"
      class="menu-li"
      :class="[i === 0 && 'rounded-t', i === items.length - 1 && 'rounded-b']"
      @click="
        item.function
          ? item.function({ text: item.text, i: i })
          : toLink(item.link)
      "
    >
      <span
        v-if="item.icon"
        class="iconify"
        text="sm pc:base"
        :data-icon="item.icon"
      />
      <span>{{ item.text }}</span>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { isExternal } from "~/utils";

defineProps({
  items: {
    type: Object,
    required: true
  }
});

const router = useRouter();

const toLink = (path: string) =>
  isExternal(path) ? window.open(path) : router.push(path);
</script>
