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

// https://wicg.github.io/ua-client-hints/#navigatorua
declare interface NavigatorUA {
  readonly userAgentData?: NavigatorUAData;
}

declare interface Navigator extends NavigatorUA {}
