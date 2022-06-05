<template>
  <RouterView />
</template>

<script setup lang="ts">
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  link: [
    {
      rel: "icon",
      type: "image/svg+xml",
      href: computed(() =>
        preferredDark.value ? "/logo/favicon-dark.svg" : "/logo/favicon.svg"
      )
    },
    {
      rel: "icon",
      type: "image/png",
      href: computed(() =>
        preferredDark.value ? "/logo/favicon-dark.png" : "/logo/favicon.png"
      )
    }
  ]
});
</script>
