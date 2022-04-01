import { createStore } from "vuex";
import type { ResumeStyles } from "../types";

const store = createStore({
  state: {
    marginV: 35,
    marginH: 45,
    themeColor: "#377bb5"
  },
  mutations: {
    __set<T extends keyof ResumeStyles>(
      state: ResumeStyles,
      msg: { key: T; val: ResumeStyles[T] }
    ): void {
      state[msg.key] = msg.val;
    }
  }
});

export default store;
export * from "./utils";
