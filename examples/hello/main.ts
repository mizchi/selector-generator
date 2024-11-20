import { createSelectorGenerator, toLocator } from "@mizchi/selector-generator";

const generateSelector = createSelectorGenerator(window);

window.addEventListener("click", (e) => {
  const found = generateSelector(e.target as Element);
  const locator = toLocator(found.selector, "javascript");
  console.log(`page.${locator}`);
});
