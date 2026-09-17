# Rogaland School Explorer

An offline-first school data explorer for **103 schools in Sola, Stavanger and Sandnes**. The map and comparison table share one filter state, and the browser can import a saved Excel workbook without uploading it to a server.

**Languages:** [中文](docs/README.zh-CN.md) · [English](docs/README.en.md) · [Norsk](docs/README.nb-NO.md)

## Open the explorer

Open [`dist/index.html`](dist/index.html) in a current version of Chrome, Edge or Firefox. No build step or web server is required. The coordinate map and the vendored XLSX reader work offline.

The built-in dataset contains all 103 schools. The default `Show on map = TRUE` selection contains the 22 rows that were visible in the supplied workbook.

## Repository structure

- `dist/` — interactive trilingual site, offline map and downloadable workbooks
- `data/original/` — supplied source workbook, unchanged
- `data/Sola_Stavanger_Sandnes_schools_map_ready.xlsx` — map-ready workbook with coordinates and `Show on map`
- `data/schools.json`, `data/schools.csv` — normalized current snapshot
- `data/published-history.csv` — long-form published history
- `legacy/school-map.html` — supplied standalone 22-school map, preserved as reference
- `scripts/` — repeatable location and data-build scripts
- `tests/` — filter and data-integrity tests
- [`REFERENCES.md`](REFERENCES.md) — sources, provenance and interpretation limits

## Quick verification

```powershell
node --test tests/filter-core.test.mjs
python -m unittest tests/test_data.py
```

Code is licensed under MIT. Data remains subject to the terms of its cited public sources; see `REFERENCES.md`.
