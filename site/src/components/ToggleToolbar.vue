<template>
  <div class="nav-item" @click="ui.openToolbar = !ui.openToolbar">
    <div>
      <div v-show="ui.openToolbar" flex-center>
        <span
          class="iconify pc:text-lg"
          data-icon="tabler:layout-sidebar-right-collapse"
        />
      </div>
      <div v-show="!ui.openToolbar" flex-center>
        <span
          class="iconify pc:text-lg"
          data-icon="tabler:layout-sidebar-right-expand"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { ui } = useUIStore();
</script>
