<template>
  <div class="toolbar" bg="white dark:dark-400" text="dark:gray-300">
    <File />
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
