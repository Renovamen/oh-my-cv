<template>
  <ToolItem :text="$t('toolbar.file.text')" icon="carbon:import-export">
    <Dialog
      id="import-md"
      :title="$t('import.title')"
      icon="mdi:upload"
      box-class="h-40 w-full md:w-96"
    >
      <template #button>
        <li class="dropdown-li space-x-1.5 rounded" role="button">
          <client-only>
            <span class="iconify text-base" data-icon="mdi:upload" />
          </client-only>
          <span>{{ $t("toolbar.file.import") }}</span>
        </li>
      </template>

      <template #content>
        <ImportDialogContent />
      </template>
    </Dialog>

    <hr border-dashed border-c my-1 />

    <li class="dropdown-li space-x-1.5 rounded" role="button" @click="exportPDF">
      <client-only>
        <span class="iconify text-base" data-icon="mdi:file-pdf" />
      </client-only>
      <span>{{ $t("toolbar.file.export_pdf") }}</span>
    </li>

    <li class="dropdown-li space-x-1.5 rounded" role="button" @click="exportMd">
      <client-only>
        <span class="iconify text-base" data-icon="ri:markdown-fill" />
      </client-only>
      <span>{{ $t("toolbar.file.export_md") }}</span>
    </li>
  </ToolItem>
</template>

<script lang="ts" setup>
import { downloadFile } from "@renovamen/utils";

const { data } = useDataStore();
const saveName = computed(() => data.curResumeName.trim().replace(/\s+/g, "_"));

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
