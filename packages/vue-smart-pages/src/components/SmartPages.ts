import { defineComponent, h, onMounted, watch } from "vue";
import type { VNode } from "vue";
import { injectCSS } from "@renovamen/dynamic-css";
import { breakPage } from "../utils";

export default defineComponent({
  name: "SmartPages",

  props: {
    id: {
      type: String,
      required: true
    },
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
    const id = `vue-smart-pages-${props.id}`;

    const updateCSS = () =>
      injectCSS(
        `#${id} {
          padding: ${props.top}px ${props.right}px ${props.bottom}px ${props.left}px;
          width: ${props.width}mm;
        }`,
        id
      );

    const resolvePages = () => {
      const resolveBreak = () => {
        breakPage(
          id,
          props.height,
          props.top,
          props.bottom,
          props.left,
          props.right
        );
        if (props.afterBreakPage) props.afterBreakPage();
      };

      if (props.beforeBreakPage) {
        // Resolve page break after beforeBreakPage() being excuted
        const fn = props.beforeBreakPage();

        if (fn && typeof fn.then === "function") {
          fn.then(resolveBreak);
          return;
        }
      }

      resolveBreak();
    };

    onMounted(() => {
      // Update styles
      watch(
        () => [props.top, props.bottom, props.left, props.right, props.width],
        () => {
          updateCSS();
          resolvePages();
        }
      );

      watch(() => [props.content, props.height, ...props.watch], resolvePages);

      // Initialize styles
      updateCSS();
      setTimeout(resolvePages, 100);
    });

    return (): VNode =>
      h("div", {
        class: "vue-smart-pages",
        id: id,
        innerHTML: props.content
      });
  }
});
