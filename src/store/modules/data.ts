import type { SystemData } from "../../types";

const state = {
  mdContent: ""
} as SystemData;

const mutations = {
  __set<T extends keyof SystemData>(
    state: SystemData,
    msg: { key: T; val: SystemData[T] }
  ): void {
    state[msg.key] = msg.val;
  }
};

export default {
  namespaced: true,
  state,
  mutations
};
