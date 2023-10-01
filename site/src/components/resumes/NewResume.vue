<template>
  <div w-56 h-80>
    <button
      class="resume-card w-[210px] h-[299px] flex-center bg-darker-c hover:bg-c"
      :aria-label="$t('resumes.new')"
      @click="newAndSwitch"
    >
      <client-only>
        <span class="iconify w-12 h-12 text-light-c" data-icon="ic:round-plus" />
      </client-only>
    </button>
  </div>
</template>

<script lang="ts" setup>
const { locale } = useI18n();
const router = useRouter();

const newAndSwitch = async () => {
  const id = await newResume();
  router.push(switchPath(`edit/${id}`, locale.value));
};
</script>

<style scoped>
.resume-card:hover .iconify {
  @apply text-brand;
}
</style>
