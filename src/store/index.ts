import { createStore } from "vuex";
import type { ResumeStyles } from "../types";

const store = createStore({
  state: {
    marginV: 25,
    marginH: 30
  },
  mutations: {
    __set(
      state: ResumeStyles,
      msg: { key: keyof ResumeStyles; val: any }
    ): void {
      state[msg.key] = msg.val;
    }
  }
});

export default store;
export * from "./utils";
