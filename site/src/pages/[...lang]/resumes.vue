<template>
  <div class="resumes-page">
    <Header />

    <div class="max-w-306 mx-auto px-5 py-16 text-dark-c">
      <div class="space-y-2 md:(hstack justify-between)">
        <h1 font-bold text-3xl>{{ $t("resumes.my_resumes") }}</h1>
        <FileOptions @update="loadResumes" />
      </div>

      <div class="flex flex-wrap gap-x-4 gap-y-8 mt-8">
        <NewResume />
        <ResumeItem
          v-for="resume in list"
          :key="resume.id"
          class="resume-item"
          :resume="resume"
          @update="loadResumes"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ResumeListItem } from "~/types";

// Load resumes from storage
const list = ref<ResumeListItem[]>();

const loadResumes = async () => {
  list.value = await getResumeList();
};

onMounted(loadResumes);
</script>
