# Rogaland 学校数据探索器

## 项目用途

本项目汇总 Sola、Stavanger 和 Sandnes 的103所基础教育学校，用同一套筛选条件同步控制地图和比较表。内置数据来自用户提供的工作簿；学校坐标和地址来自每所学校的 Skoleoversikten 来源页。默认地图选择是原工作簿中保存为可见行的22所学校。

它适合用来缩小候选范围、检查数据缺口和准备实地访校问题，不应被解释为官方学校排名。

## 直接使用

1. 打开 `dist/index.html`。Chrome、Edge 或 Firefox 均可。
2. 页面默认使用内置的103所学校数据，并按 `Show on map = TRUE` 显示22所候选学校。
3. 可按市镇、公立/私立、年级范围、考试年份、阅读/数学/英语最低分、幸福感、欺凌率和学生/教师比例筛选。
4. 点击地图标记或表格行查看学校地址和来源页。
5. “导出当前结果 CSV”只导出当前地图和表格共同显示的学校。

地图按真实经纬度绘制，但不加载在线瓦片或第三方底图，因此本地下载后仍能离线使用。每所学校同时提供 OpenStreetMap/Skoleoversikten 来源入口，可在联网时查看完整地理环境。

## Excel 联动

网页无法实时读取另一个正在打开的 Excel 窗口。正确流程是：

1. 在工作簿的 `All schools` 表中使用 Excel 筛选；
2. 保存工作簿，使被筛掉的行以隐藏状态写入 XLSX；
3. 在网页点击“导入 XLSX”；
4. 在“地图选择”中选择“Excel 已保存的可见行”。

项目还支持更明确、可审计的方法：在 `Show on map` 列填写 `TRUE` 或 `FALSE`，保存后导入，并选择 `Show on map = TRUE`。这一方法不依赖当前筛选器是否仍然存在，更适合共享候选名单。

导入在浏览器本地完成，工作簿不会上传。导入原始工作簿时，网页会按组织编号使用内置坐标补齐地图位置；导入地图版工作簿时，也会直接读取其中的经纬度和地址。

## 年份、缺失值和可比性

- 国家测试成绩只应在相同测试年级和学年内比较。
- 幸福感和欺凌数据来自指定调查年级，不代表全校平均。
- 欺凌率必须先选择同一学年，页面才允许设置最高阈值，防止把不同年份直接混排。
- 空白或“—”表示未公布、隐私屏蔽或数据缺失，不表示零。
- 开启阈值后，缺失值默认被排除；可勾选“保留缺失值”进行探索，但这些学校仍不能被视为达到阈值。
- “每名教师学生数”不是平均班级人数；数值越低通常表示普通教学中的教师密度越高。
- 私立、国际语言环境、特殊学校和不同年级结构需要分别解释，不能只凭同一个分数排序。

## 数据更新

需要 Python 3 和 `openpyxl`。更新步骤：

```powershell
python scripts/fetch_locations.py
python scripts/build_data.py
node --test tests/filter-core.test.mjs
python -m unittest tests/test_data.py
```

`fetch_locations.py` 读取工作簿中的逐校来源 URL，从页面的 OpenStreetMap 链接提取坐标和地址并写入 `data/locations.json`。`build_data.py` 会重新生成：

- 地图版 XLSX；
- 当前快照 JSON/CSV；
- 历史数据 CSV；
- 浏览器内置数据文件；
- `dist/downloads/` 中的下载版本。

如学校指标发生更新，应先用同样字段结构替换或更新 `data/original/` 中的来源工作簿，再执行脚本。不要将不同学年的单项成绩静默拼进同一行。

## GitHub Pages

仓库包含 `.github/workflows/pages.yml`。在 GitHub 仓库的 **Settings → Pages** 中把来源设置为 **GitHub Actions** 后，推送到 `main` 会发布 `dist/`。预计地址为：

`https://hui-aqua.github.io/school-explorer-rogaland/`

完整来源和方法限制见 [`REFERENCES.md`](../REFERENCES.md)。
