import type { ResumeStyles } from "~/types";

const state = {
  marginV: 45,
  marginH: 45,
  lineHeight: 130,
  paragraphSpace: 5,
  themeColor: "#377bb5",
  fontCN: {
    name: "思源黑体",
    fontFamily: "Noto Sans SC"
  },
  fontEN: {
    name: "CMU Sans Serif"
  },
  fontSize: 15
} as ResumeStyles;

const mutations = {
  __set<T extends keyof ResumeStyles>(
    state: ResumeStyles,
    msg: { key: T; val: ResumeStyles[T] }
  ): void {
    state[msg.key] = msg.val;
  }
};

export default {
  namespaced: true,
  state,
  mutations
};
