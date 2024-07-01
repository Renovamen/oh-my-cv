<template>
  <div id="dashboard-page">
    <SharedHeader />

    <div class="workspace max-w-310 mx-auto" flex="~ col" p="x-4 y-8">
      <div class="px-2 space-y-2" md="hstack justify-between">
        <h1 font-bold text-3xl>{{ $t("dashboard.my_resumes") }}</h1>
        <DashboardFile @update="refresh" />
      </div>

      <UiScrollArea class="flex-1 mt-4 px-2">
        <div class="gap-x-4 gap-y-8 pt-4" flex="~ wrap">
          <DashboardNewResume />
          <DashboardResumeItem
            v-for="resume in list"
            :key="resume.id"
            :resume="resume"
            @update="refresh"
          />
        </div>
      </UiScrollArea>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { DbResume } from "~/utils/storage";

const { data: list, refresh } = useLazyAsyncData<DbResume[]>(
  "resume-list",
  () => storageService.getResumes(),
  {
    server: false,
    default: () => []
  }
);
</script>
