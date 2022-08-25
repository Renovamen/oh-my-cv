export const fetchFile = (url: string) => {
  return fetch(url)
    .then((res) => {
      if (!res.ok) throw Error("Request error: " + res);
      return res.text();
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

export const uploadFile = (e: Event, callback: (content: string) => void) => {
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

export const downloadFile = (filename: string, content: string) => {
  const element = document.createElement("a");

  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(content)
  );
  element.setAttribute("download", filename);
  element.style.display = "none";

  document.body.appendChild(element);
  element.click();

  document.body.removeChild(element);
};
