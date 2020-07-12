// tests/demo.js
import "core-js/proposals/string-match-all";
import parse from "./index";

import { test } from "uvu";
import * as assert from "uvu/assert";

test("parses srcset strings", () => {
  const srcset = "cat-@2x.jpeg 2x, dog.jpeg 100w";

  assert.equal(parse(srcset), [
    { url: "cat-@2x.jpeg", density: 2 },
    { url: "dog.jpeg", width: 100 }
  ]);
});

test("ingores extra whitespaces", () => {
  const srcset = `
    foo-bar.png     2x ,
    bar-baz.png  100w`;

  assert.equal(parse(srcset), [
    { url: "foo-bar.png", density: 2 },
    { url: "bar-baz.png", width: 100 }
  ]);
});

test("properly parses float descriptors", () => {
  const srcset = "cat.jpeg 2.4x, dog.jpeg 1.5x";

  assert.equal(parse(srcset), [
    { url: "cat.jpeg", density: 2.4 },
    { url: "dog.jpeg", density: 1.5 }
  ]);
});

test("supports URLs that contain comma", () => {
  const srcset = `
      https://foo.bar/w=100,h=200/dog.png  100w,
      https://baz.bar/cat.png?meow=yes     1024w
    `;

  assert.equal(parse(srcset), [
    { url: "https://foo.bar/w=100,h=200/dog.png", width: 100 },
    { url: "https://baz.bar/cat.png?meow=yes", width: 1024 }
  ]);
});

test("supports single URLs", () => {
  const srcset = "/cat.jpg";
  assert.equal(parse(srcset), [{ url: "/cat.jpg" }]);
});

test("supports optional descriptors", () => {
  const srcset = "/cat.jpg, /dog.png 3x , /lol ";
  assert.equal(parse(srcset), [
    { url: "/cat.jpg" },
    { url: "/dog.png", density: 3 },
    { url: "/lol" }
  ]);
});

test.run();
