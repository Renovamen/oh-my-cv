import { defineStore } from "pinia";
import type { ToastFlagData } from "~/types";

export const useToastStore = defineStore("toast", () => {
  const toastFlag = reactive<ToastFlagData>({
    save: false,
    delete: false,
    switch: false,
    new: false,
    duplicate: false,
    correct: false,
    import: false
  });

  const setToastFlag = <T extends keyof ToastFlagData>(
    key: T,
    value: ToastFlagData[T]
  ) => {
    toastFlag[key] = value;
  };

  const closeToastFlag = <T extends keyof ToastFlagData>(key: T) => {
    setToastFlag(key, false);
  };

  return {
    toastFlag,
    setToastFlag,
    closeToastFlag
  };
});
