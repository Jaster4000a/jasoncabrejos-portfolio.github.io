# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the Project

```powershell
npm start        # Starts Node.js file server at http://localhost:3000
```

Alternatively: `python -m http.server 8000` then open `http://localhost:8000/index.html`.

To change the port, edit `server.js` line 6 (`const PORT = 3000`).

## Architecture

This is a **no-build, CDN-based React portfolio**. There is no bundler, no TypeScript, no transpilation step, and no npm dependencies. React 18 and Babel Standalone are loaded from unpkg CDN with SRI integrity hashes in `index.html`.

JSX files are served as static files and transpiled in-browser by Babel Standalone (via `<script type="text/babel">`). The load order matters and is declared in `index.html`:

1. `tweaks-panel.jsx` — registers globals (`useTweaks`, `TweaksPanel`, `TweakSection`, `TweakSelect`, `TweakToggle`)
2. `data.jsx` — registers `window.PROJECTS`, `window.HEADSHOTS`
3. `direction.jsx` — registers `window.Direction` (the main component)
4. Inline script in `index.html` — mounts `<App>` which wires tweaks + `Direction`

## Key Files

| File | Role |
|---|---|
| `direction.jsx` | Main portfolio component. Implements the 12-column grid layout with pages: Home, Projects, Background, Leadership, Awards. Contains expandable project tiles, image slideshow, and inline resume viewer. |
| `data.jsx` | All portfolio content: `PROJECTS` array (~20+ entries with title, tags, description, award flags), `HEADSHOTS` array for the homepage slideshow. Editing content means editing this file. |
| `tweaks-panel.jsx` | Reusable editor sidebar system. Exports the `useTweaks` hook and panel components. Handles an edit-mode protocol via `postMessage`. |
| `base.css` / `styles.css` | Split stylesheets — `base.css` handles typography/reset, `styles.css` handles component-specific layout. `styles-base.css` is an additional base layer. |
| `uploads/` | Static assets: `LatestResume.pdf`, `PortfolioV4.pdf`, and `featured_homepage_images/` (slideshow images). |

## Tweaks System

The tweaks panel is a live design-editing sidebar. `TWEAK_DEFAULTS` in `index.html` controls initial state:

- `flagStyle` — controls how award-winning projects are visually flagged (`badge`, `corner`, `dot`, `line`)
- `showGrid` — toggles the 12-column underlay overlay

Adding a new tweak requires: adding a default in `TWEAK_DEFAULTS`, adding a `<TweakSection>` + control in the `<TweaksPanel>` in `index.html`, and reading `tweaks.yourKey` in `direction.jsx`.

## Updating Content

- **Add/edit projects:** Modify the `PROJECTS` array in `data.jsx`. Each entry supports `title`, `tags`, `description`, `award` (boolean), `role`, `link`, and image references.
- **Update the slideshow:** Edit the `HEADSHOTS` array in `data.jsx`.
- **Resume/PDF:** Replace files in `uploads/` (keep filenames or update references in `data.jsx`/`direction.jsx`).

## Tests

The project uses **Playwright** for end-to-end browser tests (Chromium only). `playwright.config.js` spins up `node server.js` automatically, so no manual server start is required.

```powershell
npm test          # headless run
npm run test:ui   # interactive Playwright UI
```

Install browser binaries once after cloning:
```powershell
npx playwright install chromium
```

### Test files (`tests/`)

| File | Covers |
|---|---|
| `navigation.spec.js` | Each nav button renders the right heading; active class toggling; page switch resets expanded tile |
| `projects.spec.js` | Tile expand/collapse; single-open invariant; blurb/tags visible when open; footer CTA label |
| `resume.spec.js` | Modal open via Résumé button; close via ×, backdrop click; PDF iframe `src` |
| `slideshow.spec.js` | Next/prev change the counter; dot click jumps to correct slide; 5 s auto-advance |
| `assets.spec.js` | No broken images on Home or Projects page; LinkedIn `href`/`target`/`rel` |

There is no CI/CD pipeline — run tests locally before pushing changes.
