# Data sources and interpretation notes

Snapshot compiled on **16 September 2026**.

## Row-level provenance

Every current school record has a `sourceUrl` pointing to its own Skoleoversikten page. The same URLs are stored in:

- `All schools` → `Source URL` in both workbooks;
- `data/schools.json` and `data/schools.csv`;
- `data/published-history.csv` for every historical observation.

Coordinates and addresses are extracted from the OpenStreetMap links displayed on those cited school pages. They are used only to position markers.

## Registry scope

- Sola: https://skoleoversikten.no/skoler/kommune/rogaland/sola
- Stavanger: https://skoleoversikten.no/skoler/kommune/rogaland/stavanger
- Sandnes: https://skoleoversikten.no/skoler/kommune/rogaland/sandnes
- Rogaland county overview: https://skoleoversikten.no/skoler/fylke/rogaland

The workbook contains 10 Sola, 56 Stavanger and 37 Sandnes entries classified as `grunnskole` in those municipality registries. This includes public and private schools, primary/lower-secondary combinations and special schools. International School of Stavanger is registered in another category and is not part of the 103-row master count.

## Definitions and upstream sources

- Skoleoversikten method and source description: https://skoleoversikten.no/om
- Plain-language indicator explanations: https://skoleoversikten.no/forklart
- Udir grunnskole statistics hub: https://www.udir.no/tall-og-forskning/statistikk/statistikk-grunnskole/
- Udir public data and API overview: https://www.udir.no/om-udir/data/
- Udir public Elevundersøkelsen results: https://www.udir.no/tall-og-forskning/brukerundersokelser/elevundersokelsen/resultater/offentlige-resultater-grunnskole/
- Udir explanation of school-contribution indicators: https://www.udir.no/tall-og-forskning/statistikk/statistikk-grunnskole/analyser/skolebidragsindikatorer-for-grunnskolen/hva-er-skolebidragsindikatorer-for-grunnskolen/
- Udir privacy/mobbing guidance retained in the supplied workbook: https://www.udir.no/tall-og-forskning/statistikk/statistikk-grunnskole/elevundersokelsen-mobbing-5-til-10-trinn-sporsmal/

Skoleoversikten states that its upstream sources include Utdanningsdirektoratet, SSB, FHI, Kartverket, Brønnøysundregistrene and Wikidata. This repository preserves the compiled snapshot and its citations; it does not claim independent reconciliation of every value against Udir.

## Software reference

XLSX files are read in the browser with vendored SheetJS Community Edition 0.20.3:

- Official standalone installation and vendoring: https://docs.sheetjs.com/docs/getting-started/installation/standalone/
- Hidden-row metadata and `cellStyles: true`: https://docs.sheetjs.com/docs/csf/features/rowprops/

The vendor license is stored at `dist/vendor/SHEETJS-LICENSE.txt`.

## Interpretation limits

1. Missing and privacy-suppressed observations are unknown, never zero.
2. Test scores should be compared only within the same subject, grade and school year.
3. Survey figures describe the selected grade and participating pupils, not the whole school.
4. Bullying figures from different years are not directly ranked by the interface.
5. Published test uncertainty is retained. Small score differences may not be meaningful.
6. Pupils per teacher is not class size.
7. Raw results reflect pupil intake as well as schooling. The project deliberately does not calculate an overall school ranking.
