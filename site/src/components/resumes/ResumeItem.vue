<template>
  <div>
    <div w-56 h-80>
      <div
        class="resume-card relative block cursor-pointer mx-auto overflow-hidden rounded-md border border-c duration-150 hover:(-translate-y-3 drop-shadow-xl)"
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
            :content="resume.content"
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
import { setDynamicCss, PAPER, MM_TO_PX } from "~/utils";
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

setDynamicCss(props.resume.styles, props.resume.id);
</script>

<style scoped>
.resume-options {
  @apply hidden;
}

.resume-card:hover .resume-options {
  @apply block;
}
</style>
