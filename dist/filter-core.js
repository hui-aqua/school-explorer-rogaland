(function (root, factory) {
  root.FilterCore = factory();
})(typeof globalThis !== "undefined" ? globalThis : window, function () {
  "use strict";

  function isNumber(value) {
    return typeof value === "number" && Number.isFinite(value);
  }

  function toNumber(value) {
    if (value === null || value === undefined || value === "") return null;
    if (isNumber(value)) return value;
    const parsed = Number(String(value).replace(",", ".").replace("%", ""));
    return Number.isFinite(parsed) ? parsed : null;
  }

  function normalizeBoolean(value) {
    if (typeof value === "boolean") return value;
    if (typeof value === "number") return value !== 0;
    return ["true", "yes", "1", "ja", "是"].includes(String(value || "").trim().toLowerCase());
  }

  function passesMinimum(value, minimum, includeMissing) {
    const threshold = toNumber(minimum);
    if (threshold === null) return true;
    const numeric = toNumber(value);
    return numeric === null ? Boolean(includeMissing) : numeric >= threshold;
  }

  function passesMaximum(value, maximum, includeMissing) {
    const threshold = toNumber(maximum);
    if (threshold === null) return true;
    const numeric = toNumber(value);
    return numeric === null ? Boolean(includeMissing) : numeric <= threshold;
  }

  function selectedByMapMode(school, mode) {
    if (mode === "visible") return school.excelRowVisible !== false;
    if (mode === "explicit") return normalizeBoolean(school.showOnMap);
    return true;
  }

  function filterSchools(schools, filters) {
    const settings = filters || {};
    if (toNumber(settings.maxBullying) !== null && !settings.bullyingYear) {
      throw new Error("A bullying year is required before applying a bullying threshold.");
    }
    return schools.filter((school) => {
      if (!selectedByMapMode(school, settings.mapMode || "all")) return false;
      if (settings.municipality && school.municipality !== settings.municipality) return false;
      if (settings.ownership && school.ownershipCategory !== settings.ownership) return false;
      if (settings.grades && school.grades !== settings.grades) return false;
      if (settings.testYear && school.testYear !== settings.testYear) return false;
      if (settings.bullyingYear && school.bullyingYear !== settings.bullyingYear) return false;
      if (!passesMinimum(school.reading, settings.minReading, settings.includeMissing)) return false;
      if (!passesMinimum(school.maths, settings.minMaths, settings.includeMissing)) return false;
      if (!passesMinimum(school.english, settings.minEnglish, settings.includeMissing)) return false;
      if (!passesMinimum(school.wellbeing, settings.minWellbeing, settings.includeMissing)) return false;
      if (!passesMaximum(school.bullying, settings.maxBullying, settings.includeMissing)) return false;
      if (!passesMaximum(school.pupilsPerTeacher, settings.maxRatio, settings.includeMissing)) return false;
      return true;
    });
  }

  function sortSchools(schools, key, direction) {
    const multiplier = direction === "desc" ? -1 : 1;
    return schools.slice().sort((left, right) => {
      const a = left[key];
      const b = right[key];
      const aMissing = a === null || a === undefined || a === "";
      const bMissing = b === null || b === undefined || b === "";
      if (aMissing !== bMissing) return aMissing ? 1 : -1;
      if (aMissing) return String(left.school).localeCompare(String(right.school), "nb");
      if (isNumber(a) && isNumber(b)) return (a - b) * multiplier;
      return String(a).localeCompare(String(b), "nb") * multiplier;
    });
  }

  function uniqueValues(schools, key) {
    return Array.from(new Set(schools.map((school) => school[key]).filter(Boolean))).sort().reverse();
  }

  return {
    filterSchools,
    normalizeBoolean,
    passesMaximum,
    passesMinimum,
    sortSchools,
    toNumber,
    uniqueValues,
  };
});
