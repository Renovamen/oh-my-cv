import { defineStore } from "pinia";
import type { ToastFlagData } from "~/types";

export const useToastStore = defineStore("toast", () => {
  const toastFlag = reactive<ToastFlagData>({
    save: false,
    delete: false,
    switch: false,
    new: false
  });

  const setToastFlag = <T extends keyof ToastFlagData>(
    key: T,
    value: ToastFlagData[T]
  ) => {
    toastFlag[key] = value;
  };

  const openToastFlag = <T extends keyof ToastFlagData>(key: T) => {
    setToastFlag(key, true);
  };

  const closeToastFlag = <T extends keyof ToastFlagData>(key: T) => {
    setToastFlag(key, false);
  };

  return {
    toastFlag,
    openToastFlag,
    closeToastFlag
  };
});
