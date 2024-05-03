<template>
  <div class="resumes-page">
    <Header />

    <div class="max-w-306 mx-auto px-5 py-16 text-dark-c">
      <div class="space-y-2 md:(hstack justify-between)">
        <h1 font-bold text-3xl>{{ $t("resumes.my_resumes") }}</h1>
        <FileOptions @update="refresh" />
      </div>

      <div class="flex flex-wrap gap-x-4 gap-y-8 mt-8">
        <NewResume />
        <ResumeItem
          v-for="resume in list"
          :key="resume.id"
          class="resume-item"
          :resume="resume"
          @update="refresh"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ResumeListItem } from "~/types";

const { data: list, refresh } = useLazyAsyncData<ResumeListItem[]>(
  "resume-list",
  getResumeList,
  {
    server: false,
    default: () => []
  }
);
</script>
