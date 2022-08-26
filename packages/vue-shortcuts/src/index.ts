import { watch } from "vue";
import { useMagicKeys } from "@vueuse/core";
import { isMac } from "@renovamen/utils";

export const useShortcuts = (keys: string, cb: () => void) => {
  const newKeys = keys.replace("ctrl", isMac ? "meta" : "ctrl");

  const magic = useMagicKeys({
    passive: false,
    onEventFired: (e) => {
      if (e.type !== "keydown") return;

      let flag = true;

      for (const item of newKeys.split("+")) {
        switch (item) {
          case "ctrl":
            if (!e.ctrlKey) flag = false;
            break;
          case "meta":
            if (!e.metaKey) flag = false;
            break;
          case "shift":
            if (!e.shiftKey) flag = false;
            break;
          default:
            if (e.key !== item) flag = false;
        }
      }

      if (flag) e.preventDefault();
    }
  });

  const shortcuts = magic[newKeys];
  const { current } = magic;

  watch(shortcuts, (v) => {
    if (v && current.size === newKeys.split("+").length) cb();
  });
};

export default useShortcuts;
