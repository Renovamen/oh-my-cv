export const fetchFile = async (url: string) => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw Error("Request error: " + res);
    return res.text();
  } catch (error) {
    return Promise.reject(error);
  }
};

export const uploadFile = (
  callback: (content: string) => void,
  accept?: string
) => {
  const upload = (e: Event) => {
    e.stopPropagation();

    if (
      !(e.target as HTMLInputElement).files ||
      (e.target as HTMLInputElement).files!.length < 1
    )
      return;

    const file: File = (e.target as HTMLInputElement).files![0];
    let fileReader: FileReader | null = null;

    const handleFileRead = () => {
      const content = (fileReader as FileReader).result as string;
      callback(content);
    };

    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  };

  const element = document.createElement("input");

  element.style.display = "none";
  element.type = "file";
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
