<template>
  <div w-56 h-80>
    <button
      class="resume-card w-[210px] h-[299px] flex-center bg-darker-c hover:bg-c"
      :aria-label="$t('resumes.new')"
      @click="newAndSwitch"
    >
      <span i-ic:round-plus text="5xl light-c" />
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
.resume-card:hover span {
  @apply text-brand;
}
</style>
