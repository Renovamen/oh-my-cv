import * as localForage from "localforage";
import { ResumeStorage, ResumeStorageItem, ResumeStyles } from "~/types";
import { DEFAULT_STYLES, DEFAULT_NAME } from "./constants";
import { fetchFile } from ".";

const OHCV_KEY = "ohcv_data";

export const getStorage = () => localForage.getItem<ResumeStorage>(OHCV_KEY);

export const setResumeStyles = (styles: ResumeStyles) => {
  const { setStyle } = useStyleStore();

  for (const key of Object.keys(styles) as Array<keyof ResumeStyles>)
    setStyle(key, styles[key]);
};

export const setResumeContent = (content: string) => {
  const { setData, toggleImportedFlag } = useDataStore();

  setData("mdContent", content);
  toggleImportedFlag(true);
};

export const setResume = (id: string, resume: ResumeStorageItem) => {
  const { setData } = useDataStore();

  setData("curResumeId", id);
  setData("curResumeName", resume.name);
  setResumeContent(resume.content);
  setResumeStyles(resume.styles);
};

export const newResume = () => {
  // New a resume using default styles and content

  const { setData } = useDataStore();
  const { setToastFlag } = useToastStore();

  // Generate a new id
  const id = new Date().getTime().toString();
  setData("curResumeId", id);

  // Default styles and name
  setResumeStyles(DEFAULT_STYLES);
  setData("curResumeName", DEFAULT_NAME);

  // Load example markdown content
  fetchFile("/example.md").then((text: string) => {
    setResumeContent(text);
    setToastFlag("new", true);
    saveResume();
  });
};

export const fallToFirstResume = () => {
  const { setToastFlag } = useToastStore();

  getStorage().then((storage) => {
    if (storage && Object.keys(storage).length > 0) {
      const id = Object.keys(storage).sort((a, b) => b.localeCompare(a))[0];
      setResume(id, storage[id]);
      setToastFlag("switch", storage[id].name);
    } else newResume();
  });
};

export const saveResume = () => {
  const { data } = useDataStore();
  const { styles } = useStyleStore();
  const { setToastFlag } = useToastStore();

  const resume = {
    name: data.curResumeName,
    content: data.mdContent,
    styles: toRaw(styles)
  } as ResumeStorageItem;

  getStorage().then((storage) => {
    if (storage === null) storage = {};
    storage[data.curResumeId!] = resume;

    localForage
      .setItem(OHCV_KEY, storage)
      .then(() => setToastFlag("save", true));
  });
};

export const deleteResume = () => {
  const { data } = useDataStore();
  const { setToastFlag } = useToastStore();

  const id = data.curResumeId!;
  const name = data.curResumeName;

  getStorage().then((storage) => {
    if (storage && storage[id]) delete storage[id];

    localForage.setItem(OHCV_KEY, storage).then(() => {
      setToastFlag("delete", name);
      fallToFirstResume();
    });
  });
};

export const switchResume = (id: string) => {
  const { data } = useDataStore();
  const { setToastFlag } = useToastStore();

  if (id === data.curResumeId) return;

  getStorage().then((storage) => {
    if (storage && storage[id]) {
      setResume(id, storage[id]);
      setToastFlag("switch", storage[id].name);
    }
  });
};
