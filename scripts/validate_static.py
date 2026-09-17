from __future__ import annotations

import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"
html = (DIST / "index.html").read_text(encoding="utf-8")
references = re.findall(r'(?:src|href)="(\./[^"#?]+)', html)
missing = [reference for reference in references if not (DIST / reference[2:]).exists()]
if missing:
    raise SystemExit(f"Missing local assets: {missing}")
required = [
    "index.html",
    "styles.css",
    "app.js",
    "app-data.js",
    "filter-core.js",
    "REFERENCES.md",
    "vendor/xlsx.full.min.js",
    "downloads/Sola_Stavanger_Sandnes_schools_map_ready.xlsx",
]
missing_required = [item for item in required if not (DIST / item).exists()]
if missing_required:
    raise SystemExit(f"Missing required outputs: {missing_required}")
print({"local_references": len(references), "required_outputs": len(required), "missing": []})
