import store from ".";
import type { StoreStates } from "~/types";

type ModuleNameType = "styles" | "data" | "ui";

export const setStoreState = <T extends keyof StoreStates>(
  module: ModuleNameType,
  key: T,
  value: StoreStates[T]
): void => {
  store.commit({
    type: module + "/__set",
    key: key,
    val: value
  });
};
