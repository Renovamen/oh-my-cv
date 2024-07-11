<template>
  <div
    class="pane-container overflow-scroll hide-scrollbar bg-secondary"
    border="4 secondary"
  >
    <VueZoom ref="zoom" :scale="scale">
      <SharedResumeRender
        id="preview"
        :markdown="data.markdown"
        :css="data.css"
        :styles="styles"
      />
    </VueZoom>

    <div
      id="zoom-bar"
      class="hstack fixed bottom-4 ml-2 shadow-c rounded-full overflow-hidden text-primary-foreground bg-blue-500"
      lg="bottom-auto top-15 opacity-0 hover:opacity-100 focus-within:opacity-100"
    >
      <button @click="scale *= 1.1" aria-label="Zoom in">
        <span i-lucide:zoom-in />
      </button>
      <button @click="scale /= 1.1" aria-label="Zoom out">
        <span i-lucide:zoom-out />
      </button>
      <button @click="fitWidth" aria-label="Fit width">
        <span i-fluent:arrow-autofit-width-20-filled />
      </button>
      <button @click="fitHeight" aria-label="Fit height">
        <span i-fluent:arrow-autofit-height-20-filled />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import VueZoom from "@ohmycv/vue-zoom";

const scale = ref(1);
const zoom = ref<InstanceType<typeof VueZoom>>();

const { width, height } = useElementSize(zoom);
const { styles } = useStyleStore();
const { data } = useDataStore();
const { PAPER } = useConstant();

const fitWidth = () => {
  scale.value = width.value / PAPER.sizeToPx(styles.paper, "w");
};

const fitHeight = () => {
  scale.value = height.value / PAPER.sizeToPx(styles.paper, "h");
};

watch(width, fitWidth);
</script>

<style scoped>
#zoom-bar button {
  @apply flex-center size-10 text-lg hover:bg-blue-600 focus-visible:bg-blue-600;
}
</style>
