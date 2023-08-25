<template>
  <RouterView />
</template>

<script setup lang="ts">
const { t, locale } = useI18n();

const title = computed(() => t("head.title"));
const keywords = computed(() => t("head.keywords"));
const desc = computed(() => t("head.desc"));

// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: title,
  meta: [
    { name: "keywords", content: keywords },
    { name: "description", content: desc },
    { property: "og:title", content: title },
    { property: "og:description", content: desc },
    { property: "og:locale", content: locale },
    {
      name: "theme-color",
      content: computed(() => (isDark.value ? "#475569" : "#f3f4f6"))
    }
  ],
  link: [
    {
      rel: "icon",
      type: "image/svg+xml",
      href: computed(() => (preferredDark.value ? "/favicon-dark.svg" : "/favicon.svg"))
    }
  ]
});
</script>
