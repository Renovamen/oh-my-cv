<template>
  <ToolItem :text="t('toolbar.file.text')" icon="mdi:file-outline">
    <li class="dropdown-li rounded" @click="toggleImport(true)">
      <span class="iconify text-base" data-icon="mdi:upload" />
      <span>{{ t("toolbar.file.import") }}</span>
    </li>

    <li class="dropdown-li rounded" @click="exportPDF">
      <span class="iconify text-base" data-icon="bi:file-earmark-pdf-fill" />
      <span>{{ t("toolbar.file.export_pdf") }}</span>
    </li>

    <ImportPane v-if="isImportOpen" @close-import="toggleImport(false)" />
  </ToolItem>
</template>

<script lang="ts" setup>
const { t } = useI18n();

// Import menu
const isImportOpen = ref(false);

const toggleImport = (to?: boolean): void => {
  isImportOpen.value = typeof to === "boolean" ? to : !isImportOpen.value;
};

const exportPDF = () => {
  const { data } = useDataStore();

  const title = document.title;
  const name = data.curResumeName;

  if (name) document.title = name.trim().replace(/\s+/g, "_");

  window.print();
  document.title = title;
};
</script>
