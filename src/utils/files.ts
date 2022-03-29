export const fetchMarkdown = (url: string) => {
  return fetch(url)
    .then((res) => {
      if (!res.ok) throw Error("Request error.");
      return res.text();
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};
