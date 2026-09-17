(function () {
  "use strict";

  const T = {
    zh: {
      region: "Sola · Stavanger · Sandnes", title: "学校数据探索器", language: "语言", downloadWorkbook: "下载地图版 XLSX",
      filters: "筛选学校", importXlsx: "导入 XLSX", reset: "重置", mapSelection: "地图选择", mapExplicit: "Show on map = TRUE",
      mapVisible: "Excel 已保存的可见行", mapAll: "全部学校", municipality: "市镇", all: "全部", ownership: "所有制",
      public: "公立", private: "私立", grades: "年级范围", testYear: "考试年份", allYears: "全部年份", minReading: "阅读最低分",
      minMaths: "数学最低分", minEnglish: "英语最低分", minWellbeing: "幸福感最低值", bullyingYear: "欺凌数据年份",
      chooseYear: "选择年份后筛选", maxBullying: "欺凌率最高值 (%)", maxRatio: "每名教师学生数最高值", includeMissing: "启用阈值筛选时保留缺失值",
      yearWarning: "欺凌率只有在选择同一学年后才能设置阈值，避免把不同年份直接混排。缺失值不会被当作零。",
      offlineMap: "离线坐标地图", schools: "学校", currentSelection: "当前选择", pupils: "学生", publicShare: "公立占比", withBullying: "同年欺凌数据",
      sortBy: "排序", schoolName: "学校名称", reading: "阅读", maths: "数学", english: "英语", wellbeing: "幸福感", bullying: "欺凌率", teacherRatio: "学生/教师",
      exportCsv: "导出当前结果 CSV", mapNote: "地图按经纬度绘制，不加载在线底图，因此下载后也可离线使用。", traceable: "逐项保留年份、年级与来源",
      comparisonTable: "学校比较表", profile: "类型", source: "来源", noResults: "没有符合条件的学校", loosenFilters: "请放宽筛选条件，或允许阈值筛选保留缺失值。",
      howToRead: "如何解读", methodOne: "国家测试分数只比较相同年级和学年；小样本差异可能落在不确定范围内。",
      methodTwo: "幸福感和欺凌来自指定年级的学生调查，不代表全校所有学生。", methodThree: "“—”表示未公布、隐私屏蔽或缺失，不表示零，也不表示学校存在问题。",
      methodSource: "查看 Skoleoversikten 的数据方法", footer: "数据快照：2026-09-16。学校级指标来自逐校引用的 Skoleoversikten 页面；其上游来源包括 Udir 和公共登记。",
      references: "参考资料", builtInStatus: "内置 103 所学校；默认地图选择 22 所。", importedStatus: "已导入 {count} 所学校。当前选择方式：{mode}。",
      visibleMode: "Excel 可见行", explicitMode: "Show on map", allMode: "全部", grade: "年级", year: "学年", unknown: "未公布", openSource: "学校来源",
      address: "地址", tests: "考试", survey: "调查", ratio: "师生比", importError: "无法读取工作簿。请确认存在“All schools”工作表及表头。",
      importSuccess: "XLSX 已导入", mapEmpty: "当前筛选没有可绘制的学校。", selectionHint: "点击地图标记或表格行查看学校。"
    },
    en: {
      region: "Sola · Stavanger · Sandnes", title: "School data explorer", language: "Language", downloadWorkbook: "Download map-ready XLSX",
      filters: "Filter schools", importXlsx: "Import XLSX", reset: "Reset", mapSelection: "Map selection", mapExplicit: "Show on map = TRUE",
      mapVisible: "Saved visible Excel rows", mapAll: "All schools", municipality: "Municipality", all: "All", ownership: "Ownership",
      public: "Public", private: "Private", grades: "Grade range", testYear: "Test year", allYears: "All years", minReading: "Minimum reading",
      minMaths: "Minimum maths", minEnglish: "Minimum English", minWellbeing: "Minimum well-being", bullyingYear: "Bullying data year",
      chooseYear: "Choose a year to filter", maxBullying: "Maximum bullying (%)", maxRatio: "Maximum pupils per teacher", includeMissing: "Keep missing values when thresholds are active",
      yearWarning: "A bullying threshold requires one school year, preventing direct comparison of different years. Missing values are never treated as zero.",
      offlineMap: "Offline coordinate map", schools: "schools", currentSelection: "Current selection", pupils: "Pupils", publicShare: "Public share", withBullying: "Bullying data in selected year",
      sortBy: "Sort by", schoolName: "School", reading: "Reading", maths: "Maths", english: "English", wellbeing: "Well-being", bullying: "Bullying", teacherRatio: "Pupils/teacher",
      exportCsv: "Export current results as CSV", mapNote: "The map plots coordinates without online tiles, so it also works after download.", traceable: "Year, grade and source retained for every metric",
      comparisonTable: "School comparison", profile: "Profile", source: "Source", noResults: "No schools match", loosenFilters: "Loosen the filters or allow missing values during threshold filtering.",
      howToRead: "How to read the data", methodOne: "Compare national-test scores only within the same grade and year. Small differences may fall within published uncertainty.",
      methodTwo: "Well-being and bullying come from a specified survey grade, not every pupil in the school.", methodThree: "“—” means unavailable, suppressed or missing. It never means zero or that something is wrong.",
      methodSource: "Read Skoleoversikten’s data method", footer: "Data snapshot: 2026-09-16. School-level figures link to each Skoleoversikten page; upstream sources include Udir and public registers.",
      references: "References", builtInStatus: "Built-in dataset: 103 schools; default map selection: 22.", importedStatus: "Imported {count} schools. Selection mode: {mode}.",
      visibleMode: "visible Excel rows", explicitMode: "Show on map", allMode: "all", grade: "grade", year: "year", unknown: "Unavailable", openSource: "School source",
      address: "Address", tests: "Tests", survey: "Survey", ratio: "Teacher ratio", importError: "The workbook could not be read. Check that it contains an “All schools” sheet and headers.",
      importSuccess: "XLSX imported", mapEmpty: "No geocoded schools match the current filters.", selectionHint: "Select a map marker or table row to inspect a school."
    },
    nb: {
      region: "Sola · Stavanger · Sandnes", title: "Utforsker for skoledata", language: "Språk", downloadWorkbook: "Last ned kartklar XLSX",
      filters: "Filtrer skoler", importXlsx: "Importer XLSX", reset: "Nullstill", mapSelection: "Kartutvalg", mapExplicit: "Show on map = TRUE",
      mapVisible: "Lagrede synlige Excel-rader", mapAll: "Alle skoler", municipality: "Kommune", all: "Alle", ownership: "Eierform",
      public: "Offentlig", private: "Privat", grades: "Trinn", testYear: "Prøveår", allYears: "Alle år", minReading: "Minste lesing",
      minMaths: "Minste regning", minEnglish: "Minste engelsk", minWellbeing: "Minste trivsel", bullyingYear: "År for mobbetall",
      chooseYear: "Velg år før filtrering", maxBullying: "Høyeste mobbeandel (%)", maxRatio: "Flest elever per lærer", includeMissing: "Behold manglende verdier når terskler er aktive",
      yearWarning: "En terskel for mobbing krever ett skoleår, slik at ulike år ikke sammenlignes direkte. Manglende verdier behandles aldri som null.",
      offlineMap: "Frakoblet koordinatkart", schools: "skoler", currentSelection: "Gjeldende utvalg", pupils: "Elever", publicShare: "Andel offentlige", withBullying: "Mobbetall i valgt år",
      sortBy: "Sorter etter", schoolName: "Skole", reading: "Lesing", maths: "Regning", english: "Engelsk", wellbeing: "Trivsel", bullying: "Mobbing", teacherRatio: "Elever/lærer",
      exportCsv: "Eksporter gjeldende resultat som CSV", mapNote: "Kartet plotter koordinater uten nettkart og virker derfor også etter nedlasting.", traceable: "År, trinn og kilde beholdes for hvert mål",
      comparisonTable: "Skolesammenligning", profile: "Profil", source: "Kilde", noResults: "Ingen skoler passer", loosenFilters: "Utvid filtrene eller tillat manglende verdier ved terskelfiltrering.",
      howToRead: "Slik leser du tallene", methodOne: "Sammenlign nasjonale prøver bare innen samme trinn og år. Små forskjeller kan ligge innenfor publisert usikkerhet.",
      methodTwo: "Trivsel og mobbing gjelder et bestemt trinn i Elevundersøkelsen, ikke alle elever ved skolen.", methodThree: "«—» betyr ikke publisert, skjermet eller manglende. Det betyr aldri null eller at noe er galt.",
      methodSource: "Les Skoleoversiktens metode", footer: "Datagrunnlag: 16.09.2026. Skolens tall lenker til hver side på Skoleoversikten; oppstrømskilder omfatter Udir og offentlige registre.",
      references: "Referanser", builtInStatus: "Innebygd datasett: 103 skoler; standard kartutvalg: 22.", importedStatus: "Importerte {count} skoler. Utvalgsmodus: {mode}.",
      visibleMode: "synlige Excel-rader", explicitMode: "Show on map", allMode: "alle", grade: "trinn", year: "år", unknown: "Ikke publisert", openSource: "Skolekilde",
      address: "Adresse", tests: "Prøver", survey: "Undersøkelse", ratio: "Lærertetthet", importError: "Arbeidsboken kunne ikke leses. Kontroller at den har arket «All schools» og kolonneoverskrifter.",
      importSuccess: "XLSX importert", mapEmpty: "Ingen skoler med koordinater passer filtrene.", selectionHint: "Velg en kartmarkør eller tabellrad for å se skolen."
    }
  };

  const controls = {
    language: document.querySelector("#language"), mapMode: document.querySelector("#map-mode"), municipality: document.querySelector("#municipality"),
    ownership: document.querySelector("#ownership"), grades: document.querySelector("#grades"), testYear: document.querySelector("#test-year"),
    minReading: document.querySelector("#min-reading"), minMaths: document.querySelector("#min-maths"), minEnglish: document.querySelector("#min-english"),
    minWellbeing: document.querySelector("#min-wellbeing"), bullyingYear: document.querySelector("#bullying-year"), maxBullying: document.querySelector("#max-bullying"),
    maxRatio: document.querySelector("#max-ratio"), includeMissing: document.querySelector("#include-missing"), sortKey: document.querySelector("#sort-key")
  };

  const builtInSchools = Array.isArray(window.SCHOOL_DATA) ? window.SCHOOL_DATA : [];
  const builtInById = new Map(builtInSchools.map((school) => [String(school.organisationNumber || school.id), school]));
  let schools = builtInSchools.map((school) => ({ ...school }));
  let filteredSchools = [];
  let selectedId = null;
  let sortDirection = "asc";
  let dataSource = "builtin";

  const $ = (selector) => document.querySelector(selector);
  const tr = (key) => (T[controls.language.value] || T.zh)[key] || key;
  const escapeHtml = (value) => String(value ?? "").replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
  const safeUrl = (value) => {
    try { const url = new URL(value); return ["https:", "http:"].includes(url.protocol) ? url.href : "#"; } catch { return "#"; }
  };

  function applyLanguage() {
    document.documentElement.lang = controls.language.value === "nb" ? "nb-NO" : controls.language.value === "en" ? "en" : "zh-CN";
    document.querySelectorAll("[data-i18n]").forEach((element) => { element.textContent = tr(element.dataset.i18n); });
    populateSelectors(true);
    updateDatasetStatus();
    render();
  }

  function replaceOptions(select, firstLabel, values, preserve) {
    const current = preserve ? select.value : "";
    select.replaceChildren(new Option(firstLabel, ""));
    values.forEach((value) => select.add(new Option(value, value)));
    if (values.includes(current)) select.value = current;
  }

  function populateSelectors(preserve) {
    replaceOptions(controls.municipality, tr("all"), FilterCore.uniqueValues(schools, "municipality").reverse(), preserve);
    replaceOptions(controls.grades, tr("all"), Array.from(new Set(schools.map((school) => school.grades).filter(Boolean))).sort(), preserve);
    replaceOptions(controls.testYear, tr("allYears"), FilterCore.uniqueValues(schools, "testYear"), preserve);
    replaceOptions(controls.bullyingYear, tr("chooseYear"), FilterCore.uniqueValues(schools, "bullyingYear"), preserve);
  }

  function currentFilters() {
    return {
      mapMode: controls.mapMode.value,
      municipality: controls.municipality.value,
      ownership: controls.ownership.value,
      grades: controls.grades.value,
      testYear: controls.testYear.value,
      minReading: controls.minReading.value,
      minMaths: controls.minMaths.value,
      minEnglish: controls.minEnglish.value,
      minWellbeing: controls.minWellbeing.value,
      bullyingYear: controls.bullyingYear.value,
      maxBullying: controls.maxBullying.value,
      maxRatio: controls.maxRatio.value,
      includeMissing: controls.includeMissing.checked,
    };
  }

  function updateDatasetStatus(message) {
    const modeKey = controls.mapMode.value === "visible" ? "visibleMode" : controls.mapMode.value === "explicit" ? "explicitMode" : "allMode";
    $("#dataset-status").textContent = message || (dataSource === "builtin"
      ? tr("builtInStatus")
      : tr("importedStatus").replace("{count}", schools.length).replace("{mode}", tr(modeKey)));
  }

  function number(value, digits = 0) {
    return typeof value === "number" && Number.isFinite(value)
      ? new Intl.NumberFormat(controls.language.value === "zh" ? "zh-CN" : controls.language.value === "nb" ? "nb-NO" : "en-GB", { maximumFractionDigits: digits, minimumFractionDigits: digits }).format(value)
      : "—";
  }

  function metric(value, year, grade, suffix, uncertainty) {
    if (typeof value !== "number") return `<span class="missing">—<small>${escapeHtml(tr("unknown"))}</small></span>`;
    const precision = suffix === "%" || suffix === "/5" ? 1 : 0;
    const uncertaintyText = typeof uncertainty === "number" ? ` ±${number(uncertainty, 1)}` : "";
    const meta = [grade ? `${tr("grade")} ${grade}` : "", year || ""].filter(Boolean).join(" · ");
    return `${number(value, precision)}${suffix || ""}${uncertaintyText}<small>${escapeHtml(meta)}</small>`;
  }

  function profile(school) {
    return `${escapeHtml(school.ownershipCategory === "public" ? tr("public") : tr("private"))}<small>${escapeHtml(school.grades || "—")} · ${escapeHtml(school.municipality || "")}</small>`;
  }

  function renderTable(list) {
    const body = $("#school-rows");
    body.innerHTML = list.map((school) => `
      <tr data-school-id="${escapeHtml(school.id)}" tabindex="0">
        <td>${escapeHtml(school.school)}<small>${escapeHtml(school.address || "")}</small></td>
        <td>${profile(school)}</td>
        <td>${number(school.pupils)}</td>
        <td>${metric(school.reading, school.testYear, school.testGrade, "", school.readingUncertainty)}</td>
        <td>${metric(school.maths, school.testYear, school.testGrade, "", school.mathsUncertainty)}</td>
        <td>${metric(school.english, school.testYear, school.testGrade, "", school.englishUncertainty)}</td>
        <td>${metric(school.wellbeing, school.wellbeingYear, school.surveyGrade, "/5")}</td>
        <td>${metric(school.bullying, school.bullyingYear, school.surveyGrade, "%")}</td>
        <td>${metric(school.pupilsPerTeacher, school.teacherRatioYear, null, "")}</td>
        <td><a class="source-link" href="${escapeHtml(safeUrl(school.sourceUrl))}" target="_blank" rel="noreferrer">${escapeHtml(tr("openSource"))}</a></td>
      </tr>`).join("");
    body.querySelectorAll("tr").forEach((row) => {
      const activate = () => selectSchool(row.dataset.schoolId, true);
      row.addEventListener("click", activate);
      row.addEventListener("keydown", (event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); activate(); } });
    });
    $("#empty-state").hidden = list.length > 0;
    $(".table-scroll").hidden = list.length === 0;
  }

  function municipalityColor(name) {
    return name === "Stavanger" ? "#205f8d" : name === "Sandnes" ? "#d8732f" : "#16837a";
  }

  function renderMap(list) {
    const map = $("#map");
    const geocoded = list.filter((school) => typeof school.latitude === "number" && typeof school.longitude === "number");
    if (!geocoded.length) {
      map.innerHTML = `<div class="empty-state"><p>${escapeHtml(tr("mapEmpty"))}</p></div>`;
      $("#school-detail").textContent = tr("selectionHint");
      return;
    }
    const reference = schools.filter((school) => typeof school.latitude === "number" && typeof school.longitude === "number");
    const latitudes = reference.map((school) => school.latitude);
    const longitudes = reference.map((school) => school.longitude);
    const minLat = Math.min(...latitudes), maxLat = Math.max(...latitudes), minLon = Math.min(...longitudes), maxLon = Math.max(...longitudes);
    const width = 840, height = 520, padding = 38;
    const x = (lon) => padding + ((lon - minLon) / (maxLon - minLon || 1)) * (width - padding * 2);
    const y = (lat) => height - padding - ((lat - minLat) / (maxLat - minLat || 1)) * (height - padding * 2);
    const centerFor = (name) => {
      const group = reference.filter((school) => school.municipality === name);
      return { x: group.reduce((sum, item) => sum + x(item.longitude), 0) / group.length, y: group.reduce((sum, item) => sum + y(item.latitude), 0) / group.length };
    };
    const labels = ["Stavanger", "Sandnes", "Sola"].map((name) => { const point = centerFor(name); return `<text class="municipality-label" x="${point.x}" y="${point.y}" text-anchor="middle">${name}</text>`; }).join("");
    const markers = geocoded.map((school) => `<circle class="school-marker${String(school.id) === String(selectedId) ? " selected" : ""}" data-school-id="${escapeHtml(school.id)}" cx="${x(school.longitude).toFixed(2)}" cy="${y(school.latitude).toFixed(2)}" r="7" fill="${municipalityColor(school.municipality)}" tabindex="0" role="button" aria-label="${escapeHtml(school.school)}"><title>${escapeHtml(school.school)} · ${escapeHtml(school.municipality)}</title></circle>`).join("");
    map.innerHTML = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="map-title map-desc"><title id="map-title">${escapeHtml(tr("offlineMap"))}</title><desc id="map-desc">${geocoded.length} ${escapeHtml(tr("schools"))}</desc>
      <text class="north" x="${width - 34}" y="28" text-anchor="middle">N</text><path d="M${width - 34} 34l-7 17h14z" fill="#536b7f" />
      ${labels}${markers}<text class="axis-label" x="12" y="${height - 10}">${minLat.toFixed(2)}°–${maxLat.toFixed(2)}° N · ${minLon.toFixed(2)}°–${maxLon.toFixed(2)}° E</text></svg>`;
    map.querySelectorAll(".school-marker").forEach((marker) => {
      const activate = () => selectSchool(marker.dataset.schoolId, false);
      marker.addEventListener("click", activate);
      marker.addEventListener("keydown", (event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); activate(); } });
    });
    const selected = geocoded.find((school) => String(school.id) === String(selectedId));
    renderDetail(selected || geocoded[0]);
  }

  function renderDetail(school) {
    if (!school) { $("#school-detail").textContent = tr("selectionHint"); return; }
    selectedId = school.id;
    $("#school-detail").innerHTML = `<strong>${escapeHtml(school.school)}</strong> <span class="detail-meta">· ${escapeHtml(school.municipality)} · ${escapeHtml(school.grades || "—")}</span><br>
      <span class="detail-meta">${escapeHtml(tr("address"))}: ${escapeHtml(school.address || tr("unknown"))}</span> ·
      <a href="${escapeHtml(safeUrl(school.sourceUrl))}" target="_blank" rel="noreferrer">${escapeHtml(tr("openSource"))}</a>`;
  }

  function selectSchool(id, scrollToMap) {
    selectedId = id;
    const school = filteredSchools.find((item) => String(item.id) === String(id));
    renderMap(filteredSchools);
    renderDetail(school);
    if (scrollToMap) $("#map").scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function updateSummary(list) {
    $("#result-count").textContent = number(list.length);
    $("#summary-schools").textContent = number(list.length);
    const pupils = list.reduce((sum, school) => sum + (typeof school.pupils === "number" ? school.pupils : 0), 0);
    $("#summary-pupils").textContent = number(pupils);
    $("#summary-public").textContent = list.length ? number(list.filter((school) => school.ownershipCategory === "public").length / list.length * 100, 0) + "%" : "—";
    const selectedYear = controls.bullyingYear.value;
    const bullyingCount = selectedYear ? list.filter((school) => school.bullyingYear === selectedYear && typeof school.bullying === "number").length : 0;
    $("#summary-bullying").textContent = selectedYear ? number(bullyingCount) : "—";
  }

  function render() {
    try {
      const matched = FilterCore.filterSchools(schools, currentFilters());
      filteredSchools = FilterCore.sortSchools(matched, controls.sortKey.value, sortDirection);
    } catch {
      filteredSchools = [];
    }
    if (!filteredSchools.some((school) => String(school.id) === String(selectedId))) selectedId = filteredSchools[0]?.id || null;
    updateSummary(filteredSchools);
    renderMap(filteredSchools);
    renderTable(filteredSchools);
  }

  function parseImportedWorkbook(buffer) {
    const workbook = XLSX.read(buffer, { type: "array", cellStyles: true });
    const sheetName = workbook.SheetNames.find((name) => name.toLowerCase() === "all schools") || workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, raw: true, defval: null });
    const headerIndex = rows.findIndex((row) => row.includes("Municipality") && row.includes("School"));
    if (headerIndex < 0) throw new Error("headers");
    const sheetStartRow = XLSX.utils.decode_range(sheet["!ref"]).s.r;
    const headers = rows[headerIndex].map((value) => String(value || ""));
    const index = Object.fromEntries(headers.map((header, column) => [header, column]));
    const value = (row, name) => index[name] === undefined ? null : row[index[name]];
    const parsed = [];
    rows.slice(headerIndex + 1).forEach((row, offset) => {
      const schoolName = value(row, "School");
      if (!schoolName) return;
      const organisationNumber = String(value(row, "Organisation number") || "");
      const base = builtInById.get(organisationNumber) || {};
      const sheetRowIndex = sheetStartRow + headerIndex + 1 + offset;
      const excelRowVisible = !(sheet["!rows"] && sheet["!rows"][sheetRowIndex] && sheet["!rows"][sheetRowIndex].hidden);
      const bullyingRaw = FilterCore.toNumber(value(row, "Bullying (%)"));
      const ownership = String(value(row, "Ownership") || base.ownership || "");
      const explicitValue = value(row, "Show on map");
      parsed.push({
        ...base,
        id: organisationNumber || `${value(row, "Municipality")}-${schoolName}`,
        municipality: value(row, "Municipality"), school: schoolName, ownership,
        ownershipCategory: ownership.toLowerCase() === "offentlig" ? "public" : "private",
        grades: value(row, "Grades (registry)"), specialSchool: FilterCore.normalizeBoolean(value(row, "Special school")),
        pupils: FilterCore.toNumber(value(row, "Pupils (registry)")), registryUpdated: value(row, "Registry updated"),
        testGrade: FilterCore.toNumber(value(row, "Test grade")), testYear: value(row, "Test year"),
        reading: FilterCore.toNumber(value(row, "Reading")), maths: FilterCore.toNumber(value(row, "Maths")), english: FilterCore.toNumber(value(row, "English")),
        readingUncertainty: FilterCore.toNumber(value(row, "Reading uncertainty ±")), mathsUncertainty: FilterCore.toNumber(value(row, "Maths uncertainty ±")), englishUncertainty: FilterCore.toNumber(value(row, "English uncertainty ±")),
        surveyGrade: FilterCore.toNumber(value(row, "Survey grade")), wellbeing: FilterCore.toNumber(value(row, "Well-being (1–5)")), wellbeingYear: value(row, "Well-being year"),
        bullying: bullyingRaw !== null && bullyingRaw <= 1 ? bullyingRaw * 100 : bullyingRaw, bullyingYear: value(row, "Bullying year"), bullyingStatus: value(row, "Bullying 2025–26 status"),
        pupilsPerTeacher: FilterCore.toNumber(value(row, "Pupils per teacher")), teacherRatioYear: value(row, "Teacher ratio year"),
        grade10Points: FilterCore.toNumber(value(row, "Grade 10 points")), pointsYear: value(row, "Points year"), notes: value(row, "Notes"),
        sourceUrl: value(row, "Source URL") || base.sourceUrl, organisationNumber,
        showOnMap: explicitValue === null ? excelRowVisible : FilterCore.normalizeBoolean(explicitValue), excelRowVisible,
        latitude: FilterCore.toNumber(value(row, "Latitude")) ?? base.latitude ?? null,
        longitude: FilterCore.toNumber(value(row, "Longitude")) ?? base.longitude ?? null,
        address: value(row, "Address") || base.address || null,
      });
    });
    if (!parsed.length) throw new Error("empty");
    return parsed;
  }

  async function importWorkbook(file) {
    try {
      schools = parseImportedWorkbook(await file.arrayBuffer());
      dataSource = "imported";
      selectedId = null;
      populateSelectors(false);
      controls.mapMode.value = schools.some((school) => school.showOnMap) ? "explicit" : "visible";
      updateDatasetStatus(tr("importSuccess") + `: ${file.name}`);
      render();
    } catch (error) {
      console.error(error);
      updateDatasetStatus(tr("importError"));
    }
  }

  function reset() {
    Object.entries(controls).forEach(([key, control]) => {
      if (["language", "sortKey"].includes(key)) return;
      if (control.type === "checkbox") control.checked = false;
      else control.value = key === "mapMode" ? "explicit" : "";
    });
    controls.maxBullying.disabled = true;
    sortDirection = "asc";
    $("#sort-direction").textContent = "↑";
    render();
  }

  function exportCsv() {
    const columns = ["municipality", "school", "ownership", "grades", "pupils", "testGrade", "testYear", "reading", "maths", "english", "surveyGrade", "wellbeing", "wellbeingYear", "bullying", "bullyingYear", "pupilsPerTeacher", "teacherRatioYear", "sourceUrl"];
    const quote = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;
    const csv = [columns.join(","), ...filteredSchools.map((school) => columns.map((column) => quote(school[column])).join(","))].join("\r\n");
    const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a"); link.href = url; link.download = "filtered-schools.csv"; link.click(); URL.revokeObjectURL(url);
  }

  function registerWebMcp() {
    const context = document.modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    const allowedKeys = new Set(["mapMode", "municipality", "ownership", "grades", "testYear", "minReading", "minMaths", "minEnglish", "minWellbeing", "bullyingYear", "maxBullying", "maxRatio", "includeMissing"]);
    void Promise.resolve(context.registerTool({
      name: "filter_schools", title: "Filter schools", description: "Apply filters to the visible school table and offline map.",
      inputSchema: { type: "object", additionalProperties: false, properties: {
        mapMode: { type: "string", enum: ["explicit", "visible", "all"] }, municipality: { type: "string" }, ownership: { type: "string", enum: ["", "public", "private"] }, grades: { type: "string" },
        testYear: { type: "string" }, minReading: { type: "number" }, minMaths: { type: "number" }, minEnglish: { type: "number" }, minWellbeing: { type: "number" },
        bullyingYear: { type: "string" }, maxBullying: { type: "number" }, maxRatio: { type: "number" }, includeMissing: { type: "boolean" }
      }}, annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute(input) {
        Object.keys(input).forEach((key) => { if (!allowedKeys.has(key)) throw new Error(`Unsupported filter: ${key}`); });
        if (input.maxBullying !== undefined && !input.bullyingYear) throw new Error("bullyingYear is required with maxBullying");
        const mapping = { mapMode: controls.mapMode, municipality: controls.municipality, ownership: controls.ownership, grades: controls.grades, testYear: controls.testYear, minReading: controls.minReading, minMaths: controls.minMaths, minEnglish: controls.minEnglish, minWellbeing: controls.minWellbeing, bullyingYear: controls.bullyingYear, maxBullying: controls.maxBullying, maxRatio: controls.maxRatio };
        Object.entries(input).forEach(([key, value]) => { if (key === "includeMissing") controls.includeMissing.checked = value; else mapping[key].value = value; });
        controls.maxBullying.disabled = !controls.bullyingYear.value;
        render();
        return { visibleCount: filteredSchools.length, filters: currentFilters() };
      }
    }, { signal: lifecycle.signal })).catch(console.error);
    void Promise.resolve(context.registerTool({
      name: "read_visible_schools", title: "Read visible schools", description: "Return schools currently visible in the synchronized table and map.",
      inputSchema: { type: "object", additionalProperties: false, properties: {} }, annotations: { readOnlyHint: true, untrustedContentHint: false },
      execute() { return { count: filteredSchools.length, schools: filteredSchools.slice(0, 25).map((school) => ({ id: school.id, school: school.school, municipality: school.municipality })) }; }
    }, { signal: lifecycle.signal })).catch(console.error);
  }

  document.querySelectorAll(".filter-grid input, .filter-grid select, #include-missing, #map-mode, #sort-key").forEach((control) => control.addEventListener("input", () => {
    if (control === controls.bullyingYear) { controls.maxBullying.disabled = !controls.bullyingYear.value; if (!controls.bullyingYear.value) controls.maxBullying.value = ""; }
    render();
  }));
  controls.language.addEventListener("change", applyLanguage);
  $("#xlsx-file").addEventListener("change", (event) => { const file = event.target.files[0]; if (file) importWorkbook(file); });
  $("#reset").addEventListener("click", reset);
  $("#export-csv").addEventListener("click", exportCsv);
  $("#sort-direction").addEventListener("click", () => { sortDirection = sortDirection === "asc" ? "desc" : "asc"; $("#sort-direction").textContent = sortDirection === "asc" ? "↑" : "↓"; render(); });

  populateSelectors(false);
  updateDatasetStatus();
  applyLanguage();
  registerWebMcp();
})();
