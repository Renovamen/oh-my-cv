import store from ".";

export const setStyleState = (key: string, value: any): void => {
  store.commit({
    type: "__set",
    key: key,
    val: value
  });
};
