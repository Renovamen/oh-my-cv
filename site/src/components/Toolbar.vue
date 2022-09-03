<template>
  <div text-c bg-c>
    <File />
    <Paper />
    <ThemeColor />
    <FontFamily />
    <FontSize />
    <Margins />
    <ParagraphSpace />
    <LineHeight />
    <CorrectCase />
  </div>
</template>

<style scoped>
.tool-item:not(:last-child) {
  @apply border-c border-b;
}
</style>
