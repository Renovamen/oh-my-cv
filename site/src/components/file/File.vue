<template>
  <Button
    :tip="t('file.btn')"
    styles="bg-blue-500 text-white"
    active-styles="bg-blue-600 text-white"
  >
    <template #icon>
      <span class="iconify" text="sm pc:base" data-icon="mdi:file-outline" />
    </template>

    <template #dropdown>
      <Dropdown :items="items" />
    </template>
  </Button>

  <Import v-if="isImportOpen" @close-import="toggleImport(false)" />
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
