<template>
  <EditorToolbarBox :text="$t('toolbar.photo.title')" icon="i-lucide:image">
    <div v-bind="api.getRootProps()">
      <div
        v-bind="api.getDropzoneProps()"
        class="h-24 flex-center cursor-pointer border border-dashed rounded-md hover:bg-accent"
      >
        <input v-bind="api.getHiddenInputProps()" />
        <img
          v-if="data.photo"
          :src="data.photo.src"
          :alt="$t('toolbar.photo.preview_alt')"
          class="size-full object-contain p-2"
        />
        <div v-else class="flex-center flex-col gap-1 text-muted-foreground">
          <span class="i-lucide:image-plus size-5" />
          <span>{{ $t("toolbar.photo.upload") }}</span>
        </div>
      </div>
    </div>

    <p v-if="error" class="mt-2 text-xs text-destructive">{{ error }}</p>

    <template v-if="data.photo">
      <div class="mt-4 mb-1 hstack justify-between text-muted-foreground">
        <span>{{ $t("toolbar.photo.width") }}</span>
        <span>{{ Math.round(data.photo.widthMm) }} mm</span>
      </div>
      <SharedUiSlider
        unit="mm"
        :model-value="[Math.round(data.photo.widthMm)]"
        :min="20"
        :max="50"
        :step="1"
        @update:model-value="resizePhoto"
      />

      <div class="mt-4 grid grid-cols-2 gap-2">
        <UiButton variant="outline" size="sm" class="gap-1" @click="resetPosition">
          <span class="i-lucide:rotate-ccw size-4" />
          {{ $t("toolbar.photo.reset") }}
        </UiButton>
        <UiButton variant="destructive" size="sm" class="gap-1" @click="removePhoto">
          <span class="i-lucide:trash-2 size-4" />
          {{ $t("toolbar.photo.remove") }}
        </UiButton>
      </div>
    </template>
  </EditorToolbarBox>
</template>

<script lang="ts" setup>
import * as fileUpload from "@zag-js/file-upload";
import { normalizeProps, useMachine } from "@zag-js/vue";
import { prepareResumePhoto } from "~/utils/image";

const DEFAULT_WIDTH_MM = 32;
const DEFAULT_HEIGHT_MM = 42;
const MAX_FILE_SIZE = 8 * 1024 * 1024;

const { data, setData } = useDataStore();
const { styles } = useStyleStore();
const { PAPER } = useConstant();
const { t } = useI18n();
const error = ref("");

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);
const round = (value: number) => Math.round(value * 10) / 10;

const defaultPosition = (widthMm: number, heightMm: number) => {
  const paper = PAPER.SIZES[styles.paper];
  const marginMm = styles.marginH / PAPER.MM_TO_PX;

  return {
    xMm: round(clamp(paper.w - marginMm - widthMm, 0, paper.w - widthMm)),
    yMm: round(clamp(styles.marginV / PAPER.MM_TO_PX, 0, paper.h - heightMm))
  };
};

const [state, send] = useMachine(
  fileUpload.machine({
    id: "resume-photo-upload",
    accept: ["image/jpeg", "image/png", "image/webp"],
    maxFiles: 1,
    maxFileSize: MAX_FILE_SIZE,
    onFileAccept: async ({ files }) => {
      error.value = "";

      try {
        const processed = await prepareResumePhoto(files[0]);
        const current = data.photo;
        const widthMm = current?.widthMm ?? DEFAULT_WIDTH_MM;
        const heightMm = clamp(widthMm / processed.aspectRatio, 20, DEFAULT_HEIGHT_MM);
        const position = current ?? defaultPosition(widthMm, heightMm);
        const paper = PAPER.SIZES[styles.paper];

        setData("photo", {
          src: processed.src,
          xMm: round(clamp(position.xMm, 0, paper.w - widthMm)),
          yMm: round(clamp(position.yMm, 0, paper.h - heightMm)),
          widthMm,
          heightMm: round(heightMm)
        });
      } catch {
        error.value = t("toolbar.photo.invalid");
      }
    },
    onFileReject: () => {
      error.value = t("toolbar.photo.invalid");
    }
  })
);
const api = computed(() => fileUpload.connect(state.value, send, normalizeProps));

const resizePhoto = (value: number[] | undefined) => {
  if (!data.photo || !value?.length) return;

  const widthMm = value[0];
  const scale = widthMm / data.photo.widthMm;
  const heightMm = data.photo.heightMm * scale;
  const paper = PAPER.SIZES[styles.paper];

  setData("photo", {
    ...data.photo,
    widthMm,
    heightMm: round(heightMm),
    xMm: round(clamp(data.photo.xMm, 0, paper.w - widthMm)),
    yMm: round(clamp(data.photo.yMm, 0, paper.h - heightMm))
  });
};

const resetPosition = () => {
  if (!data.photo) return;
  setData("photo", {
    ...data.photo,
    ...defaultPosition(data.photo.widthMm, data.photo.heightMm)
  });
};

const removePhoto = () => {
  setData("photo", null);
  api.value.clearFiles();
  error.value = "";
};
</script>
