import { createStore } from "vuex";

import styles from "./modules/styles";
import data from "./modules/data";

const store = createStore({
  modules: {
    styles,
    data
  }
});

export default store;
export * from "./utils";
