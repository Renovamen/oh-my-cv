<template>
  <div>
    <div w-56 h-80>
      <div
        class="resume-card border border-c"
        :style="{
          width: `${width}px`,
          height: `${height}px`
        }"
      >
        <router-link
          :to="{
            path: switchPath('edit', locale),
            query: { id: props.resume.id }
          }"
        >
          <ResumeRender
            :id="resume.id"
            ref="render"
            :markdown="resume.markdown"
            :styles="resume.styles"
            :style="{
              transform: `scale(${1 / MM_TO_PX})`
            }"
            class="origin-top-left"
          />
        </router-link>
        <ResumeOptions :resume="resume" @update="emit('update')" />
      </div>
    </div>

    <ResumeInfo :resume="resume" @update="emit('update')" />
  </div>
</template>

<script lang="ts" setup>
import { setDynamicCss, setBackboneCss, resolveGoogleFont } from "~/utils";
import { PAPER, MM_TO_PX } from "~/utils/constants";
import type { ResumeListItem } from "~/types";

const props = defineProps<{
  resume: ResumeListItem;
}>();

const emit = defineEmits<{
  (e: "update"): void;
}>();

const { locale } = useI18n();

const width = PAPER[props.resume.styles.paper].w;
const height = PAPER[props.resume.styles.paper].h;

const render = ref();

const updateResumeItem = async () => {
  // set resume backbone styles
  setBackboneCss(props.resume.css, props.resume.id);
  // load Google fonts
  await resolveGoogleFont(props.resume.styles.fontEN);
  await resolveGoogleFont(props.resume.styles.fontCJK);
  // set resume dynamic styles
  setDynamicCss(props.resume.styles, props.resume.id);
  // force update SmartPage
  render.value.forceUpdate();
};

onMounted(updateResumeItem);
onUpdated(updateResumeItem);
</script>

<style scoped>
.resume-options {
  @apply hidden;
}

.resume-card:hover .resume-options {
  @apply block;
}
</style>
