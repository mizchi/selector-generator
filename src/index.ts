import { InjectedScript } from "../playwright-src/packages/playwright-core/src/server/injected/injectedScript";
import { asLocator } from "./locatorFactory";

export type Language = "javascript" | "jsonl";
export type SelectorEngine = {
  /**
   * Returns the first element matching given selector in the root's subtree.
   */
  query(root: HTMLElement, selector: string): HTMLElement | null;
  /**
   * Returns all elements matching given selector in the root's subtree.
   */
  queryAll(root: HTMLElement, selector: string): HTMLElement[];
};

export type GenerateSelectorOptions = {
  testIdAttributeName: string;
  omitInternalEngines?: boolean;
  root?: Element | Document;
  forTextExpect?: boolean;
  multiple?: boolean;
};

type SelectorResult = {
  selector: string;
  selectors: string[];
  elements: Element[];
};

export function createSelectorGenerator(
  self: Window & typeof globalThis,
  isUnderTest: boolean = false,
  sdkLanguage: Language = "javascript",
  testIdAttributeNameForStrictErrorAndConsoleCodegen: string = "data",
  stableRafCount: number = 0,
  browserName: string = "Chrome",
  customEngines: {
    name: string;
    engine: SelectorEngine;
  }[] = []
) {
  const injector = new InjectedScript(
    self,
    isUnderTest,
    // @ts-ignore
    sdkLanguage,
    testIdAttributeNameForStrictErrorAndConsoleCodegen,
    stableRafCount,
    browserName,
    customEngines
  );
  return (
    element: Element,
    opts: GenerateSelectorOptions = {
      testIdAttributeName: "data-testid",
    }
  ): SelectorResult => {
    return injector.generateSelector(element, opts);
  };
}

export function toLocator(
  selector: string,
  lang: Language = "javascript"
): string {
  return asLocator(lang, selector);
}

export const PLAYWRIGHT_VERSION = import.meta.env.PLAYWRIGHT_VERSION;
export const PLAYWRIGHT_HASH = import.meta.env.PLAYWRIGHT_HASH;
