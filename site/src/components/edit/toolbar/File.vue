<template>
  <ToolItem :text="t('toolbar.file.text')" icon="carbon:import-export">
    <li class="dropdown-li space-x-1.5 rounded" @click="toggleImport(true)">
      <client-only>
        <span class="iconify text-base" data-icon="mdi:upload" />
      </client-only>
      <span>{{ t("toolbar.file.import") }}</span>
    </li>

    <hr border-dashed border-c my-1 />

    <li class="dropdown-li space-x-1.5 rounded" @click="exportPDF">
      <client-only>
        <span class="iconify text-base" data-icon="mdi:file-pdf" />
      </client-only>
      <span>{{ t("toolbar.file.export_pdf") }}</span>
    </li>

    <li class="dropdown-li space-x-1.5 rounded" @click="exportMd">
      <client-only>
        <span class="iconify text-base" data-icon="ri:markdown-fill" />
      </client-only>
      <span>{{ t("toolbar.file.export_md") }}</span>
    </li>

    <ImportPane v-if="isImportOpen" @close-import="toggleImport(false)" />
  </ToolItem>
</template>

<script lang="ts" setup>
import { downloadFile } from "@renovamen/utils";

const { t } = useI18n();
const { data } = useDataStore();

const saveName = computed(() => data.curResumeName.trim().replace(/\s+/g, "_"));

// Import menu
const isImportOpen = ref(false);

const toggleImport = (to?: boolean): void => {
  isImportOpen.value = typeof to === "boolean" ? to : !isImportOpen.value;
};

const exportPDF = () => {
  const title = document.title;

  document.title = saveName.value;
  window.print();
  document.title = title;
};

const exportMd = () => {
  downloadFile(`${saveName.value}.md`, data.mdContent);
};
</script>
