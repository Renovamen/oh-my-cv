import type * as Monaco from "monaco-editor";

declare global {
  interface Window {
    monaco: typeof Monaco | undefined;
  }
}

export type MonacoModel = {
  get: () => Monaco.editor.ITextModel;
  dispose: () => void;
};

/**
 * Import Monaco and its workers, avoid SSR/SSG errors.
 *
 * https://github.com/vitejs/vite/discussions/1791#discussioncomment-321046
 * https://github.com/antfu/vite-ssgx/issues/74
 * https://github.com/YunYouJun/web-resume/blob/main/src/monaco/setup.ts
 */
export const setupMonaco = async () => {
  if (window.monaco) {
    return {
      monaco: window.monaco
    };
  }

  // Import manaco
  const monaco = await import("monaco-editor");
  window.monaco = monaco;

  // Import editor and css workers
  const [{ default: EditorWorker }, { default: CssWorker }] = await Promise.all([
    import("monaco-editor/esm/vs/editor/editor.worker?worker"),
    import("monaco-editor/esm/vs/language/css/css.worker?worker")
  ]);

  window.MonacoEnvironment = {
    getWorker(_moduleId: string, label: string) {
      switch (label) {
        case "editorWorkerService":
          return new EditorWorker();
        case "css":
          return new CssWorker();
        default:
          throw new Error(`Unknown label ${label}`);
      }
    }
  };

  // Theme
  setupMonacoTheme(monaco);

  return { monaco };
};

export const setupMonacoModel = async (
  language: "markdown" | "css",
  content: string,
  onChange: () => void
): Promise<MonacoModel> => {
  const { monaco } = await setupMonaco();

  const model = monaco.editor.createModel(content, language);
  const disposables: Monaco.IDisposable[] = [model, model.onDidChangeContent(onChange)];

  return {
    get: () => model,
    dispose: () => disposables.forEach((disposable) => disposable.dispose())
  };
};

export const setupMonacoEditor = async (container: HTMLElement) => {
  const { monaco } = await setupMonaco();

  const editor = monaco.editor.create(container, {
    wordWrap: "on",
    fontSize: 13,
    fontFamily: `Menlo, Monaco, "Courier New", monospace`,
    lineHeight: 1.5,
    automaticLayout: true
  });

  return { editor };
};

export const setupMonacoTheme = async (monaco: typeof Monaco) => {
  // Custom dark theme
  monaco.editor.defineTheme("vs-dark-dimmed", {
    base: "vs-dark",
    inherit: true,
    rules: [],
    colors: {
      "editor.background": "#22262B",
      "editor.lineHighlightBorder": "#4b5563",
      "dropdown.background": "#4b5563",
      "menu.separatorBackground": "#6b7280"
    }
  });

  // Watch color mode changes and set theme
  const setTheme = (theme: string) => {
    monaco.editor.setTheme(theme === "dark" ? "vs-dark-dimmed" : "vs");
  };

  const colorMode = useColorMode();

  setTheme(colorMode.value);
  watch(() => colorMode.value, setTheme);
};

export const setupMonacoFileDrop = async (
  container: HTMLElement,
  editor: Monaco.editor.IStandaloneCodeEditor
) => {
  const { monaco } = await setupMonaco();
  const fileUris: string[] = [];

  return (
    model: MonacoModel,
    transformIntoMd: (fileName: string, uri: string) => string
  ) => {
    const modelId = model.get().id;

    let disposed = false;
    model.get().onWillDispose(() => {
      disposed = true;
    });

    function displayLocalImage(evt: DragEvent) {
      if (disposed) return;
      if (editor?.getModel()?.id !== modelId) return;

      evt.stopPropagation();
      evt.preventDefault();

      const file = evt.dataTransfer?.files?.[0];
      if (!file?.type.match("image.*")) {
        return;
      }

      const uri = window.URL.createObjectURL(file);
      fileUris.push(uri);
      const insertText = transformIntoMd(file.name, uri);
      const curSelection = editor.getSelection();

      if (!curSelection) return;
      const { startLineNumber, startColumn, endLineNumber, endColumn } = curSelection;
      editor.executeEdits("move cursor after inserted local image", [
        {
          range: new monaco.Range(startLineNumber, startColumn, endLineNumber, endColumn),
          text: insertText,
          forceMoveMarkers: true
        }
      ]);
    }

    const dispose = () => {
      disposed = true;
      fileUris.forEach((uri) => window.URL.revokeObjectURL(uri));
      container?.removeEventListener("drop", displayLocalImage);
    };
    container.addEventListener("drop", displayLocalImage, false);

    return dispose;
  };
};
