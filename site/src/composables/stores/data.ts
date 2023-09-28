import { acceptHMRUpdate, defineStore } from "pinia";
import type { SystemData } from "~/types";

export const useDataStore = defineStore("data", () => {
  const data = reactive<SystemData>({
    mdContent: "",
    cssContent: "",
    mdFlag: false,
    cssFlag: false,
    curResumeId: null,
    curResumeName: DEFAULT_NAME
  });

  const setData = <T extends keyof SystemData>(key: T, value: SystemData[T]) => {
    data[key] = value;
    if (key === "cssContent") setBackboneCss(value as string, "preview");
  };

  const toggleMdFlag = (to: boolean) => {
    data.mdFlag = to;
  };

  const toggleCssFlag = (to: boolean) => {
    data.cssFlag = to;
  };

  return {
    data,
    setData,
    toggleMdFlag,
    toggleCssFlag
  };
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useDataStore, import.meta.hot));
