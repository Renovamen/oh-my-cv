import * as localForage from "localforage";
import { downloadFile, copy } from "@renovamen/utils";
import { ResumeStorage, ResumeStorageItem, ResumeStyles } from "~/types";
import { DEFAULT_STYLES, DEFAULT_NAME, DEFAULT_MD_CONTENT } from ".";

const OHCV_KEY = "ohcv_data";

export const getStorage = async () =>
  localForage.getItem<ResumeStorage>(OHCV_KEY);

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

export const newResume = async () => {
  // New a resume using default styles and content

  const { setData } = useDataStore();
  const { setToastFlag } = useToastStore();

  // Generate a new id
  const id = new Date().getTime().toString();
  setData("curResumeId", id);

  // Default markdown content, content, and styles
  setData("curResumeName", DEFAULT_NAME);
  setResumeStyles(DEFAULT_STYLES);
  setResumeContent(DEFAULT_MD_CONTENT);

  setToastFlag("new", true);
  saveResume();
};

export const fallToFirstResume = async () => {
  const { setToastFlag } = useToastStore();
  const storage = await getStorage();

  if (storage && Object.keys(storage).length > 0) {
    const id = Object.keys(storage).sort((a, b) => b.localeCompare(a))[0];
    setResume(id, storage[id]);
    setToastFlag("switch", storage[id].name);
  } else newResume();
};

export const saveResume = async () => {
  const { data } = useDataStore();
  const { styles } = useStyleStore();
  const { setToastFlag } = useToastStore();

  if (!data.curResumeId) return;

  const resume = {
    name: data.curResumeName,
    content: data.mdContent,
    styles: toRaw(styles)
  } as ResumeStorageItem;

  const storage = (await getStorage()) || {};
  storage[data.curResumeId] = resume;

  await localForage.setItem(OHCV_KEY, storage);
  setToastFlag("save", true);
};

export const saveResumesToLocal = async () => {
  await saveResume();

  const storage = (await getStorage()) || {};
  downloadFile("ohcv_data.json", JSON.stringify(storage));
};

export const deleteResume = async (id: string | null) => {
  if (!id) return;

  const { setToastFlag } = useToastStore();
  const storage = await getStorage();

  if (storage && storage[id]) {
    const name = storage[id].name;
    delete storage[id];

    await localForage.setItem(OHCV_KEY, storage);

    setToastFlag("delete", name);
    fallToFirstResume();
  }
};

export const switchResume = async (id: string | null) => {
  const { data } = useDataStore();
  const { setToastFlag } = useToastStore();

  if (!id || id === data.curResumeId) return;

  const storage = await getStorage();

  if (storage && storage[id]) {
    setResume(id, storage[id]);
    setToastFlag("switch", storage[id].name);
  }
};

export const duplicateResume = async (id: string | null) => {
  if (!id) return;

  const { setToastFlag } = useToastStore();

  await saveResume();

  const storage = await getStorage();

  if (storage && storage[id]) {
    // Generate an id and name for duplicated resume
    const resume = copy(storage[id]);
    const newId = new Date().getTime().toString();
    const oldName = resume.name;

    resume.name = oldName + " Copy";
    storage[newId] = resume;

    await localForage.setItem(OHCV_KEY, storage);
    setToastFlag("duplicate", oldName);

    switchResume(newId);
  }
};
