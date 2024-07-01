import { onMounted } from "vue";
import {
  unrefElement,
  toValue,
  watchThrottled,
  type WatchThrottledOptions,
  type MaybeComputedElementRef
} from "@vueuse/core";
import type { MaybeRef } from "@vueuse/shared";
import { breakPage, setWidthAndMargins } from "./dom";
import type { PageSize, PageMargins } from "./types";

/**
 * Break the content into pages based on the given size and margins.
 *
 * @param target HTML element
 * @param html Content that will be rendered as innerHTML of the target element
 * @param size Size and margins of each page
 * @param options
 *
 * @returns A render function to manually trigger the page breaking
 *
 * @example
 * ```vue
 * <template>
 *  <div ref="target" />
 * </template>
 *
 * <script setup>
 * import { ref } from "vue";
 * import { useSmartPages } from "vue-smart-pages";
 *
 * const target = ref();
 *
 * const { render } = useSmartPages(target, "<p>Content</p>", { width: 210, height: 297 }, { top: 10, bottom: 10, left: 10, right: 10 });
 * </script>
 * ```
 */
export const useSmartPages = (
  target: MaybeComputedElementRef,
  html: MaybeRef<string>,
  size: MaybeRef<PageSize>,
  margins: MaybeRef<PageMargins> = {},
  options: {
    beforeRender?: () => void | Promise<void>;
    afterRender?: () => void | Promise<void>;
    watchThrottledOptions?: WatchThrottledOptions<Readonly<boolean>>;
  } = {}
) => {
  const render = async () => {
    const element = unrefElement(target) as HTMLElement | undefined | null;
    if (!element) return;

    const { width, height } = toValue(size);
    const { top = 0, bottom = 0, left = 0, right = 0 } = toValue(margins);

    const _size = { width, height };
    const _margins = { top, bottom, left, right };

    // To calculate the correct child heights for breaking the page, we first apply the content,
    // size, and margins to a clone of the element, instead of the original element.
    // This is to avoid flickering when the original element is modified.
    const copy = element.cloneNode(true) as HTMLElement;

    copy.innerHTML = toValue(html);
    setWidthAndMargins(copy, _size, _margins);

    // Attach it to the body temporarily to get the correct computed styles
    document.body.appendChild(copy);

    if (options.beforeRender) await options.beforeRender();

    // Break the page based on the given size and margins
    breakPage(copy, _size, _margins);

    // Replace the original element with the modified copy
    element.innerHTML = copy.innerHTML;

    // Remove the copy from the body
    document.body.removeChild(copy);

    if (options.afterRender) await options.afterRender();
  };

  onMounted(render);
  watchThrottled([size, margins, html], render, options.watchThrottledOptions);

  return { render };
};
