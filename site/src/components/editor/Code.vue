<template>
  <TabsRoot
    class="pane-container overflow-hidden bg-background"
    flex="~ col"
    default-value="markdown"
    @update:model-value="(payload) => activateModel(payload)"
  >
    <TabsList
      class="relative shrink-0 hstack w-full text-sm h-9 border-b px-4"
      md="text-base h-10"
    >
      <TabsIndicator
        class="absolute left-0 bottom-0 h-0.5 bg-primary rounded-full w-[--radix-tabs-indicator-size] translate-x-[--radix-tabs-indicator-position] transition-[width,transform] duration-300"
      />

      <TabsTrigger value="markdown" p="x-2" :disabled="loading">Markdown</TabsTrigger>
      <TabsTrigger value="css" p="x-4" :disabled="loading">CSS</TabsTrigger>
    </TabsList>

    <div ref="editor" flex-1 />
  </TabsRoot>
</template>

<script lang="ts" setup>
const editor = ref<HTMLDivElement>();
const { setup, activateModel, dispose, loading } = useMonaco();

onMounted(async () => {
  await setup(editor.value);
  activateModel("markdown");
});

onBeforeUnmount(dispose);
</script>
