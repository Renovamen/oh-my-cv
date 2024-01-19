<template>
  <div
    v-for="(toasts, placement, index) in $toast.toastsByPlacement"
    class="toast-container"
  >
    <div :key="placement" v-bind="$toast.getGroupProps({ placement })">
      <Toast v-for="toast in toasts" :key="toast.id" :actor="toast" />
    </div>
  </div>
</template>

<script setup lang="ts">
const { $toast } = useNuxtApp();
</script>
