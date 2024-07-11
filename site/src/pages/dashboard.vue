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

          <template v-if="status === 'success'">
            <DashboardResumeItem
              v-for="resume in resumes"
              :key="resume.id"
              :resume="resume"
              @update="refresh"
            />
          </template>
          <template v-else>
            <div v-for="i in 4" :key="i" class="w-56 h-80">
              <UiSkeleton class="w-[210px] h-[299px] bg-secondary mx-auto" />
            </div>
          </template>
        </div>
      </UiScrollArea>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { DbResume } from "~/utils/storage";

const {
  data: resumes,
  refresh,
  status
} = useAsyncData<DbResume[]>("resume-list", () => storageService.getResumes(), {
  server: false,
  immediate: false,
  default: () => []
});

onMounted(refresh);
</script>
