import fs from "node:fs/promises";
import path from "node:path";
const landmarks = {
  "hoan-kiem": "Hoan Kiem Lake Hanoi",
  literature: "Temple of Literature Hanoi",
  citadel: "Imperial Citadel of Thang Long",
  pagoda: "One Pillar Pagoda Hanoi",
  mausoleum: "Ho Chi Minh Mausoleum Hanoi",
  "old-quarter": "Hanoi Old Quarter",
  "tran-quoc": "Tran Quoc Pagoda Hanoi",
  opera: "Hanoi Opera House",
  cathedral: "St Joseph Cathedral Hanoi",
};
const out = path.resolve("public/assets/images/landmarks");
await fs.mkdir(out, { recursive: true });
const headers = {
  "User-Agent": "HanoiHeritageAudioGuide/1.0 (educational project)",
};
for (const [id, term] of Object.entries(landmarks)) {
  try {
    const api = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(term)}&gsrnamespace=6&gsrlimit=1&prop=imageinfo&iiprop=url|mime|size&iiurlwidth=2200&format=json&origin=*`;
    const data = await (await fetch(api, { headers })).json();
    const page = Object.values(data.query?.pages || {})[0];
    const info = page?.imageinfo?.[0];
    if (!info?.thumburl) throw new Error("No Wikimedia result");
    const res = await fetch(info.thumburl, { headers });
    const type = res.headers.get("content-type") || "";
    const bytes = Buffer.from(await res.arrayBuffer());
    if (!type.startsWith("image/") || bytes.length < 10000)
      throw new Error(`Invalid image ${type} ${bytes.length}`);
    const ext = type.includes("png")
      ? "png"
      : type.includes("webp")
        ? "webp"
        : "jpg";
    await fs.writeFile(path.join(out, `${id}.${ext}`), bytes);
    await fs.writeFile(
      path.join(out, `${id}.json`),
      JSON.stringify({
        source: info.descriptionurl || page.fullurl,
        contentType: type,
        size: bytes.length,
      }),
    );
    console.log(`${id}: ${bytes.length} bytes (${type})`);
  } catch (e) {
    console.error(`${id}: ${e.message}`);
    process.exitCode = 1;
  }
}
