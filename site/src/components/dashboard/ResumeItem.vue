<template>
  <div w-56>
    <div h-80>
      <div
        class="resume-card group border"
        :style="{
          width: `${width}px`,
          height: `${height}px`
        }"
      >
        <nuxt-link :to="$nuxt.$localePath(`/editor/${props.resume.id}`)">
          <SharedResumeRender
            :id="resume.id"
            ref="renderEl"
            :markdown="resume.markdown"
            :styles="resume.styles"
            :style="{
              transform: `scale(${1 / PAPER.MM_TO_PX})`
            }"
            class="origin-top-left"
          />
        </nuxt-link>
        <DashboardResumeOptions
          class="group-hover:block hidden"
          :resume="resume"
          @update="emit('update')"
        />
      </div>
    </div>

    <DashboardResumeInfo :resume="resume" />
  </div>
</template>

<script lang="ts" setup>
import { delay } from "@renovamen/utils";
import type { DbResume } from "~/utils/storage";
import { SharedResumeRender } from "#components";

const props = defineProps<{
  resume: DbResume;
}>();

const emit = defineEmits<{
  (e: "update"): void;
}>();

const { PAPER } = useConstant();

const width = PAPER.SIZES[props.resume.styles.paper].w;
const height = PAPER.SIZES[props.resume.styles.paper].h;

const renderEl = ref<InstanceType<typeof SharedResumeRender>>();

const updateResumeItem = async () => {
  // set styles that are defined via CSS editor
  dynamicCssService.injectCssEditor(props.resume.css, props.resume.id);
  // load Google fonts
  await googleFontsService.resolve(props.resume.styles.fontEN);
  await googleFontsService.resolve(props.resume.styles.fontCJK);
  // set styles that are defined via toolbar
  dynamicCssService.injectToolbar(props.resume.styles, props.resume.id);
  // force update resume render
  await delay(100);
  renderEl.value?.render();
};

onMounted(updateResumeItem);
onUpdated(updateResumeItem);
</script>
