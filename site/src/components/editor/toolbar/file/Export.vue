<template>
  <UiTooltipProvider :delay-duration="0">
    <UiTooltip>
      <UiTooltipTrigger as-child>
        <UiButton
          class="gap-x-1.5 w-full h-8 justify-start"
          variant="ghost"
          size="sm"
          :disabled="exportingPDF"
          @click="exportPDF"
        >
          <span i-mdi:file-pdf text-base />
          {{ $t("toolbar.file.export_pdf.title") }}
        </UiButton>
      </UiTooltipTrigger>
      <UiTooltipContent side="bottom" class="w-54 p-0 rounded border-destructive/60">
        <UiAlert variant="destructive" class="border-none rounded-none">
          <UiAlertTitle>
            {{ $t("toolbar.file.export_pdf.alert.title") }}
            <span class="text-foreground font-normal text-xs">
              (<SharedIssueLink issue="13" />, <SharedIssueLink issue="16" />)
            </span>
          </UiAlertTitle>
          <UiAlertDescription v-html="$t('toolbar.file.export_pdf.alert.content')" />
        </UiAlert>
      </UiTooltipContent>
    </UiTooltip>
  </UiTooltipProvider>

  <UiButton
    class="gap-x-1.5 w-full h-8 justify-start"
    variant="ghost"
    size="sm"
    @click="exportMd"
  >
    <span i-ri:markdown-fill text-base />
    {{ $t("toolbar.file.export_md") }}
  </UiButton>
</template>

<script lang="ts" setup>
import { downloadFile } from "@renovamen/utils";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

const { data } = useDataStore();
const { PAPER } = useConstant();
const { styles } = useStyleStore();
const saveName = computed(() => data.resumeName.trim().replace(/\s+/g, "_"));
const exportingPDF = ref(false);

const waitForExportRender = async () => {
  await nextTick();
  await document.fonts.ready;
  await new Promise<void>((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  });
};

const getResumePages = () => {
  const preview = document.getElementById("resume-preview");
  if (!preview) throw new Error("Resume preview is not ready.");

  const pages = Array.from(
    preview.querySelectorAll<HTMLElement>(
      '[data-scope="vue-smart-pages"][data-part="page"]'
    )
  );
  if (pages.length === 0) throw new Error("Resume pages are not ready.");

  return pages;
};

const getPageSize = (page: HTMLElement) => {
  return {
    height: page.offsetHeight || page.scrollHeight,
    width: page.offsetWidth || page.scrollWidth
  };
};

const prepareCloneForExport = (_node: HTMLElement, clone: HTMLElement) => {
  const zoom = clone.closest(".vue-zoom") as HTMLElement | null;

  if (zoom) {
    zoom.style.transform = "none";
    zoom.style.marginLeft = "0";
  }

  clone.style.transform = "none";
};

// Export as PDF
const exportPDF = async () => {
  if (exportingPDF.value) return;

  exportingPDF.value = true;

  try {
    await waitForExportRender();

    const pages = getResumePages();
    const paper = PAPER.SIZES[styles.paper];
    const pdf = new jsPDF({
      compress: true,
      format: [paper.w, paper.h],
      orientation: paper.w > paper.h ? "landscape" : "portrait",
      unit: "mm"
    });

    for (const [index, page] of pages.entries()) {
      const { height, width } = getPageSize(page);
      const image = await toPng(page, {
        backgroundColor: "#fff",
        cacheBust: true,
        height,
        pixelRatio: Math.min(3, Math.max(2, window.devicePixelRatio || 1)),
        style: {
          transform: "none"
        },
        width,
        filter: (node) => {
          if (!(node instanceof HTMLElement)) return true;
          return !["zoom-bar", "nuxt-devtools-container"].includes(node.id);
        },
        onCloneNode: prepareCloneForExport
      });

      if (index > 0) pdf.addPage([paper.w, paper.h], "portrait");
      pdf.addImage(image, "PNG", 0, 0, paper.w, paper.h);
    }

    pdf.save(`${saveName.value}.pdf`);
  } finally {
    exportingPDF.value = false;
  }
};

// Export as Markdown
const exportMd = () => {
  downloadFile(`${saveName.value}.md`, data.markdown);
};
</script>
