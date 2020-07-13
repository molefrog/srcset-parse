# srcset-parse

An extra small [`srcset`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-srcset)
attribute parser compliant with [the latest spec](https://html.spec.whatwg.org/multipage/images.html#srcset-attributes).
Unlike [**srcset** package](https://github.com/sindresorhus/srcset), supports:

- URLs that contain commas;
- Zero or one descriptors per image definitions (like `2x` or `100w`, but not both!).

Example usage:

```js
import parse from "srcset-parse";

/**
 * [
 *   { url: "hifi-cat.jpeg",  density: 3 },
 *   { url: "lowfi-cat.jpeg", width: 128 },
 * ]
 */
parse("hifi-cat.jpeg 3x, lowfi-cat.jpeg 128w");
```

### Using with TypeScript

The library is written in TypeScript, so you can import types if needed:

```js
import parse, { ImageCandidate } from "srcset-parse";

const result: ImageCandidate[] = parse("icon@2x.png 2x, icon.png 1x");
```

### Platform support

This library is written according to the _ES2015 standard_. Make sure your platform
supports it, or your project is configured to transpile external modules.
