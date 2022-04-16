import type { UIData } from "../../types";

const state = {
  previewScale: 1,
  previewBottom: 0
} as UIData;

const mutations = {
  __set<T extends keyof UIData>(
    state: UIData,
    msg: { key: T; val: UIData[T] }
  ): void {
    state[msg.key] = msg.val;
  }
};

export default {
  namespaced: true,
  state,
  mutations
};
