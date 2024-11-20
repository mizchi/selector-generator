import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import esbuild from "esbuild";
// @ts-ignore
import InlineCSSPlugin from "esbuild-plugin-inline-css";
import { $ } from "zx";

$.verbose = true;

const rootdir = process.cwd();

await $`mkdir -p playwright-src`;
const isCloned = fs.existsSync(path.join(rootdir, "playwright-src/.git"));
if (isCloned) {
  await $`git -C playwright-src pull`;
} else {
  await $`git clone https://github.com/microsoft/playwright.git playwright-src --depth=1 --branch=main --single-branch`;
}

$.verbose = false;
try {
  await $` pnpm tsc -p tsconfig.types.json`;
} catch (error) {
  // @ts-ignore
  if (error.stdout?.includes("error TS")) {
    console.log("Ignore typegen error");
  } else {
    throw error;
  }
} finally {
  $.verbose = true;
}

const pkg = JSON.parse(
  fs.readFileSync(path.join(rootdir, "playwright-src/package.json"), "utf-8")
);
const version = pkg.version;
const hash = (await $`git -C playwright-src/ rev-parse HEAD`).stdout.trim();
console.log("Version:", version);
console.log("Hash:", hash);

await esbuild.build({
  bundle: true,
  outdir: "dist",
  format: "esm",
  target: "es2022",
  sourcemap: true,
  define: {
    "import.meta.env.PLAYWRIGHT_VERSION": JSON.stringify(version),
    "import.meta.env.PLAYWRIGHT_HASH": JSON.stringify(hash),
  },
  entryPoints: ["./src/index.ts"],
  plugins: [InlineCSSPlugin()],
});

console.log("Generate", "dist/index.js", "types/index.d.ts");

{
  // rewrite package.json
  const pkg = JSON.parse(fs.readFileSync("package.json", "utf-8"));
  pkg.version = version;
  fs.writeFileSync("package.json", JSON.stringify(pkg, null, 2));
}
