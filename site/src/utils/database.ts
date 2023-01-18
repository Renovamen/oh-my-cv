import * as localForage from "localforage";
import { downloadFile, uploadFile, copy } from "@renovamen/utils";
import { DEFAULT_STYLES, DEFAULT_NAME, DEFAULT_MD_CONTENT } from ".";
import type { ResumeStorage, ResumeStorageItem, ResumeStyles } from "~/types";

const OHCV_KEY = "ohcv_data";

export const getStorage = async () =>
  localForage.getItem<ResumeStorage>(OHCV_KEY);

export const getResumeList = async () => {
  const storage = (await getStorage()) || {};
  return Object.keys(storage)
    .map((i) => ({
      id: i,
      ...storage[i]
    }))
    .sort((a, b) => b.id.localeCompare(a.id));
};

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

/**
 * Overwrite data for a given resume to local storage
 *
 * @param id resume id
 * @param resume resume data
 */
export const setResume = (id: string, resume: ResumeStorageItem) => {
  const { setData } = useDataStore();

  setData("curResumeId", id);
  setData("curResumeName", resume.name);
  setResumeContent(resume.content);
  setResumeStyles(resume.styles);
};

/**
 * Save changes to a certain resume
 *
 * @param id resume id
 * @param resume resume data
 */
export const saveResume = async (id: string, resume: ResumeStorageItem) => {
  const { setToastFlag } = useToastStore();

  const storage = (await getStorage()) || {};
  storage[id] = resume;

  await localForage.setItem(OHCV_KEY, storage);
  setToastFlag("save", true);
};

/**
 * New a resume using default styles and content
 */
export const newResume = async () => {
  const { setToastFlag } = useToastStore();

  const id = new Date().getTime().toString(); // generate a new id
  const resume = {
    name: DEFAULT_NAME,
    content: DEFAULT_MD_CONTENT,
    styles: DEFAULT_STYLES
  } as ResumeStorageItem;

  await saveResume(id, resume);
  setToastFlag("new", true);

  return id;
};

/**
 * Download data for all resumes to a .json file
 */
export const saveResumesToLocal = async () => {
  const storage = (await getStorage()) || {};
  downloadFile("ohcv_data.json", JSON.stringify(storage));
};

/**
 * Import resumes from a local .json file
 *
 * @param callback A callback function to be excuted after importing finished
 */
export const importResumesFromLocal = async (callback?: () => void) => {
  const { setToastFlag } = useToastStore();

  const check = (data: ResumeStorage) => {
    for (const resume of Object.values(data)) {
      if (typeof resume.name !== "string") return false;
      if (typeof resume.content !== "string") return false;
      if (typeof resume.styles !== "object") return false;

      const styles = resume.styles;

      if (typeof styles.fontSize !== "number") return false;
      if (typeof styles.lineHeight !== "number") return false;
      if (typeof styles.marginH !== "number") return false;
      if (typeof styles.marginV !== "number") return false;
      if (typeof styles.paper !== "string") return false;
      if (typeof styles.paragraphSpace !== "number") return false;
      if (typeof styles.themeColor !== "string") return false;

      if (
        typeof styles.fontCJK !== "object" ||
        typeof styles.fontCJK.name !== "string"
      )
        return false;
      if (
        typeof styles.fontEN !== "object" ||
        typeof styles.fontEN.name !== "string"
      )
        return false;
    }

    return true;
  };

  const storage = (await getStorage()) || {};

  const merge = async (content: string) => {
    const data = JSON.parse(content) as ResumeStorage;

    if (!check(data)) {
      setToastFlag("import", "no");
      return;
    }

    const newStorage = {
      ...storage,
      ...data
    };

    await localForage.setItem(OHCV_KEY, newStorage);
    setToastFlag("import", "yes");

    callback && callback();
  };

  uploadFile(merge, ".json");
};

export const deleteResume = async (id: string) => {
  const { setToastFlag } = useToastStore();
  const storage = await getStorage();

  if (storage && storage[id]) {
    const name = storage[id].name;
    delete storage[id];

    await localForage.setItem(OHCV_KEY, storage);

    setToastFlag("delete", name);
  }
};

export const switchResume = async (id: string) => {
  const { setToastFlag } = useToastStore();
  const storage = await getStorage();

  if (storage && storage[id]) {
    setResume(id, storage[id]);
    setToastFlag("switch", storage[id].name);
    return true;
  }

  return false;
};

export const duplicateResume = async (id: string) => {
  const { setToastFlag } = useToastStore();
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
  }
};

export const renameResume = async (id: string, name: string) => {
  const { setToastFlag } = useToastStore();

  const storage = (await getStorage()) || {};
  storage[id].name = name;

  await localForage.setItem(OHCV_KEY, storage);
  setToastFlag("save", true);
};
