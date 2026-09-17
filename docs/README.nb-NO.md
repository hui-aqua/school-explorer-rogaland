# Skoleutforsker for Rogaland

## Formål

Prosjektet samler 103 grunnskoler i Sola, Stavanger og Sandnes. Ett felles filter styrer både koordinatkartet og sammenligningstabellen. Den mottatte arbeidsboken er datagrunnlaget, mens koordinater og adresser kommer fra den siterte Skoleoversikten-siden for hver skole. Standardutvalget på kartet er de 22 radene som var lagret som synlige i arbeidsboken.

Utforskeren kan brukes til å avgrense aktuelle skoler, finne manglende informasjon og forberede spørsmål til skolebesøk. Den er ikke en offisiell rangering.

## Bruk

1. Åpne `dist/index.html` i en oppdatert versjon av Chrome, Edge eller Firefox.
2. Det innebygde datasettet inneholder alle 103 skolene. `Show on map = TRUE` velger først 22 skoler.
3. Filtrer på kommune, eierform, trinn, prøveår, minste resultat i lesing/regning/engelsk, minste trivsel, høyeste mobbeandel og høyeste antall elever per lærer.
4. Velg en markør eller tabellrad for å se adresse og kildeside.
5. «Eksporter gjeldende resultat som CSV» eksporterer de samme skolene som vises i kart og tabell.

Kartet bruker faktiske bredde- og lengdegrader, men laster ikke nettkart. Det virker derfor frakoblet. Kildesiden kan åpnes på nett for mer geografisk sammenheng.

## Kobling til Excel

En nettside kan ikke følge et filter fortløpende i et annet åpent Excel-vindu. Bruk denne arbeidsflyten:

1. Filtrer arket `All schools` i Excel.
2. Lagre arbeidsboken slik at bortfiltrerte rader lagres som skjulte.
3. Velg «Importer XLSX» i utforskeren.
4. Velg «Lagrede synlige Excel-rader» under «Kartutvalg».

Et tydeligere og mer etterprøvbart alternativ er å sette `Show on map` til `TRUE` eller `FALSE`, lagre og importere, og deretter velge `Show on map = TRUE`. Dette fungerer uavhengig av om Excel-filteret senere endres, og egner seg bedre når en kortliste deles.

Importen skjer bare i nettleseren; arbeidsboken lastes ikke opp. Ved import av originalfilen brukes organisasjonsnummer til å hente innebygde koordinater. Den kartklare arbeidsboken inneholder også koordinater og adresser direkte.

## År, manglende tall og sammenlignbarhet

- Sammenlign nasjonale prøver bare innen samme prøvetrinn og skoleår.
- Trivsel og mobbing gjelder et bestemt trinn i Elevundersøkelsen, ikke hele skolen.
- Ett år for mobbetall må velges før en terskel kan settes. Dermed blandes ikke ulike år direkte.
- Tomme felt og «—» betyr ikke publisert, personvernskjermet eller manglende, aldri null.
- Manglende verdier utelates når en terskel er aktiv, med mindre valget om å beholde dem er slått på. Det betyr fortsatt ikke at de oppfyller terskelen.
- Elever per lærer er lærertetthet i ordinær undervisning, ikke gjennomsnittlig klassestørrelse.
- Private skoler, internasjonale språkmiljøer, spesialskoler og ulike trinnstrukturer må tolkes hver for seg.

## Oppdater dataene

Python 3 og `openpyxl` kreves:

```powershell
python scripts/fetch_locations.py
python scripts/build_data.py
node --test tests/filter-core.test.mjs
python -m unittest tests/test_data.py
```

`fetch_locations.py` leser hver kildelenke og henter koordinater og adresse fra OpenStreetMap-lenken. `build_data.py` lager den kartklare arbeidsboken, normalisert JSON/CSV, historikk-CSV, nettleserdata og nedlastbare kopier på nytt.

Når indikatorene oppdateres, oppdateres først kildearbeidsboken under `data/original/` med samme kolonner. Eldre fagverdier må ikke blandes stille inn i en nyere rad.

## GitHub Pages

Arbeidsflyten `.github/workflows/pages.yml` publiserer `dist/`. Velg **GitHub Actions** som kilde under **Settings → Pages**. Ved push til `main` blir normal adresse:

`https://hui-aqua.github.io/school-explorer-rogaland/`

Se [`REFERENCES.md`](../REFERENCES.md) for kilder og begrensninger.
