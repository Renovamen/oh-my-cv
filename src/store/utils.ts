import store from ".";
import type { ResumeStyles } from "../types";

export const setStyleState = <T extends keyof ResumeStyles>(
  key: T,
  value: ResumeStyles[T]
): void => {
  store.commit({
    type: "__set",
    key: key,
    val: value
  });
};
