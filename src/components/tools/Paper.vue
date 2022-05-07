<template>
  <BaseButton :text="pickedPaper">
    <template #icon>
      <span
        class="iconify"
        text="sm pc:base"
        data-icon="majesticons:paper-fold-line"
      />
    </template>

    <template #dropdown>
      <ul w="17 pc:18.5">
        <li
          v-for="(paper, i) in paperList"
          :key="`paper-${i}-${paper}`"
          class="menu-li"
          :class="[
            i === 0 && 'rounded-t',
            i === paperList.length - 1 && 'rounded-b'
          ]"
          @click="pickPaper(paper)"
        >
          {{ paper }}
        </li>
      </ul>
    </template>
  </BaseButton>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { setStoreState } from "~/store";
import { onStylesUpdate, PAPER } from "~/utils";
import BaseButton from "./BaseButton.vue";

const store = useStore();
const pickedPaper = ref<string>(store.state.styles.paper);

const paperList = Object.keys(PAPER);

const pickPaper = (paper: string) => {
  pickedPaper.value = paper;

  setStoreState("styles", "paper", pickedPaper.value);
  onStylesUpdate(store.state.styles);
};
</script>
