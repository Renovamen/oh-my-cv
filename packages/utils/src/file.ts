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

export const uploadFile = (callback: (content: string) => void, accept?: string) => {
  const handleFileRead = (e: ProgressEvent<FileReader>) => {
    const content = e.target?.result as string;
    callback(content);
  };

  const upload = (e: Event) => {
    e.stopPropagation();
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    const fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  };

  const element = document.createElement("input");

  element.type = "file";
  element.style.display = "none";
  element.onchange = upload;
  if (accept) element.accept = accept;

  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
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
