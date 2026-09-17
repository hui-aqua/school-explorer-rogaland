import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import vm from "node:vm";

const source = fs.readFileSync(new URL("../dist/filter-core.js", import.meta.url), "utf8");
const context = vm.createContext({});
vm.runInContext(source, context);
const core = context.FilterCore;

const schools = [
  { id: "1", school: "A", municipality: "Sola", ownershipCategory: "public", grades: "1–7", reading: 52, wellbeing: 4.3, bullying: 8.5, bullyingYear: "2025-26", pupilsPerTeacher: 14, showOnMap: true, excelRowVisible: true },
  { id: "2", school: "B", municipality: "Sandnes", ownershipCategory: "private", grades: "1–10", reading: null, wellbeing: 4.5, bullying: null, bullyingYear: null, pupilsPerTeacher: 9, showOnMap: false, excelRowVisible: true },
  { id: "3", school: "C", municipality: "Stavanger", ownershipCategory: "public", grades: "1–7", reading: 49, wellbeing: 4.0, bullying: 12, bullyingYear: "2024-25", pupilsPerTeacher: 18, showOnMap: true, excelRowVisible: false },
];

test("explicit map selection and thresholds stay synchronized", () => {
  const result = core.filterSchools(schools, { mapMode: "explicit", minReading: 50, includeMissing: false });
  assert.deepEqual(result.map((item) => item.id), ["1"]);
});

test("visible row mode follows Excel saved hidden rows", () => {
  const result = core.filterSchools(schools, { mapMode: "visible" });
  assert.deepEqual(result.map((item) => item.id), ["1", "2"]);
});

test("missing values are not treated as zero", () => {
  assert.deepEqual(core.filterSchools(schools, { mapMode: "all", maxRatio: 10, includeMissing: false }).map((item) => item.id), ["2"]);
  assert.deepEqual(core.filterSchools(schools, { mapMode: "all", minReading: 50, includeMissing: true }).map((item) => item.id), ["1", "2"]);
});

test("bullying threshold requires a single year", () => {
  assert.throws(() => core.filterSchools(schools, { mapMode: "all", maxBullying: 10 }), /year is required/);
  const result = core.filterSchools(schools, { mapMode: "all", bullyingYear: "2025-26", maxBullying: 10 });
  assert.deepEqual(result.map((item) => item.id), ["1"]);
});

test("missing values sort after published values", () => {
  const result = core.sortSchools(schools, "reading", "desc");
  assert.deepEqual(result.map((item) => item.id), ["1", "3", "2"]);
});
