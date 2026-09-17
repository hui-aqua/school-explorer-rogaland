# Rogaland School Explorer

## Purpose

This project brings together 103 grunnskoler in Sola, Stavanger and Sandnes. One shared filter state controls both the coordinate map and the comparison table. The supplied workbook is the data baseline; coordinates and addresses come from each school’s cited Skoleoversikten page. The default map set is the 22 rows saved as visible in the supplied workbook.

Use the explorer to narrow a candidate list, identify missing evidence and prepare questions for school visits. It is not an official school ranking.

## Use the explorer

1. Open `dist/index.html` in a current Chrome, Edge or Firefox browser.
2. The built-in dataset loads all 103 schools. `Show on map = TRUE` initially selects 22.
3. Filter by municipality, ownership, grade span, test year, minimum reading/maths/English, minimum well-being, maximum bullying and maximum pupils per teacher.
4. Select a marker or table row to inspect the address and cited school page.
5. “Export current results as CSV” exports the same schools visible in both map and table.

The map plots real latitude and longitude but does not load online tiles. It therefore works offline. The cited school page can be opened when online for full geographic context.

## Excel integration

A web page cannot continuously observe filters in a separate open Excel window. Use this save-and-import workflow:

1. Filter the `All schools` sheet in Excel.
2. Save the workbook so filtered-out rows are stored as hidden rows.
3. Select “Import XLSX” in the explorer.
4. Set “Map selection” to “Saved visible Excel rows”.

For a more explicit and auditable selection, set `Show on map` to `TRUE` or `FALSE`, save and import, then choose `Show on map = TRUE`. This survives changes to the Excel filter itself and is better for sharing a shortlist.

Import happens entirely in the browser; the workbook is not uploaded. When the original workbook is imported, organisation numbers are used to enrich it with the built-in coordinates. The map-ready workbook also carries coordinates and addresses directly.

## Years, missing data and comparability

- Compare national-test scores only within the same test grade and school year.
- Well-being and bullying describe a specified survey grade, not the entire school.
- A bullying year must be selected before a maximum threshold can be entered. This prevents direct comparison of different years.
- Blank cells and “—” mean unavailable, privacy-suppressed or missing, never zero.
- Missing values are excluded when a threshold is active unless “Keep missing values” is selected. Keeping them does not mean they meet the threshold.
- Pupils per teacher is teacher density in ordinary teaching, not average class size.
- Private, international-language, special and differently structured schools require separate interpretation.

## Update the data

Python 3 and `openpyxl` are required:

```powershell
python scripts/fetch_locations.py
python scripts/build_data.py
node --test tests/filter-core.test.mjs
python -m unittest tests/test_data.py
```

`fetch_locations.py` reads each cited school URL and extracts the coordinates and address from the OpenStreetMap link. `build_data.py` regenerates the map-ready workbook, normalized JSON/CSV, published-history CSV, browser data and downloadable copies.

When indicators change, update the source workbook under `data/original/` using the same columns before running the scripts. Do not silently mix older subject values into a newer current row.

## GitHub Pages

The repository includes `.github/workflows/pages.yml`. In **Settings → Pages**, select **GitHub Actions** as the source. Pushes to `main` then publish `dist/`, normally at:

`https://hui-aqua.github.io/school-explorer-rogaland/`

See [`REFERENCES.md`](../REFERENCES.md) for sources and limitations.
