<template>
  <div class="font-ui">
    <VitePwaManifest />
    <NuxtPage />
    <UiToaster close-button />
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n();

const colorMode = useColorMode();
const preferredDark = usePreferredDark();

useHead({
  title: t("head.title"),
  meta: [
    { name: "keywords", content: t("head.keywords") },
    { name: "description", content: t("head.desc") },
    { property: "og:title", content: t("head.title") },
    { property: "og:description", content: t("head.desc") },
    { property: "og:locale", content: locale },
    {
      name: "theme-color",
      content: () => (colorMode.value === "dark" ? "#30343A" : "#F3F4F6")
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
</script>
