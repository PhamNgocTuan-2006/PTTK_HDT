import assert from "node:assert/strict";
import { sites, t, languages } from "./src/core/data/hanoiHeritageSites.js";
assert.equal(sites.length, 9);
assert.deepEqual(languages, ["vi", "en", "fr", "ja", "ko", "zh"]);
for (const site of sites) {
  assert.ok(site.coordinates.length === 2);
  for (const lang of languages)
    assert.ok(site.name[lang] && site.description[lang]);
}
for (const lang of languages)
  assert.ok(
    t[lang]?.explore && t[lang]?.map && t[lang]?.favorites && t[lang]?.about,
  );
console.log(
  "Data tests passed: 9 sites, 6 languages, complete navigation translations.",
);
