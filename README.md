# @mizchi/selector-generator

Playwright selector generator extracted from [microsoft/playwright](https://github.com/microsoft/playwright)

```bash
$ npm install @mizchi/selector-generator
```

## Usage

```js
import { createSelectorGenerator, toLocator } from "@mizchi/selector-generator";

const generateSelector = createSelectorGenerator(window);

// call with DOM element
window.addEventListener("click", (e) => {
  const found = generateSelector(e.target as HTMLElement);
  const locator = toLocator(found.selector, "javascript");
  console.log(`page.${locator}`);
  /*
    page.locator('html')
    page.getByText('Click on the links above to')
    page.getByText('xxx')
    page.getByText('bbb')
    page.getByRole('button', { name: 'role-button' })
    page.getByRole('button', { name: '#btn' })
  */
});
```

## LICENSE

```
/**
 * Copyright (c) Kotaro Chikuba<miz404@gmail.com>
 * Copyright (c) Microsoft Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
```