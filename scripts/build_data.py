from __future__ import annotations

import csv
import json
import shutil
from copy import copy
from pathlib import Path

from openpyxl import load_workbook
from openpyxl.formatting.rule import ColorScaleRule
from openpyxl.styles import Alignment, Font, PatternFill
from openpyxl.worksheet.datavalidation import DataValidation


ROOT = Path(__file__).resolve().parents[1]
RAW_XLSX = ROOT / "data" / "original" / "Sola_Stavanger_Sandnes_schools.xlsx"
LOCATIONS_JSON = ROOT / "data" / "locations.json"
NORMALIZED_XLSX = ROOT / "data" / "Sola_Stavanger_Sandnes_schools_map_ready.xlsx"
SCHOOLS_JSON = ROOT / "data" / "schools.json"
SCHOOLS_CSV = ROOT / "data" / "schools.csv"
HISTORY_CSV = ROOT / "data" / "published-history.csv"
DIST_DATA = ROOT / "dist" / "data"
DIST_DOWNLOADS = ROOT / "dist" / "downloads"
APP_DATA_JS = ROOT / "dist" / "app-data.js"


def as_number(value):
    return value if isinstance(value, (int, float)) and not isinstance(value, bool) else None


def normalized_record(record: dict, location: dict, row_number: int, visible: bool) -> dict:
    ownership = str(record.get("Ownership") or "")
    bullying = as_number(record.get("Bullying (%)"))
    return {
        "id": str(record.get("Organisation number") or ""),
        "municipality": record.get("Municipality"),
        "school": record.get("School"),
        "ownership": ownership,
        "ownershipCategory": "public" if ownership.casefold() == "offentlig" else "private",
        "grades": record.get("Grades (registry)"),
        "specialSchool": bool(record.get("Special school")),
        "pupils": as_number(record.get("Pupils (registry)")),
        "registryUpdated": record.get("Registry updated"),
        "testGrade": as_number(record.get("Test grade")),
        "testYear": record.get("Test year"),
        "reading": as_number(record.get("Reading")),
        "maths": as_number(record.get("Maths")),
        "english": as_number(record.get("English")),
        "readingUncertainty": as_number(record.get("Reading uncertainty ±")),
        "mathsUncertainty": as_number(record.get("Maths uncertainty ±")),
        "englishUncertainty": as_number(record.get("English uncertainty ±")),
        "surveyGrade": as_number(record.get("Survey grade")),
        "wellbeing": as_number(record.get("Well-being (1–5)")),
        "wellbeingYear": record.get("Well-being year"),
        "bullying": bullying * 100 if bullying is not None and bullying <= 1 else bullying,
        "bullyingYear": record.get("Bullying year"),
        "bullyingStatus": record.get("Bullying 2025–26 status"),
        "pupilsPerTeacher": as_number(record.get("Pupils per teacher")),
        "teacherRatioYear": record.get("Teacher ratio year"),
        "grade10Points": as_number(record.get("Grade 10 points")),
        "pointsYear": record.get("Points year"),
        "notes": record.get("Notes"),
        "sourceUrl": record.get("Source URL"),
        "organisationNumber": str(record.get("Organisation number") or ""),
        "showOnMap": visible,
        "excelRowVisible": visible,
        "latitude": location.get("latitude"),
        "longitude": location.get("longitude"),
        "address": location.get("address"),
        "sourceWorkbookRow": row_number,
    }


