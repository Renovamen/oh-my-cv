/* eslint-disable */

declare interface Window {
  // extend the window
  monaco: typeof m | undefined
  MonacoEnvironment: Environment
}

declare module "*.vue" {
  import { type DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
