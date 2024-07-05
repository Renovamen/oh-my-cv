<template>
  <div flex w-72 h-full>
    <ToolList />
    <Navigation />
  </div>
</template>

<script lang="tsx" setup>
const sections = [
  {
    id: "file",
    icon: "i-carbon:import-export",
    component: <EditorToolbarFile id="toolbar-file" />
  },
  {
    id: "paper",
    icon: "i-majesticons:paper-fold-line",
    component: <EditorToolbarPaper id="toolbar-paper" />
  },
  {
    id: "theme_color",
    icon: "i-material-symbols:palette-outline",
    component: <EditorToolbarThemeColor id="toolbar-theme_color" />
  },
  {
    id: "font_family",
    icon: "i-material-symbols:font-download-outline",
    component: <EditorToolbarFontFamily id="toolbar-font_family" />
  },
  {
    id: "font_size",
    icon: "i-ri:font-size-2",
    component: <EditorToolbarFontSize id="toolbar-font_size" />
  },
  {
    id: "margins",
    icon: "i-radix-icons:margin",
    component: <EditorToolbarMargins id="toolbar-margins" />
  },
  {
    id: "paragraph_spacing",
    icon: "i-icon-park-outline:paragraph-break-two",
    component: <EditorToolbarParagraphSpace id="toolbar-paragraph_spacing" />
  },
  {
    id: "line_height",
    icon: "i-ic:round-format-line-spacing",
    component: <EditorToolbarLineHeight id="toolbar-line_height" />
  },
  {
    id: "correct_case",
    icon: "i-icon-park-outline:check-correct",
    component: <EditorToolbarCorrectCase id="toolbar-correct_case" />
  }
];

const scrollTo = (id: string) => {
  const toolbar = document.querySelector("#toolbar") as HTMLElement;
  const section = document.querySelector(`#toolbar-${id}`) as HTMLElement;

  toolbar.scrollTo({
    // offsetTop - header height - margin top
    top: section.offsetTop - 48 - 20,
    behavior: "smooth"
  });
};

const ToolList = () => (
  <div
    id="toolbar"
    class="pane-container hide-scrollbar bg-background"
    lt-lg="bg-accent rounded-none"
  >
    {sections.map((item, i) => (
      <>
        {item.component}
        {i < sections.length - 1 && (
          <div class="px-4">
            <UiSeparator />
          </div>
        )}
      </>
    ))}
  </div>
);

const Navigation = () => {
  const { t } = useI18n();

  return (
    <div
      class="flex-center flex-col flex-none gap-1 w-10 bg-accent"
      border="l dashed lg:none"
    >
      {sections.map((item) => {
        const label =
          t(`toolbar.${item.id}`) === `toolbar.${item.id}`
            ? t(`toolbar.${item.id}.text`)
            : t(`toolbar.${item.id}`);

        return (
          <UiButton
            size="round"
            variant="ghost-secondary"
            onClick={() => scrollTo(item.id)}
            aria-label={label}
          >
            <span class={`${item.icon} size-4`} />
          </UiButton>
        );
      })}
    </div>
  );
};
</script>
