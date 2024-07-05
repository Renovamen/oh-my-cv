<template>
  <EditorToolbarBox :text="$t('toolbar.file.title')" icon="i-carbon:import-export">
    <EditorToolbarFileSave />
    <EditorToolbarFileRename />

    <hr border-dashed my-2 />

    <EditorToolbarFileExport />

    <hr border-dashed my-2 />

    <EditorToolbarFileImport />
  </EditorToolbarBox>
</template>
