import type * as Monaco from "monaco-editor";
import { debounce } from "ts-debounce";

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
    const [{ default: EditorWorker }, { default: CssWorker }] =
      await Promise.all([
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
  })();

  if (getCurrentInstance())
    await new Promise<void>((resolve) => onMounted(resolve));

  return { monaco };
};

export const setupMonacoModel = (
  monaco: any,
  editor: Monaco.editor.IStandaloneCodeEditor,
  language: "markdown" | "css",
  content: string,
  onChange: () => void
) => {
  const disposables = [] as Monaco.IDisposable[];
  const model = monaco.editor.createModel(
    content,
    language
  ) as Monaco.editor.ITextModel;

  disposables.push(model);
  disposables.push(model.onDidChangeContent(onChange));

  return {
    getModel: () => model,
    activate: () => {
      editor.setModel(model);
    },
    dispose: () => {
      disposables.forEach((disposable) => disposable.dispose());
    }
  };
};

export const setupMonacoEditor = async (container: HTMLDivElement) => {
  const disposables = [] as Monaco.IDisposable[];
  const { data, setData } = useDataStore();
  const { monaco } = await setupMonaco();

  // Editor
  const editor = monaco.editor.create(container, {
    wordWrap: "on",
    fontSize: 13,
    automaticLayout: true
  }) as Monaco.editor.IStandaloneCodeEditor;

  disposables.push(editor);

  // Theme
  monaco.editor.defineTheme("vs-dark-dimmed", {
    base: "vs-dark",
    inherit: true,
    rules: [],
    colors: {
      "editor.background": "#334155",
      "editor.lineHighlightBorder": "#4b5563",
      "dropdown.background": "#4b5563",
      "menu.separatorBackground": "#6b7280"
    }
  });

  monaco.editor.setTheme(isDark.value ? "vs-dark-dimmed" : "vs");

  watch(isDark, (val) => {
    monaco.editor.setTheme(val ? "vs-dark-dimmed" : "vs");
  });

  // Markdown model
  const markdown = setupMonacoModel(
    monaco,
    editor,
    "markdown",
    data.mdContent,
    debounce(() => {
      setData("mdContent", markdown.getModel().getValue());
    }, 200)
  );
  disposables.push(markdown);

  // CSS model
  const css = setupMonacoModel(
    monaco,
    editor,
    "css",
    data.cssContent,
    debounce(() => {
      setData("cssContent", css.getModel().getValue());
    }, 200)
  );
  disposables.push(css);

  return {
    editor,
    models: {
      markdown,
      css
    },
    dispose: () => {
      disposables.forEach((disposable) => disposable.dispose());
    }
  };
};
