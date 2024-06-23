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
            ref="render"
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

    <DashboardResumeInfo :resume="resume" @update="emit('update')" />
  </div>
</template>

<script lang="ts" setup>
import type { DbResume } from "~/utils/storage";

const props = defineProps<{
  resume: DbResume;
}>();

const emit = defineEmits<{
  (e: "update"): void;
}>();

const { PAPER } = useConstant();

const width = PAPER.SIZES[props.resume.styles.paper].w;
const height = PAPER.SIZES[props.resume.styles.paper].h;

const render = ref();

const updateResumeItem = async () => {
  // set resume backbone styles
  setBackboneCss(props.resume.css, props.resume.id);
  // load Google fonts
  await googleFontsService.resolve(props.resume.styles.fontEN);
  await googleFontsService.resolve(props.resume.styles.fontCJK);
  // set resume dynamic styles
  setDynamicCss(props.resume.styles, props.resume.id);
  // force update SmartPage
  render.value.forceUpdate();
};

onMounted(updateResumeItem);
onUpdated(updateResumeItem);
</script>
