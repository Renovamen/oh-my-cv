<template>
  <div class="pane-container">
    <Zoom ref="zoom" :scale="scale">
      <ResumeRender
        id="preview"
        :markdown="data.mdContent"
        :css="data.cssContent"
        :styles="styles"
      />
    </Zoom>

    <div
      class="zoom-bar hstack fixed bottom-4 lg:(bottom-auto top-15) ml-2 shadow-c rounded-full overflow-hidden text-white bg-blue-500 lg:opacity-0 hover:opacity-100"
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
import Zoom from "@renovamen/vue-zoom";
import { getPaperPx } from "~/utils";

const scale = ref(1);
const zoom = ref<InstanceType<typeof Zoom>>();

const { width, height } = useElementSize(zoom);
const { styles } = useStyleStore();
const { data } = useDataStore();

const fitWidth = () => {
  scale.value = width.value / getPaperPx(styles.paper, "w");
};

const fitHeight = () => {
  scale.value = height.value / getPaperPx(styles.paper, "h");
};

setTimeout(fitWidth, 0);
</script>

<style scoped>
.zoom-bar button {
  @apply flex-center h-10 w-10 text-lg hover:bg-blue-600;
}
</style>
