import { createRouter, createWebHistory } from "vue-router";
import routes from "~pages";
import type { UserModule } from "~/types";

export const install: UserModule = (app) => {
  const router = createRouter({
    history: createWebHistory(),
    routes
  });

  app.use(router);
};
