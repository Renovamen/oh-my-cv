<script lang="ts" setup>
import { Toaster as Sonner, type ToasterProps } from "vue-sonner";

const props = defineProps<ToasterProps>();
</script>

<template>
  <Sonner
    class="toaster group"
    v-bind="props"
    :toast-options="{
      classes: {
        toast: 'group toast group-[.toaster]:bg-background group-[.toaster]:shadow-lg',
        description: 'group-[.toast]:text-muted-foreground',
        actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
        cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
        closeButton:
          'group-[.toast]:bg-background group-[.toast]:text-muted-foreground group-[.toaster]:border-border hover:(bg-background! text-foreground! border-foreground!)',
        error: 'group-[.toaster]:text-destructive group-[.toaster]:border-destructive',
        success: 'group-[.toaster]:text-success group-[.toaster]:border-success',
        info: 'group-[.toaster]:text-info group-[.toaster]:border-info'
      }
    }"
  />
</template>
