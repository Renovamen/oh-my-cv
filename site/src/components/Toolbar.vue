<template>
  <div class="h-full overflow-y-scroll dark:text-gray-300">
    <Paper />
    <ThemeColor />
    <FontFamily />
    <FontSize />
    <Margins />
    <ParagraphSpace />
    <LineHeight />
  </div>
</template>

<style scoped>
.tool-item:not(:last-child) {
  @apply border-c border-b;
}
</style>
