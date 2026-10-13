# Verification / בדיקת גרסת 3.0

Verified October 13, 2026 using automated Chromium interaction with a fully bundled HTML document, with external image/font requests intentionally blocked during the test. This verifies the UI independently of the unresolved image-hosting issue; it is **not** a live GitHub Pages deployment test.

- **24 albums / 2,700 image records**. SHA-256 checks confirm that every source `album_*.json` matches the original supplied version.
- All routes rendered (home, archive, research, comparison, album gallery, album analysis, search, about).
- All **19** mode buttons produced an analytical visualization with no JavaScript exceptions; modes 1–15 correspond to the original 15 visual analysis types, 16–19 are additions.
- A cross-corpus manual group can select any of 24 albums; the displayed image count updates.
- Two comparison panels render for modalities, segmentation, uncertainty, fingerprint, network and similarity modes (including independent group controls).
- Deep link to `#/album/AL054?view=gallery&image=15` opened frame 15 of 149. Pressing Next updated URL and frame to 16.
- Image search for `flag` returned matching image records.
- Hebrew/English toggle, year/author/publisher/custom group modes, zero-image album states checked.
- Complete contact-sheet tested on 149-image album; filtering reduced results to 5, clicking a tile opened the exact deep-linked frame.
- Imported an additional JSON album via the file picker during a Chromium test: album was rendered and address changed to `#/album/QA_TEST`, with no JavaScript exceptions.
- Mobile viewport 390px: tested home, archive, research, compare, album, and mobile navigation; no body-wide horizontal overflow or JavaScript errors.
- Browser screenshots tested with all network images blocked to exercise graceful placeholders.

**Not tested:** A real push to the actual GitHub repository/Pages URL, unrestricted external image-host responses, long-duration performance on low-end devices, the `file://` loading mechanism itself (test environment policy blocked direct file navigation, so the same offline HTML was loaded into Chromium as an HTML document). Source-level bundling guarantees the offline version has no local fetch/import requirements.

**Methodological cautions:** Text fields and image annotations are sourced from JSON, not re-derived by image models. Cross-album charts that use a time axis normalize by relative album position; labels/term frequencies are descriptive counts. Original JSON may contain noisy annotation fields.
