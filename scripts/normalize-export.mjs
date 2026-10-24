import { readdir, copyFile } from "node:fs/promises";
import { resolve, relative, sep } from "node:path";

// Some Windows Next exports retain filesystem separators inside segment names.
// The browser requests those RSC segment assets using dot-separated names.
const root = resolve("out");
async function visit(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = resolve(directory, entry.name);
    if (entry.isDirectory()) await visit(file);
    else if (entry.name.endsWith(".txt")) {
      const parts = relative(root, file).split(sep);
      const segment = parts.findIndex((part) => part.startsWith("__next."));
      if (segment >= 0 && segment < parts.length - 1) {
        const target = resolve(root, ...parts.slice(0, segment), parts.slice(segment).join("."));
        await copyFile(file, target);
      }
    }
  }
}
await visit(root);
