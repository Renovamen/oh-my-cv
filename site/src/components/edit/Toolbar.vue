<template>
  <div flex text-c h-full>
    <tools />
    <navbar />
  </div>
</template>

<script lang="tsx" setup>
const sections = [
  {
    name: "file",
    icon: "carbon:import-export",
    component: <File id="toolbar-file" />
  },
  {
    name: "paper",
    icon: "majesticons:paper-fold-line",
    component: <Paper id="toolbar-paper" />
  },
  {
    name: "theme-color",
    icon: "material-symbols:palette-outline",
    component: <ThemeColor id="toolbar-theme-color" />
  },
  {
    name: "font-family",
    icon: "material-symbols:font-download-outline",
    component: <FontFamily id="toolbar-font-family" />
  },
  {
    name: "font-size",
    icon: "ri:font-size-2",
    component: <FontSize id="toolbar-font-size" />
  },
  {
    name: "margins",
    icon: "radix-icons:margin",
    component: <Margins id="toolbar-margins" />
  },
  {
    name: "paragraph-space",
    icon: "icon-park-outline:paragraph-break-two",
    component: <ParagraphSpace id="toolbar-paragraph-space" />
  },
  {
    name: "line-height",
    icon: "ic:round-format-line-spacing",
    component: <LineHeight id="toolbar-line-height" />
  },
  {
    name: "correct-case",
    icon: "icon-park-outline:check-correct",
    component: <CorrectCase id="toolbar-correct-case" />
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

const tools = () => (
  <div class="pane-container" id="toolbar">
    {sections.map((item) => item.component)}
  </div>
);

const navbar = () => (
  <div
    class="flex-center flex-col flex-none space-y-1 w-9 md:w-10"
    border="l c dashed lg:none"
  >
    {sections.map((item) => (
      <button class="round-btn" onClick={() => scrollTo(item.name)}>
        <span class="iconify" text="sm md:base" data-icon={item.icon} />
      </button>
    ))}
  </div>
);
</script>

<style>
#toolbar .tool-item:not(:last-child) {
  @apply border-c border-b;
}
</style>
