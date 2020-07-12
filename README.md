# srcset-parse

An extra small [`srcset`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-srcset)
attribute parser compliant with the [latest spec](https://html.spec.whatwg.org/multipage/images.html#image-candidate-string). Unlike [**srcset** package](https://github.com/sindresorhus/srcset),
supports:

- URLs that contain commas;
- Zero or one descriptors per image definitions (like `2x` or `100w`, but not both!).

Example usage:

```js
import parse from "srcset-parse";

// [
//   { url: "hifi-cat.jpeg", density: 3 },
//   { url: "lowfi-cat.jpeg", width: 128 },
// ]
parse("hifi-cat.jpeg 3x, lowfi-cat.jpeg 128w");
```

### Platform support

This library uses [`String.prototype.matchAll`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll),
which is **[quite well supported](https://kangax.github.io/compat-table/es2016plus/#test-String.prototype.matchAll)** by all active platforms including Node.js ≥ 12.

If you need to support IE11, you can use the Core-js polyfill:

```js
import "core-js/proposals/string-match-all";
import parse from "srcset-parse";

parse("hifi-cat.jpeg");
```
