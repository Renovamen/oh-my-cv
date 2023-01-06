<template>
  <div
    class="zoom-bar hstack fixed bottom-3 lg:(bottom-auto top-15) ml-3 shadow-c rounded-full overflow-hidden text-white bg-blue-500 lg:opacity-0 hover:opacity-100"
  >
    <button class="zoom-btn" @click="zoomIn">
      <span class="iconify" data-icon="lucide:zoom-in" />
    </button>
    <button class="zoom-btn" @click="zoomOut">
      <span class="iconify" data-icon="lucide:zoom-out" />
    </button>
    <button class="zoom-btn" @click="fitPreviewWidth">
      <span class="iconify" data-icon="fluent:arrow-autofit-width-20-filled" />
    </button>
    <button class="zoom-btn" @click="fitPreviewHeight">
      <span class="iconify" data-icon="fluent:arrow-autofit-height-20-filled" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { updatePreviewScale, fitPreviewWidth, fitPreviewHeight } from "~/utils";

const { ui } = useUIStore();

const zoomIn = () => {
  ui.previewScale *= 1.2;
  updatePreviewScale();
};

const zoomOut = () => {
  ui.previewScale /= 1.2;
  updatePreviewScale();
};
</script>

<style scoped>
.zoom-btn {
  @apply flex-center h-10 w-10 text-lg hover:bg-blue-600;
}
</style>
