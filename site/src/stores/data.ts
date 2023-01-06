import { defineStore } from "pinia";
import { DEFAULT_NAME } from "~/utils";
import type { SystemData } from "~/types";

export const useDataStore = defineStore("data", () => {
  const data = reactive<SystemData>({
    mdContent: "",
    fileImported: false,
    curResumeId: null,
    curResumeName: DEFAULT_NAME
  });

  const setData = <T extends keyof SystemData>(
    key: T,
    value: SystemData[T]
  ) => {
    data[key] = value;
  };

  const toggleImportedFlag = (to: boolean) => {
    data.fileImported = to;
  };

  return {
    data,
    setData,
    toggleImportedFlag
  };
});
