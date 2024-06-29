import type { Callback } from "./types";

export const fetchFile = async (url: string): Promise<string> => {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Request error: ${res.status} ${res.statusText}`);
    }

    return await res.text();
  } catch (error) {
    return Promise.reject(error instanceof Error ? error : new Error(String(error)));
  }
};

/**
 * Open file dialog with ease. This hook differs from vueuse's useFileDialog in that it
 * doesn't require Vue.
 *
 * @param accept File types to accept
 * @returns
 */
export const useFileDialog = (accept?: string) => {
  let callback: Callback<File> | null = null;

  let input: HTMLInputElement | undefined;

  if (document) {
    input = document.createElement("input");

    input.type = "file";
    input.style.display = "none";
    if (accept) input.accept = accept;

    input.onchange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0];

      if (file && callback) callback(file);
    };
  }

  const open = () => {
    if (!input) return;

    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);
  };

  const onChange = (cb: Callback<File>) => {
    callback = cb;
  };

  return {
    open,
    onChange
  };
};

/**
 * Read file content as text.
 *
 * @param file File object
 * @returns Promise containing file content as string
 */
export const readFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Failed to read file"));

    reader.readAsText(file);
  });
};

export const downloadFile = (filename: string, content: string) => {
  const element = document.createElement("a");

  element.href = "data:text/plain;charset=utf-8," + encodeURIComponent(content);
  element.download = filename;
  element.style.display = "none";

  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};
