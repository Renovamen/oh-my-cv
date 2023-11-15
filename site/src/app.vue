<template>
  <div class="font-ui">
    <VitePwaManifest />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n();
const colorMode = useColorMode();
const preferredDark = usePreferredDark();

const title = computed(() => t("head.title"));
const keywords = computed(() => t("head.keywords"));
const desc = computed(() => t("head.desc"));

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
      content: () => (colorMode?.preference === "dark" ? "#475569" : "#f3f4f6")
    }
  ],
  link: [
    {
      rel: "icon",
      type: "image/svg+xml",
      href: () => (preferredDark.value ? "/favicon-dark.svg" : "/favicon.svg")
    }
  ],
  script: [
    {
      src: "https://code.iconify.design/2/2.2.1/iconify.min.js",
      type: "module",
      tagPosition: "bodyClose"
    }
  ]
});

// Handle languages
watchLocale();
</script>