def build_outputs() -> list[dict]:
    locations = json.loads(LOCATIONS_JSON.read_text(encoding="utf-8"))
    workbook = load_workbook(RAW_XLSX)
    sheet = workbook["All schools"]
    headers = [cell.value for cell in sheet[6]]
    records: list[dict] = []

    new_headers = ["Show on map", "Latitude", "Longitude", "Address"]
    first_new_column = sheet.max_column + 1
    for offset, header in enumerate(new_headers):
        cell = sheet.cell(6, first_new_column + offset, header)
        cell._style = copy(sheet.cell(6, 28)._style)
        cell.alignment = copy(sheet.cell(6, 28).alignment)

    show_validation = DataValidation(type="list", formula1='"TRUE,FALSE"', allow_blank=False)
    show_validation.error = "Choose TRUE or FALSE."
    show_validation.errorTitle = "Invalid map value"
    sheet.add_data_validation(show_validation)
    show_validation.add(f"AC7:AC{sheet.max_row}")

    for row_number in range(7, sheet.max_row + 1):
        record = {
            header: sheet.cell(row_number, column_number).value
            for column_number, header in enumerate(headers, start=1)
        }
        key = str(record.get("Organisation number") or "")
        location = locations.get(key, {})
        visible = not bool(sheet.row_dimensions[row_number].hidden)
        normalized = normalized_record(record, location, row_number, visible)
        records.append(normalized)

        row_values = [
            visible,
            location.get("latitude"),
            location.get("longitude"),
            location.get("address"),
        ]
        for offset, value in enumerate(row_values):
            target = sheet.cell(row_number, first_new_column + offset, value)
            target._style = copy(sheet.cell(row_number, 28)._style)
            target.alignment = copy(sheet.cell(row_number, 28).alignment)

    sheet.column_dimensions["AC"].width = 14
    sheet.column_dimensions["AD"].width = 12
    sheet.column_dimensions["AE"].width = 12
    sheet.column_dimensions["AF"].width = 42
    sheet["AD7"].number_format = "0.00000"
    sheet["AE7"].number_format = "0.00000"
    for row_number in range(7, sheet.max_row + 1):
        sheet.cell(row_number, 30).number_format = "0.00000"
        sheet.cell(row_number, 31).number_format = "0.00000"

    table = sheet.tables["AllschoolsTable"]
    table.ref = f"A6:AF{sheet.max_row}"
    sheet.freeze_panes = "C7"

    definitions = workbook["Definitions"]
    additions = [
        ("Map fields", "Show on map, latitude, longitude and address were added for the interactive map."),
        ("Excel visible rows", "When imported into the web app, rows saved as hidden by an Excel filter can be used as the map selection."),
        ("Show on map", "TRUE explicitly includes a school in the default map set. FALSE is not a quality judgment."),
        ("Coordinates", "Coordinates are read from each school's OpenStreetMap link on its cited Skoleoversikten page."),
        ("Web app", "https://hui-aqua.github.io/school-explorer-rogaland/"),
    ]
    start_row = definitions.max_row + 2
    for offset, values in enumerate(additions):
        definitions.cell(start_row + offset, 1, values[0])
        definitions.cell(start_row + offset, 2, values[1])
    definitions.column_dimensions["A"].width = max(definitions.column_dimensions["A"].width or 0, 24)
    definitions.column_dimensions["B"].width = max(definitions.column_dimensions["B"].width or 0, 115)

    map_sheet = workbook["Map"]
    map_sheet.sheet_view.showGridLines = False
    map_sheet["A2"] = "Interactive map and Excel workflow"
    map_sheet["A2"].font = Font(name="Arial", size=18, bold=True, color="17324D")
    map_sheet["A4"] = "中文"
    map_sheet["B4"] = "在“All schools”中筛选并保存，然后在网页导入本工作簿；可选择读取可见行或“Show on map=TRUE”。"
    map_sheet["A4"].font = Font(name="Microsoft YaHei", size=11, bold=True, color="17324D")
    map_sheet["B4"].font = Font(name="Microsoft YaHei", size=11, color="263746")
    map_sheet["A6"] = "English"
    map_sheet["B6"] = "Filter and save “All schools”, then import this workbook in the web app. Choose saved visible rows or Show on map=TRUE."
    map_sheet["A8"] = "Norsk"
    map_sheet["B8"] = "Filtrer og lagre «All schools», importer arbeidsboken i nettappen, og velg synlige rader eller Show on map=TRUE."
    map_sheet["A10"] = "Local app"
    map_sheet["B10"] = "../dist/index.html"
    map_sheet["B10"].hyperlink = "../dist/index.html"
    map_sheet["B10"].style = "Hyperlink"
    map_sheet["A11"] = "GitHub Pages"
    map_sheet["B11"] = "https://hui-aqua.github.io/school-explorer-rogaland/"
    map_sheet["B11"].hyperlink = map_sheet["B11"].value
    map_sheet["B11"].style = "Hyperlink"
    for row in (4, 6, 8, 10, 11):
        map_sheet.cell(row, 1).font = Font(name="Arial", size=11, bold=True, color="17324D")
        map_sheet.cell(row, 2).alignment = Alignment(wrap_text=True, vertical="top")
    map_sheet.column_dimensions["A"].width = 20
    map_sheet.column_dimensions["B"].width = 110
    map_sheet.row_dimensions[4].height = 38
    map_sheet.row_dimensions[6].height = 38
    map_sheet.row_dimensions[8].height = 38
    map_sheet["A13"] = "The web app is the map surface; this sheet documents the handoff and remains usable offline."
    map_sheet["A13"].font = Font(name="Arial", size=10, italic=True, color="566575")

    NORMALIZED_XLSX.parent.mkdir(parents=True, exist_ok=True)
    workbook.save(NORMALIZED_XLSX)

    SCHOOLS_JSON.write_text(json.dumps(records, ensure_ascii=False, indent=2), encoding="utf-8")
    APP_DATA_JS.write_text(
        "window.SCHOOL_DATA = " + json.dumps(records, ensure_ascii=False, separators=(",", ":")) + ";\n",
        encoding="utf-8",
    )
    with SCHOOLS_CSV.open("w", newline="", encoding="utf-8-sig") as handle:
        writer = csv.DictWriter(handle, fieldnames=list(records[0].keys()))
        writer.writeheader()
        writer.writerows(records)

    history_sheet = workbook["Published history"]
    history_headers = [cell.value for cell in history_sheet[6]]
    with HISTORY_CSV.open("w", newline="", encoding="utf-8-sig") as handle:
        writer = csv.writer(handle)
        writer.writerow(history_headers)
        for row in history_sheet.iter_rows(min_row=7, values_only=True):
            writer.writerow(row)

    DIST_DATA.mkdir(parents=True, exist_ok=True)
    DIST_DOWNLOADS.mkdir(parents=True, exist_ok=True)
    shutil.copy2(SCHOOLS_JSON, DIST_DATA / "schools.json")
    shutil.copy2(NORMALIZED_XLSX, DIST_DOWNLOADS / NORMALIZED_XLSX.name)
    shutil.copy2(RAW_XLSX, DIST_DOWNLOADS / RAW_XLSX.name)
    references = ROOT / "REFERENCES.md"
    if references.exists():
        shutil.copy2(references, ROOT / "dist" / "REFERENCES.md")
    return records


if __name__ == "__main__":
    result = build_outputs()
    print(
        json.dumps(
            {
                "schools": len(result),
                "default_map_selection": sum(1 for row in result if row["showOnMap"]),
                "geocoded": sum(1 for row in result if row["latitude"] is not None and row["longitude"] is not None),
                "municipalities": sorted({row["municipality"] for row in result}),
            },
            ensure_ascii=False,
            indent=2,
        )
    )
