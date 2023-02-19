import { defineComponent, h, onMounted, watch } from "vue";
import type { VNode } from "vue";
import { debounce } from "ts-debounce";
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

  setup(props, { expose }) {
    const id = `vue-smart-pages-${props.id}`;

    const updateCSS = () =>
      injectCSS(
        `#${id} {
          padding: ${props.top}px ${props.right}px ${props.bottom}px ${props.left}px;
          width: ${props.width}mm;
        }`,
        id
      );

    const resolvePages = (delay?: number) => {
      updateCSS();

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
          if (delay) fn.then(() => setTimeout(resolveBreak, delay));
          else fn.then(resolveBreak);
          return;
        }
      }

      if (delay) setTimeout(resolveBreak, delay);
      else resolveBreak();
    };

    onMounted(() => {
      // Update styles
      watch(
        () => [
          props.top,
          props.bottom,
          props.left,
          props.right,
          props.width,
          props.content,
          props.height,
          ...props.watch
        ],
        () => debounce(resolvePages, 200)()
      );

      // Font update or something
      watch(
        () => props.watchDelay,
        () => debounce(() => resolvePages(100), 200)()
      );

      // Initialize styles
      updateCSS();
    });

    expose({
      resolvePages
    });

    return (): VNode =>
      h("div", {
        class: "vue-smart-pages",
        id: id,
        innerHTML: props.content
      });
  }
});
