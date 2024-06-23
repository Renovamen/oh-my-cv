<template>
  <div class="w-56 h-80">
    <button
      class="resume-card group w-[210px] h-[299px] flex-center bg-secondary hover:bg-background"
      :aria-label="$t('dashboard.new')"
      @click="newAndSwitch"
    >
      <span i-ic:round-plus text="5xl muted-foreground group-hover:primary" />
    </button>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter();
const localePath = useLocalePath();

const newAndSwitch = async () => {
  const id = await newResume();
  router.push(localePath(`/editor/${id}`));
};
</script>
