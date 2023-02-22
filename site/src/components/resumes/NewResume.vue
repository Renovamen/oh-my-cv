<template>
  <div w-56 h-80>
    <button
      class="resume-card w-[210px] h-[299px] flex-center bg-darker-c hover:bg-c"
      :aria-label="t('resumes.new')"
      @click="newAndSwitch"
    >
      <span class="iconify w-12 h-12 text-light-c" data-icon="ic:round-plus" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { newResume } from "~/utils";

const { t, locale } = useI18n();
const router = useRouter();

const newAndSwitch = async () => {
  const id = await newResume();
  router.push({ path: switchPath("edit", locale.value), query: { id: id } });
};
</script>

<style scoped>
.resume-card:hover .iconify {
  @apply text-brand;
}
</style>
