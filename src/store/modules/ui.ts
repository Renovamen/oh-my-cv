import * as monaco from "monaco-editor";
import type { UIData } from "~/types";

const state = {
  previewScale: 1,
  previewBottom: 0,
  dark: false
} as UIData;

const mutations = {
  __set<T extends keyof UIData>(
    state: UIData,
    msg: { key: T; val: UIData[T] }
  ): void {
    state[msg.key] = msg.val;
  },
  setDark(state: UIData, val: boolean): void {
    state["dark"] = val;

    if (val) {
      document.documentElement.classList.add("dark");
      monaco.editor.setTheme("vs-dark");
    } else {
      document.documentElement.classList.remove("dark");
      monaco.editor.setTheme("vs");
    }
  }
};

export default {
  namespaced: true,
  state,
  mutations
};
