# Israel Album 3.1 — Image source repair

This is the complete 3.0 site, with all research tools preserved. Version 3.1 restores the original repository-image loading strategy across every image view.

## GitHub Pages
Upload **the contents of this folder** to the root of the `eliezerba/Israel_Album` repository (not a nested folder). Keep the existing `images/` directory in your GitHub repository when committing changes: **do not delete it**. GitHub Pages should publish from `main` / root.

The loader tries, in order:
1. `./images/<image_id>.jpg` from the site itself (as in the original site).
2. `https://raw.githubusercontent.com/eliezerba/Israel_Album/main/images/<image_id>.jpg` (works for direct local viewing / deployments that did not copy the image directory).
3. Direct S3 URL without expired query string.

When one fails, the browser automatically tries the next. Images that do not exist in the source repository may still fail: no actual image binaries have been included or invented. The browser needs network access for fallbacks 2 and 3.

## Local
Double-click `offline.html`, or use `START_HERE_WINDOWS.bat` for the server-based version. Local JPGs can be added to the `images/` folder next to index.html and offline.html; if absent, the public GitHub images are tried automatically.

## Notes
- 24 albums and 2,700 image records unchanged.
- All 19 visual-analysis modes and navigation retained.
- `assets/data.js` contains the candidates; `assets/app.js` advances on image load failure. `build_offline.py` regenerates offline.html.
- Browser end-to-end verification was not possible in this runtime (Chromium binary missing). JS syntax and data checks completed; live image access is dependent on GitHub/public asset availability.
