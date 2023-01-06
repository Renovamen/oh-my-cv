<template>
  <RouterView />
</template>

<script setup lang="ts">
const { t, locale } = useI18n();

const desc = computed(() => t("desc"));

// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  meta: [
    { name: "description", content: desc },
    { property: "og:description", content: desc },
    { property: "og:locale", content: locale },
    {
      name: "theme-color",
      content: computed(() => (isDark.value ? "#222222" : "#ffffff"))
    }
  ],
  link: [
    {
      rel: "icon",
      type: "image/svg+xml",
      href: computed(() =>
        preferredDark.value
          ? "/favicon/favicon-dark.svg"
          : "/favicon/favicon.svg"
      )
    }
  ]
});

// Initialize toolbar on mobile
const { ui } = useUIStore();
const isMobile = useMobile();

if (isMobile.value) ui.openToolbar = false;
</script>
