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
  matchAll(srcset, SRCSEG).map(
    ([, url, , value, modifier]): ImageCandidate => {
      let modKey = DescriptorNames[modifier];

      // descriptor is optional
      return modKey ? { url, [modKey]: parseFloat(value) } : { url };
    }
  );

/*
 * Similar to String.prototype.matchAll, but returns an array
 * rather than the iterable. It also works everywhere, including IE11.
 * (`String.prototype.matchAll` doesn't).
 */
const matchAll = (str: string, regex: RegExp): RegExpExecArray[] => {
  let match = null,
    result = [];

  while ((match = regex.exec(str)) !== null) result.push(match);
  return result;
};

export default parse;
