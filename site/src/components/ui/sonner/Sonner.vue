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
        error:
          'group-[.toaster]:text-destructive group-[.toaster]:border-destructive dark:group-[.toaster]:text-red-500',
        success:
          'group-[.toaster]:text-green-700 group-[.toaster]:border-green-700 dark:(group-[.toaster]:text-green-500 group-[.toaster]:border-green-600)',
        info: 'group-[.toaster]:text-blue-700 group-[.toaster]:border-blue-700 dark:(group-[.toaster]:text-sky-500 group-[.toaster]:border-sky-600)'
      }
    }"
  />
</template>
