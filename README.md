# אטלס האלבומים | Album Observatory · 3.0

Version 3 of the album research website. Standalone static ES modules for GitHub Pages, plus a completely bundled `offline.html` that opens by double-clicking. Twenty-four source albums with 2,700 image records are preserved unmodified in `data/`; two albums have no image records.

## Deployment

Upload **the CONTENTS of this directory** (not the enclosing folder) to the `Israel_Album` repository's published root; ensure that the root contains `index.html`, `assets/` and `data/`. GitHub Pages Settings → Pages → branch `main`, root `/`.

Deep links use hash routes and work on GitHub Pages:

- `https://eliezerba.github.io/Israel_Album/#/album/AL054`
- `https://eliezerba.github.io/Israel_Album/#/album/AL054?view=gallery&image=15`
- `https://eliezerba.github.io/Israel_Album/#/album/AL054?view=study&mode=network`
- `https://eliezerba.github.io/Israel_Album/#/research?album=AL054&mode=matrix`

## Local opening

Double-click **`offline.html`** (or `START_HERE_WINDOWS.bat`). This bundles all data and JavaScript and does not depend on a local server, npm packages, a build or a CDN JavaScript runtime. Photos continue to request remote S3 objects as in the previous version. If the external image host does not respond, a graphic placeholder appears: this does not stop the app loading.

For closer GitHub Pages parity, run `python start_local_server.py` or `python -m http.server 8000` from this folder and open `http://localhost:8000/`.

If you modify an `assets/*.js`, `assets/style.css` or source `data/*.json` file, rerun `python build_offline.py` to regenerate `offline.html`.

## Navigation and preserved research functionality

The 15 original analysis modes all run *natively in the new design*, within an individual album, a selected set of albums, or both sides of a comparison. They are: Modalities; Spatial Syntax; Scene Streamgraph; Emotional Barcode; Demographic Stream; Spatial Rhythm; Visual Complexity; Narrative Segmentation; Uncertainty Index; Album Fingerprint; Object Ridgelines; Staging Matrix; Spatial Treemap; Scene–Object Network; Actions Frequency.

Modes **16–19 are new**: Sequence Atlas (a comparative filmstrip for all albums); Transition Grammar; Distinctive Vocabulary vs corpus remainder; Album Similarity (cosine similarity of metadata-tag distributions; **not** image embeddings).

Corpus group controls: full corpus, custom manual multi-selection, a single album, year, author, publisher, or a custom album field. Two groups can be compared across all 19 modes. Exports for group summary are CSV. Each album and each image have a copyable deep URL. The album has both a close-reading light-table viewer and a separate **complete contact sheet** with full-album text filtering. The Collection page supports local **JSON import** of additional albums for the active browser session (not persisted or uploaded to GitHub). Search supports caption, OCR, Scene, Objects, Vibe, Actions and all text, across the full archive.

## Notes and methodological constraints

- New analysis operates on provided extracted text labels. It does *not* perform new image inference or content-based image embedding.
- All 24 source JSON files are retained as they were given. Album ordering is computed dynamically from metadata; images are ordered by `image_num`.
- The original v1 interface remains at `legacy/index.html` as a research and visual reference, but is no longer required to display the 15 original modes.
- The captions contain machine-produced metadata fields. Some records have anomalies in their native descriptions. No inferred dates or invented locations are introduced.
- The look is a deliberately experimental archival "light table": near-black field, neon index ink, kinetic photographic collage, film strips, technical microtype and analytical instruments integrated into the same visual language.

## Research/design references

- Photogrammar: https://photogrammar.org/intro (category and timeline navigation; sequence as research object)
- PixPlot: https://github.com/pleonard212/pix-plot (image corpus overview; **not** used for pixel embeddings here)
- Europeana search API: https://europeana.atlassian.net/wiki/spaces/EF/pages/2385739812 (collection filters and field-sensitive retrieval)
