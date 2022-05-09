import store from "~/store";
import type { UserModule } from "~/types";

export const install: UserModule = (app) => {
  app.use(store);
};
