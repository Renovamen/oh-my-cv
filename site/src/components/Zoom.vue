<template>
  <div ref="container" class="zoom-container h-full p-1">
    <div
      ref="zoom"
      class="zoom-area w-fit origin-top-left"
      :style="{
        transform: `scale(${scale})`,
        marginLeft: `${left}px`,
        marginRight: `${right}px`
      }"
    >
      <slot />
    </div>

    <div
      class="zoom-bar hstack fixed bottom-3 lg:(bottom-auto top-15) ml-3 shadow-c rounded-full overflow-hidden text-white bg-blue-500 lg:opacity-0 hover:opacity-100"
    >
      <button @click="scale *= 1.1">
        <span class="iconify" data-icon="lucide:zoom-in" />
      </button>
      <button @click="scale /= 1.1">
        <span class="iconify" data-icon="lucide:zoom-out" />
      </button>
      <button @click="fitWidth">
        <span
          class="iconify"
          data-icon="fluent:arrow-autofit-width-20-filled"
        />
      </button>
      <button @click="fitHeight">
        <span
          class="iconify"
          data-icon="fluent:arrow-autofit-height-20-filled"
        />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getPaperPx } from "~/utils/constants";

const container = ref<HTMLElement>();
const zoom = ref<HTMLElement>();

const sizeC = useElementSize(container);
const sizeZ = useElementSize(zoom);

const scale = ref(1);
const left = computed(() =>
  Math.max(0, (sizeC.width.value - scale.value * sizeZ.width.value) / 2)
);
const right = computed(() =>
  Math.min(0, (scale.value - 1) * sizeZ.width.value)
);

const { styles } = useStyleStore();

const fitWidth = () => {
  scale.value = sizeC.width.value / sizeZ.width.value;
};

const fitHeight = () => {
  scale.value = sizeC.height.value / getPaperPx(styles.paper, "h");
};

setTimeout(fitWidth, 300);
</script>

<style scoped>
.zoom-bar button {
  @apply flex-center h-10 w-10 text-lg hover:bg-blue-600;
}
</style>
