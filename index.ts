// a regex for matching srcset segments
const SRCSEG = /(\S*[^,\s])(\s+([\d.]+)(x|w))?/g;

// defines how srcset descriptors translate into human-readable names
const DescriptorNames = { w: "width", x: "density" } as const;

type Descriptor = keyof typeof DescriptorNames;
export type DescriptorName = typeof DescriptorNames[Descriptor];

// an srcset definition consists of image candidates
export type ImageCandidate = { url: string } & {
  [K in DescriptorName]?: number;
};

/*
 * Parses an srcset string and returns an array of objects
 * @param {string} an srcset string
 * @returns {ImageCandidate[]}
 */
const parse = (srcset: string): ImageCandidate[] =>
  // `String.prototype.matchAll` returns an iterable of matches.
  // Supported by all non-obsolete platforms: Node >= 12, not IE11
  // (core-js provides a polyfill for IE11)
  [...srcset.matchAll(SRCSEG)].map(
    ([, url, , value, modifier]): ImageCandidate => {
      let modKey = DescriptorNames[modifier];

      // descriptor is optional
      return modKey ? { url, [modKey]: parseFloat(value) } : { url };
    }
  );

export default parse;
