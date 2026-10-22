# Caption Lab — SCM Activity

**Galvin Venturina · BSCS3A**

A static site (HTML/CSS/JS) hosted on GitHub Pages, published automatically by a GitHub Actions pipeline that lints the JavaScript before anything goes live.

I manage social media for two restaurants, so the site is a tool I'd actually use: **Caption Lab** counts characters, words, and hashtags in a caption and shows how close it is to each platform's limit.

**Live site:** https://YOUR-USERNAME.github.io/galvin-scm-pages/

---

## How the pipeline works

Every push to `main` runs `.github/workflows/deploy.yml`:

| Stage | Job | What happens |
|---|---|---|
| 1 | **Quality check** | `npm ci` then `npm run lint`. ESLint enforces `semi: always`, double quotes, `eqeqeq`, and no unused variables. |
| 2 | **Package** | Runs only if lint passes. `scripts/build.js` copies `site/` into `_site/` and stamps the short commit SHA into the page header. The folder is uploaded as a Pages artifact. |
| 3 | **Publish** | `actions/deploy-pages` deploys the artifact to GitHub Pages. |

Because `build` has `needs: lint` and `deploy` has `needs: build`, a lint error stops the pipeline and the live site stays on the last good version.

## Testing the quality gate

I tested the linter by deleting the semicolon at the end of this line in `site/js/app.js`:

```js
captionInput.addEventListener("input", update)
```

Result: the **Quality check** job failed with `Missing semicolon  semi`, and the Package and Publish jobs were skipped. After I put the semicolon back and pushed again, all three jobs passed and the site redeployed.

| Commit | Lint | Deploy |
|---|---|---|
| `test: remove semicolon to trigger lint failure` | ❌ failed | ⏭ skipped |
| `fix: restore semicolon` | ✅ passed | ✅ deployed |

## Project structure

```
├── .github/workflows/deploy.yml   # CI/CD pipeline
├── site/                          # the static site
│   ├── index.html
│   ├── css/style.css
│   └── js/app.js
├── scripts/build.js               # packaging step
├── eslint.config.js               # lint rules
└── package.json
```

## Run it locally

```bash
npm install
npm run lint     # quality check
npm run build    # packages into _site/
```

Then open `_site/index.html` in a browser.

## Tools used

Built with help from an LLM (Claude) for scaffolding the workflow and lint config; design choices, copy, and testing by me.
