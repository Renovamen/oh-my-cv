import * as localForage from "localforage";
import { downloadFile, uploadFile, copy } from "@renovamen/utils";
import {
  DEFAULT_STYLES,
  DEFAULT_NAME,
  DEFAULT_MD_CONTENT,
  DEFAULT_CSS_CONTENT
} from ".";
import type { ResumeStorage, ResumeStorageItem, ResumeStyles } from "~/types";

const OHMYCV_KEY = "ohmycv_data";

export const getStorage = async () =>
  localForage.getItem<ResumeStorage>(OHMYCV_KEY);

export const getResumeList = async () => {
  const storage = (await getStorage()) || {};
  return Object.keys(storage)
    .map((i) => ({
      id: i,
      ...storage[i]
    }))
    .sort((a, b) => (b.update || b.id).localeCompare(a.update || a.id));
};

export const setResumeStyles = (styles: ResumeStyles) => {
  const { setStyle } = useStyleStore();

  for (const key of Object.keys(styles) as Array<keyof ResumeStyles>)
    setStyle(key, styles[key]);
};

export const setResumeMd = (content: string) => {
  const { setData, toggleMdFlag } = useDataStore();

  setData("mdContent", content);
  toggleMdFlag(true);
};

export const setResumeCss = (content: string) => {
  const { setData, toggleCssFlag } = useDataStore();

  setData("cssContent", content);
  toggleCssFlag(true);
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
  setResumeMd(resume.markdown);
  setResumeCss(resume.css);
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

  await localForage.setItem(OHMYCV_KEY, storage);
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
    markdown: DEFAULT_MD_CONTENT,
    css: DEFAULT_CSS_CONTENT,
    styles: DEFAULT_STYLES,
    update: id
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
  downloadFile("ohmycv_data.json", JSON.stringify(storage));
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
      if (typeof resume.markdown !== "string") return false;
      if (typeof resume.css !== "string") return false;
      if (typeof resume.styles !== "object") return false;
      if (!["string", "undefined"].includes(typeof resume.update)) return false;

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

    await localForage.setItem(OHMYCV_KEY, newStorage);
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

    await localForage.setItem(OHMYCV_KEY, storage);

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
    resume.update = newId;
    storage[newId] = resume;

    await localForage.setItem(OHMYCV_KEY, storage);
    setToastFlag("duplicate", oldName);
  }
};

export const renameResume = async (id: string, name: string) => {
  const { setToastFlag } = useToastStore();

  const storage = (await getStorage()) || {};
  storage[id].name = name;

  await localForage.setItem(OHMYCV_KEY, storage);
  setToastFlag("save", true);
};
