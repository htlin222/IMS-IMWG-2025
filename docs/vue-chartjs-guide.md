# Slidev + vue-chartjs 圖表整合指南

## 概述

本專案透過 [vue-chartjs](https://vue-chartjs.org/) 將 [Chart.js](https://www.chartjs.org/) 整合進 Slidev 簡報中，提供五種可直接在 Markdown 投影片中使用的圖表元件。

## 安裝

專案已安裝以下依賴：

```bash
pnpm add chart.js vue-chartjs
```

## 可用元件

| 元件 | 用途 | 檔案 |
|------|------|------|
| `<ChartBar>` | 長條圖（支援堆疊） | `components/ChartBar.vue` |
| `<ChartLine>` | 折線圖（支援填充區域） | `components/ChartLine.vue` |
| `<ChartPie>` | 圓餅圖 | `components/ChartPie.vue` |
| `<ChartDoughnut>` | 甜甜圈圖 | `components/ChartDoughnut.vue` |
| `<ChartRadar>` | 雷達圖 | `components/ChartRadar.vue` |

> Slidev 會自動載入 `components/` 目錄下的 Vue 元件，不需要手動 import。

---

## 基本用法

### 長條圖 (Bar Chart)

```md
<ChartBar
  :labels="['Q1', 'Q2', 'Q3', 'Q4']"
  :datasets="[
    { label: '營收', data: [120, 190, 150, 210], backgroundColor: '#3D6869' },
    { label: '成本', data: [80, 120, 100, 140], backgroundColor: '#E07A5F' }
  ]"
  title="季度財務比較"
  :width="500"
  :height="300"
/>
```

**Props：**

| Prop | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `labels` | `string[]` | `['A','B','C','D']` | X 軸標籤 |
| `datasets` | `Array<{label, data, backgroundColor?}>` | 預設資料 | 資料集陣列 |
| `title` | `string` | `''` | 圖表標題 |
| `width` | `number` | `400` | 寬度 |
| `height` | `number` | `300` | 高度 |
| `stacked` | `boolean` | `false` | 是否堆疊 |

堆疊長條圖：

```md
<ChartBar
  :labels="['2022', '2023', '2024']"
  :datasets="[
    { label: '產品 A', data: [30, 40, 50] },
    { label: '產品 B', data: [20, 30, 25] },
    { label: '產品 C', data: [10, 15, 20] }
  ]"
  title="年度產品銷售（堆疊）"
  :stacked="true"
/>
```

---

### 折線圖 (Line Chart)

```md
<ChartLine
  :labels="['1月', '2月', '3月', '4月', '5月', '6月']"
  :datasets="[
    { label: '實驗組', data: [10, 25, 18, 35, 28, 42] },
    { label: '對照組', data: [5, 15, 12, 20, 18, 25] }
  ]"
  title="實驗結果趨勢"
/>
```

帶有填充區域的折線圖：

```md
<ChartLine
  :labels="['Week 1', 'Week 2', 'Week 3', 'Week 4']"
  :datasets="[
    { label: '信賴區間', data: [20, 35, 28, 45], fill: true }
  ]"
  title="趨勢與區域填充"
/>
```

**Props：**

| Prop | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `labels` | `string[]` | `['Jan',...,'May']` | X 軸標籤 |
| `datasets` | `Array<{label, data, borderColor?, fill?}>` | 預設資料 | 資料集陣列 |
| `title` | `string` | `''` | 圖表標題 |
| `width` | `number` | `400` | 寬度 |
| `height` | `number` | `300` | 高度 |

---

### 圓餅圖 (Pie Chart)

```md
<ChartPie
  :labels="['手術', '藥物', '放療', '觀察']"
  :data="[35, 30, 20, 15]"
  title="治療方式分佈"
/>
```

**Props：**

| Prop | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `labels` | `string[]` | `['A','B','C','D']` | 分類標籤 |
| `data` | `number[]` | `[30,25,20,25]` | 數值資料 |
| `title` | `string` | `''` | 圖表標題 |
| `width` | `number` | `300` | 寬度 |
| `height` | `number` | `300` | 高度 |

---

### 甜甜圈圖 (Doughnut Chart)

```md
<ChartDoughnut
  :labels="['完成', '進行中', '待辦']"
  :data="[60, 25, 15]"
  title="專案進度"
/>
```

**Props：** 同圓餅圖。

---

### 雷達圖 (Radar Chart)

```md
<ChartRadar
  :labels="['程式', '統計', '寫作', '溝通', '領導']"
  :datasets="[
    { label: '自評', data: [90, 70, 80, 65, 75] },
    { label: '主管評', data: [85, 80, 75, 70, 80] }
  ]"
  title="能力評估雷達圖"
/>
```

**Props：**

| Prop | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `labels` | `string[]` | `['Speed',...]` | 維度標籤 |
| `datasets` | `Array<{label, data, borderColor?, backgroundColor?}>` | 預設資料 | 資料集 |
| `title` | `string` | `''` | 圖表標題 |
| `width` | `number` | `300` | 寬度 |
| `height` | `number` | `300` | 高度 |

---

## 進階技巧

### 搭配 v-click 動畫

```md
<v-click>
  <ChartBar
    :labels="['A', 'B', 'C']"
    :datasets="[{ label: 'Score', data: [85, 72, 93] }]"
    title="成績分佈"
  />
</v-click>
```

### 並排顯示

使用 Slidev 內建的 Grid 排版：

```md
<div class="grid grid-cols-2 gap-4">
  <ChartPie
    :labels="['男', '女']"
    :data="[55, 45]"
    title="性別分佈"
    :width="250"
    :height="250"
  />
  <ChartDoughnut
    :labels="['<30', '30-50', '>50']"
    :data="[20, 50, 30]"
    title="年齡分佈"
    :width="250"
    :height="250"
  />
</div>
```

### 自訂顏色

每個元件都使用與簡報主題一致的 teal 色系調色盤。你可以透過 `backgroundColor`（Bar/Pie）或 `borderColor`（Line/Radar）覆寫顏色：

```md
<ChartBar
  :labels="['A', 'B', 'C']"
  :datasets="[{
    label: 'Custom',
    data: [10, 20, 30],
    backgroundColor: ['#ff6384', '#36a2eb', '#ffce56']
  }]"
/>
```

---

## 配色參考

元件內建的調色盤：

| 色票 | 色碼 | 用途 |
|------|------|------|
| ████ | `#3D6869` | 主色（teal） |
| ████ | `#E07A5F` | 強調色（coral） |
| ████ | `#5B9A9C` | 次要（light teal） |
| ████ | `#F2CC8F` | 暖色（sand） |
| ████ | `#81B29A` | 綠色 |
| ████ | `#F4A261` | 橘色 |

---

## 架構說明

```
components/
├── ChartBar.vue       # 長條圖（含堆疊）
├── ChartLine.vue      # 折線圖（含填充）
├── ChartPie.vue       # 圓餅圖
├── ChartDoughnut.vue  # 甜甜圈圖
└── ChartRadar.vue     # 雷達圖
```

每個元件的設計原則：

1. **自動註冊** — Slidev 自動掃描 `components/` 目錄
2. **Props 驅動** — 所有資料透過 props 傳入，直接在 Markdown 中使用
3. **主題一致** — 預設調色盤與簡報主題 `#3D6869` 一致
4. **響應式** — 使用 `responsive: true` + `maintainAspectRatio: true`
5. **智慧圖例** — 多組資料時自動顯示圖例，單組時隱藏

## 常見問題

### Q: 圖表在投影片中太大/太小？
調整 `width` 和 `height` props，或使用 Tailwind 的 `w-` class 包裹 div。

### Q: 如何讓圖表在 export PDF 時正常顯示？
vue-chartjs 使用 Canvas 渲染，PDF export 時會自動轉為圖片，通常不需要額外設定。

### Q: 可以使用其他 Chart.js 圖表類型嗎？
可以，參考現有元件的模式建立新元件。Chart.js 支援的類型包括：Scatter、Bubble、PolarArea 等。只需要從 `vue-chartjs` import 對應元件並註冊所需的 Chart.js 模組。
