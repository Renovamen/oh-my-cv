<template>
  <div flex w-72 h-full>
    <ToolList />
    <Navigation />
  </div>
</template>

<script lang="tsx" setup>
const sections = [
  {
    name: "file",
    icon: "i-carbon:import-export",
    component: <EditorToolbarFile id="toolbar-file" />
  },
  {
    name: "paper",
    icon: "i-majesticons:paper-fold-line",
    component: <EditorToolbarPaper id="toolbar-paper" />
  },
  {
    name: "theme-color",
    icon: "i-material-symbols:palette-outline",
    component: <EditorToolbarThemeColor id="toolbar-theme-color" />
  },
  {
    name: "font-family",
    icon: "i-material-symbols:font-download-outline",
    component: <EditorToolbarFontFamily id="toolbar-font-family" />
  },
  {
    name: "font-size",
    icon: "i-ri:font-size-2",
    component: <EditorToolbarFontSize id="toolbar-font-size" />
  },
  {
    name: "margins",
    icon: "i-radix-icons:margin",
    component: <EditorToolbarMargins id="toolbar-margins" />
  },
  {
    name: "paragraph-space",
    icon: "i-icon-park-outline:paragraph-break-two",
    component: <EditorToolbarParagraphSpace id="toolbar-paragraph-space" />
  },
  {
    name: "line-height",
    icon: "i-ic:round-format-line-spacing",
    component: <EditorToolbarLineHeight id="toolbar-line-height" />
  },
  {
    name: "correct-case",
    icon: "i-icon-park-outline:check-correct",
    component: <EditorToolbarCorrectCase id="toolbar-correct-case" />
  }
];

const scrollTo = (name: string) => {
  const toolbar = document.querySelector("#toolbar") as HTMLElement;
  const section = document.querySelector(`#toolbar-${name}`) as HTMLElement;

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

const Navigation = () => (
  <div
    class="flex-center flex-col flex-none gap-1 w-10 bg-accent"
    border="l dashed lg:none"
  >
    {sections.map((item) => (
      <UiButton
        size="round"
        variant="ghost-secondary"
        onClick={() => scrollTo(item.name)}
      >
        <span class={`${item.icon} size-4`} />
      </UiButton>
    ))}
  </div>
);
</script>
