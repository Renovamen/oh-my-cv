// Avoid vite-ssg error
// https://github.com/vitejs/vite/discussions/1791#discussioncomment-321046
// https://github.com/antfu/vite-ssg/issues/74
// https://github.com/YunYouJun/web-resume/blob/main/src/monaco/setup.ts

export const setupMonaco = async () => {
  if (window.monaco) {
    return {
      monaco: window.monaco
    };
  }

  const monaco = await import("monaco-editor");
  window.monaco = monaco;

  await (async () => {
    const { default: worker } = await import(
      "monaco-editor/esm/vs/editor/editor.worker?worker"
    );

    window.MonacoEnvironment = {
      getWorker(_moduleId: string, label: string) {
        switch (label) {
          case "editorWorkerService":
            return new worker();
          default:
            throw new Error(`Unknown label ${label}`);
        }
      }
    };
  })();

  if (getCurrentInstance())
    await new Promise<void>((resolve) => onMounted(resolve));

  return { monaco };
};

export default setupMonaco;
