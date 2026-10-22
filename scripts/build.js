// Packages the static site into _site/ for GitHub Pages.
// Stamps the short commit SHA into the page so each deploy is traceable.
const fs = require("fs");
const path = require("path");

const SRC = path.join(__dirname, "..", "site");
const OUT = path.join(__dirname, "..", "_site");

fs.rmSync(OUT, { recursive: true, force: true });
fs.cpSync(SRC, OUT, { recursive: true });

const sha = (process.env.GITHUB_SHA || "local").slice(0, 7);
const indexPath = path.join(OUT, "index.html");
const html = fs.readFileSync(indexPath, "utf8").replace("build: local", `build: ${sha}`);
fs.writeFileSync(indexPath, html);

console.log(`Packaged site into _site/ (build ${sha})`);
