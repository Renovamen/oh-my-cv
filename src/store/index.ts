import { createStore } from "vuex";

import styles from "./modules/styles";
import data from "./modules/data";
import ui from "./modules/ui";

const store = createStore({
  modules: {
    styles,
    data,
    ui
  }
});

export default store;
export * from "./utils";
