<template>
  <div
    v-if="activeHorizontalGuide !== null"
    class="resume-photo-guide"
    :style="horizontalGuideStyle"
  />
  <div
    class="resume-photo"
    :class="{ 'resume-photo-interactive': interactive }"
    :style="photoStyle"
    :role="interactive ? 'button' : undefined"
    :tabindex="interactive ? 0 : undefined"
    :aria-label="interactive ? $t('toolbar.photo.move') : undefined"
    @pointerdown="startDragging"
    @keydown="moveWithKeyboard"
  >
    <img :src="photo.src" alt="" draggable="false" />
  </div>
</template>

<script lang="ts" setup>
import type { ValidPaperSize } from "~/composables/constant";
import type { ResumePhoto } from "~/types/resume";

const props = withDefaults(
  defineProps<{
    photo: ResumePhoto;
    paper: ValidPaperSize;
    interactive?: boolean;
  }>(),
  {
    interactive: false
  }
);

const emit = defineEmits<{
  (event: "update:photo", photo: ResumePhoto): void;
}>();

const { PAPER } = useConstant();
const activeHorizontalGuide = ref<number | null>(null);
const SNAP_THRESHOLD_PX = 4;
const round = (value: number) => Math.round(value * 10) / 10;
const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const photoStyle = computed(() => ({
  left: `${props.photo.xMm}mm`,
  top: `${props.photo.yMm}mm`,
  width: `${props.photo.widthMm}mm`,
  height: `${props.photo.heightMm}mm`
}));

const horizontalGuideStyle = computed(() => ({
  top: `${activeHorizontalGuide.value ?? 0}mm`,
  width: `${PAPER.SIZES[props.paper].w}mm`
}));

const updatePosition = (xMm: number, yMm: number) => {
  const paper = PAPER.SIZES[props.paper];

  emit("update:photo", {
    ...props.photo,
    xMm: round(clamp(xMm, 0, paper.w - props.photo.widthMm)),
    yMm: round(clamp(yMm, 0, paper.h - props.photo.heightMm))
  });
};

let stopDragging: (() => void) | undefined;

const startDragging = (event: PointerEvent) => {
  if (!props.interactive || event.button !== 0) return;

  event.preventDefault();

  const element = event.currentTarget as HTMLElement;
  const page = element
    .closest(".resume-render")
    ?.querySelector<HTMLElement>('[data-scope="vue-smart-pages"][data-part="page"]');

  if (!page) return;

  const startX = event.clientX;
  const startY = event.clientY;
  const initialX = props.photo.xMm;
  const initialY = props.photo.yMm;
  const mmPerPixel = PAPER.SIZES[props.paper].w / page.getBoundingClientRect().width;
  const snapThresholdMm = SNAP_THRESHOLD_PX * mmPerPixel;
  const pageRect = page.getBoundingClientRect();
  const horizontalGuides = Array.from(page.querySelectorAll<HTMLElement>("h2, hr"))
    .filter((guide) => {
      const style = getComputedStyle(guide);
      return (
        guide.tagName === "HR" ||
        (style.borderBottomStyle !== "none" && parseFloat(style.borderBottomWidth) > 0)
      );
    })
    .map((guide) => {
      const rect = guide.getBoundingClientRect();
      const style = getComputedStyle(guide);
      const borderWidth =
        guide.tagName === "HR" ? 0 : parseFloat(style.borderBottomWidth);

      return (rect.bottom - borderWidth - pageRect.top) * mmPerPixel;
    });

  const move = (moveEvent: PointerEvent) => {
    const xMm = initialX + (moveEvent.clientX - startX) * mmPerPixel;
    let yMm = initialY + (moveEvent.clientY - startY) * mmPerPixel;
    const photoBottomMm = yMm + props.photo.heightMm;
    const closestGuide = horizontalGuides.reduce<number | null>((closest, guide) => {
      if (Math.abs(guide - photoBottomMm) > snapThresholdMm) return closest;
      if (closest === null) return guide;

      return Math.abs(guide - photoBottomMm) < Math.abs(closest - photoBottomMm)
        ? guide
        : closest;
    }, null);

    if (closestGuide !== null) yMm = closestGuide - props.photo.heightMm;
    activeHorizontalGuide.value = closestGuide;

    updatePosition(xMm, yMm);
  };
  const stop = () => {
    window.removeEventListener("pointermove", move);
    window.removeEventListener("pointerup", stop);
    window.removeEventListener("pointercancel", stop);
    activeHorizontalGuide.value = null;
    stopDragging = undefined;
  };

  stopDragging?.();
  stopDragging = stop;
  window.addEventListener("pointermove", move);
  window.addEventListener("pointerup", stop);
  window.addEventListener("pointercancel", stop);
};

const moveWithKeyboard = (event: KeyboardEvent) => {
  if (
    !props.interactive ||
    !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)
  )
    return;

  event.preventDefault();
  const distance = event.shiftKey ? 5 : 1;
  const horizontal =
    event.key === "ArrowLeft" ? -distance : event.key === "ArrowRight" ? distance : 0;
  const vertical =
    event.key === "ArrowUp" ? -distance : event.key === "ArrowDown" ? distance : 0;

  updatePosition(props.photo.xMm + horizontal, props.photo.yMm + vertical);
};

onBeforeUnmount(() => stopDragging?.());
</script>

<style scoped>
.resume-photo {
  position: absolute;
  z-index: 2;
  box-sizing: border-box;
}

.resume-photo img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}

.resume-photo-interactive {
  cursor: move;
  touch-action: none;
}

.resume-photo-interactive:focus-visible {
  outline: 1px dashed hsl(var(--muted-foreground));
  outline-offset: 2px;
}

.resume-photo-guide {
  position: absolute;
  left: 0;
  z-index: 3;
  height: 1px;
  pointer-events: none;
  background: #0ea5e9;
}

@media print {
  .resume-photo,
  .resume-photo-guide {
    outline: none;
  }

  .resume-photo-guide {
    display: none;
  }
}
</style>
