import { defineStore } from "pinia";
import type { SystemData } from "~/types";

export const useDataStore = defineStore("data", () => {
  const data = reactive<SystemData>({
    mdContent: "",
    fileImported: false
  });

  const setData = <T extends keyof SystemData>(
    key: T,
    value: SystemData[T]
  ) => {
    data[key] = value;
  };

  return {
    data,
    setData
  };
});
