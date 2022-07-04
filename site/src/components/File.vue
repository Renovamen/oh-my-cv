<template>
  <NavItem :text="t('file.btn')" icon="mdi:file-outline">
    <Dropdown :items="items" />
  </NavItem>

  <ImportPane v-if="isImportOpen" @close-import="toggleImport(false)" />
</template>

<script lang="ts" setup>
const { t } = useI18n();

// Import menu
const isImportOpen = ref(false);

const toggleImport = (to?: boolean): void => {
  isImportOpen.value = typeof to === "boolean" ? to : !isImportOpen.value;
};

const items = computed(() => [
  {
    text: t("file.import"),
    icon: "mdi:upload",
    function: () => toggleImport(true)
  },
  {
    text: t("file.export.pdf"),
    icon: "mdi:progress-download",
    function: () => {
      const title = document.title;

      const container = document.querySelector(".vue-smart-pages");
      const name = container?.querySelector("h1")?.innerHTML;

      if (name)
        document.title = name.trim().replace(/\s+/g, "-") + "-" + t("resume");

      window.print();
      document.title = title;
    }
  }
]);
</script>
