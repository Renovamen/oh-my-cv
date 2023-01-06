<template>
  <button cursor-pointer @click="ui.openToolbar = !ui.openToolbar">
    <div>
      <div v-show="ui.openToolbar" flex-center>
        <span
          class="iconify md:text-lg"
          data-icon="tabler:layout-sidebar-right-collapse"
        />
      </div>
      <div v-show="!ui.openToolbar" flex-center>
        <span
          class="iconify md:text-lg"
          data-icon="tabler:layout-sidebar-right-expand"
        />
      </div>
    </div>
  </button>
</template>

<script lang="ts" setup>
const { ui } = useUIStore();
</script>
