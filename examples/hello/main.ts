import { createSelectorGenerator, toLocator } from "@mizchi/selector-generator";

const generateSelector = createSelectorGenerator(window);

window.addEventListener("click", (e) => {
  // Only with alt key
  if (e.altKey) {
    e.preventDefault();
    const found = generateSelector(e.target as Element);
    const locator = toLocator(found.selector, "javascript");
    console.info(`page.${locator}`);
  }
});
