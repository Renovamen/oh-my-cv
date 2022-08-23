import { defineComponent, h, onMounted, watch } from "vue";
import type { VNode } from "vue";
import { injectCSS } from "dynamic-css";
import { breakPage } from "../utils";

export default defineComponent({
  name: "SmartPages",

  props: {
    content: {
      type: String,
      required: false,
      default: ""
    },
    height: {
      type: Number,
      required: true
    },
    width: {
      type: Number,
      required: true
    },
    top: {
      type: Number,
      required: false,
      default: 0
    },
    bottom: {
      type: Number,
      required: false,
      default: 0
    },
    left: {
      type: Number,
      required: false,
      default: 0
    },
    right: {
      type: Number,
      required: false,
      default: 0
    },
    watch: {
      type: Array,
      required: false,
      default: () => []
    },
    watchDelay: {
      type: Array,
      required: false,
      default: () => []
    },
    beforeBreakPage: {
      type: Function,
      required: false,
      default: () => undefined
    },
    afterBreakPage: {
      type: Function,
      required: false,
      default: () => undefined
    }
  },

  setup(props) {
    const resolvePages = () => {
      breakPage(props.height, props.top, props.bottom, props.left, props.right);
      if (props.afterBreakPage) props.afterBreakPage();
    };

    const updateCSS = () =>
      injectCSS(
        `.vue-smart-pages {
          padding: ${props.top}px ${props.right}px ${props.bottom}px ${props.left}px;
          width: ${props.width}mm;
        }`,
        "vue-smart-pages"
      );

    onMounted(() =>
      watch(
        () => [
          props.content,
          props.height,
          props.width,
          props.top,
          props.bottom,
          props.left,
          props.right,
          ...props.watch
        ],
        () => {
          if (props.beforeBreakPage) {
            // Resolve page break after beforeBreakPage() being excuted
            const fn = props.beforeBreakPage();

            if (fn && typeof fn.then === "function") {
              fn.then(resolvePages);
              return;
            }
          }

          resolvePages();
        }
      )
    );

    // Handle font update or something
    onMounted(() =>
      watch(
        () => props.watchDelay,
        () => {
          if (props.beforeBreakPage) {
            const fn = props.beforeBreakPage();

            if (fn && typeof fn.then === "function") {
              fn.then(() => setTimeout(resolvePages, 50));
              return;
            }
          }

          setTimeout(resolvePages, 50);
        }
      )
    );

    // Initialize styles
    onMounted(updateCSS);

    watch(
      () => [props.top, props.bottom, props.left, props.right, props.width],
      updateCSS
    );

    return (): VNode =>
      h("div", {
        class: "vue-smart-pages",
        innerHTML: props.content
      });
  }
});
