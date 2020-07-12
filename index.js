// a regex for matching srcset segments
const SRCSEG = /(\S*[^,\s])(\s+([\d.]+)(x|w))?/g;

const MODS = { w: "width", x: "density" };

/*
 * Parses an srcset string and returns an array of objects
 * @param {string} an srcset string
 * @returns {ImageCandidate[]}
 */
const parse = srcset =>
  // `String.prototype.matchAll` returns an iterable of matches.
  // Supported by all non-obsolete platforms: Node >= 12, not IE11
  // (core-js provides a polyfill for IE11)
  [...srcset.matchAll(SRCSEG)].map(([, url, , value, modifier]) => {
    let modKey = MODS[modifier];

    // descriptor is optional
    return modKey ? { url, [modKey]: parseFloat(value) } : { url };
  });

export default parse;
