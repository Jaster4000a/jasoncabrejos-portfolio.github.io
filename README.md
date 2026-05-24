# Portfolio Website - Local Setup

## Quick Start

### Option 1: Using Node.js (Recommended)

1. **Install Node.js** (if not already installed)
   - Download from: https://nodejs.org/
   - Choose the LTS version

2. **Start the server**
   - Open PowerShell or Command Prompt in this folder
   - Run: `npm start`
   - You'll see: `✨ Portfolio website running at http://localhost:3000`

3. **Open in browser**
   - Navigate to: `http://localhost:3000`

4. **Stop the server**
   - Press `Ctrl+C` in the terminal

---

### Option 2: Using Python (If you have Python installed)

If you have Python 3.x:
```bash
python -m http.server 8000
```

Then open: `http://localhost:8000/index.html`

---

## Troubleshooting

**Port 3000 already in use?**
- Edit `server.js` line 6 and change `const PORT = 3000;` to another port (e.g., 3001, 8080)

**Files not loading?**
- Make sure you're in the correct folder
- Try clearing your browser cache (Ctrl+Shift+Delete)
- Check browser console for errors (F12)

---

## Testing

The project uses [Playwright](https://playwright.dev/) for end-to-end browser tests. The dev server starts automatically when you run tests.

**Prerequisites:** install Playwright's browser binaries once:
```powershell
npx playwright install chromium
```

**Run all tests (headless):**
```powershell
npm test
```

**Run with the interactive UI:**
```powershell
npm run test:ui
```

### Test suites

| File | What it covers |
|---|---|
| `tests/navigation.spec.js` | Nav buttons render the correct page heading; active class; page switch clears expanded tile |
| `tests/projects.spec.js` | Tile expand/collapse; only one tile open at a time; blurb/tags visibility; footer CTA labels |
| `tests/resume.spec.js` | Résumé modal open/close (button, × button, backdrop click); PDF iframe src |
| `tests/slideshow.spec.js` | Next/prev advance the counter; dot jumps to correct slide; auto-advance after 5 s |
| `tests/assets.spec.js` | No broken images on Home or Projects page; LinkedIn link href/target/rel |

Tests run against `http://localhost:3000` (Chromium only). The `playwright.config.js` at the project root controls the timeout (15 s per test) and web-server settings.

---

## Project Structure

- `index.html` - Main entry point
- `direction.jsx` - Main React component
- `base.css` - Base styles
- `styles.css` - Component-specific styles
- `data.jsx` - Portfolio data
- `tweaks-panel.jsx` - Settings panel component
- `uploads/` - Images and media files
