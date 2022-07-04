<template>
  <div class="nav-item" @click="ui.openToolbar = !ui.openToolbar">
    <div>
      <div v-show="ui.openToolbar" flex-center>
        <span
          class="iconify pc:text-lg"
          data-icon="tabler:layout-sidebar-right-expand"
        />
      </div>
      <div v-show="!ui.openToolbar" flex-center>
        <span
          class="iconify pc:text-lg"
          data-icon="tabler:layout-sidebar-right-collapse"
        />
      </div>
    </div>
    <span text="sm pc:base">{{ t('tool.nav') }}</span>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const { ui } = useUIStore();
</script>
