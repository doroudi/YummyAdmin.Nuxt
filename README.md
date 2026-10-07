# Yummy Admin Nuxt

[![CI](https://github.com/doroudi/YummyAdmin/actions/workflows/ci.yml/badge.svg)](https://github.com/doroudi/YummyAdmin/actions/workflows/ci.yml)
![Vercel Deploy](https://deploy-badge.vercel.app/vercel/yummy-admin-nuxt)
[![Static Badge](https://img.shields.io/badge/Fa-IR?style=flat&label=Lang)](https://github.com/doroudi/YummyAdmin/blob/main/README.fa-ir.md)
[![Static Badge](https://img.shields.io/badge/Zh-CN?style=flat&label=Lang&color=red)](https://github.com/doroudi/YummyAdmin/blob/main/README.zh-cn.md)
<a href="https://coff.ee/doroudi"><img src="https://www.buymeacoffee.com/assets/img/custom_images/yellow_img.png" height="20px"></a>

Free Nuxt AdminPanel based on Naive UI and Tailwind CSS. Fairly complete with a beautiful design, Full RTL support and multilingual support.

![Preview](/docs/banner-dark.png "Preview")

<p align='center'>
   <a href="https://yummy-admin-nuxt.vercel.app/">🌏 Live Demo</a>
   <a href="https://yummy-admin-nuxt.vercel.app?theme=dark">🌑 Dark Mode</a>
   <br>
   Other languages demo:<br />
   <a href="https://yummy-admin-nuxt.vercel.app?lang=fa"> Persian</a> |
   <a href="https://yummy-admin-nuxt.vercel.app?lang=zh"> Chines</a>
</p>

![Preview](/docs/banner-light.png "Preview Light")

## Charts

Charts are built on **[Apache ECharts 6](https://echarts.apache.org)** through the
**[uipkge](https://uipkge.dev/vue/charts) chart registry** — copy-paste,
theme-token-driven ECharts wrappers vendored into `app/components/ui/charts/`. See that
folder's [README](./app/components/ui/charts/README.md) for provenance and the
adaptations made for this project.

They replace `apexcharts` / `vue3-apexcharts`, which are no longer dependencies.

|                    | ApexCharts (previous)              | uipkge + ECharts (current)                                    |
| ------------------ | ---------------------------------- | ------------------------------------------------------------- |
| Distribution       | npm dependency, options-object API | Registry source vendored into `app/`, yours to edit           |
| Extensibility      | Limited to Apex's option surface   | Full ECharts option escape hatch per chart                    |
| Chart families     | ~20                                | 66 — cartesian, circular, hierarchy, flow, distribution, maps |
| Theming            | CSS-var options per chart          | `--chart-1..5` tokens resolved at runtime                     |
| Dark mode / accent | Manual overrides                   | Automatic — one token change repaints every canvas            |

The app-facing wrappers stay in `app/components/Charts/chart-components/`, so **page
code did not change**:

```vue
<script setup lang="ts">
const months: ChartData = {
  labels: ['Jan', 'Feb', 'Mar'],
  series: [{ name: 'Revenue', data: [1200, 900, 1500] }],
}
</script>

<template>
  <!-- same props as before: data / colors / height / loading / legend-position -->
  <BarChart :data="months" :height="320" legend-position="right" />
</template>
```

| Wrapper                       | Renders                                     |
| ----------------------------- | ------------------------------------------- |
| `<LineChart>` / `<AreaChart>` | Multi-series line / filled area             |
| `<BarChart>`                  | Vertical, grouped or stacked bars           |
| `<PieChart>` / `<DonutChart>` | Share-of-total, with centre KPI             |
| `<PolarChart>`                | Radial bar (polar coordinate bar)           |
| `<RadarChart>`                | Spider chart with auto-computed axis maxima |
| `<Sparkline>`                 | Axis-less mini trend, used by `SummaryStatCard` and the revenue card |

Every wrapper accepts `ChartData` (`{ labels, series }`) or `SimpleChartSeries[]`
(`{ name, value }[]`) and renders through `BaseChart`, which also owns the loading,
error, empty and footer states. Need something the wrappers don't cover? Pass a raw
ECharts option through the `options` prop, or drop to the vendored `RawChart`.

> Charts render to `<canvas>` and resolve their colours from live CSS custom properties,
> so a theme or dark-mode switch repaints them without a re-mount. They are wrapped in
> `<ClientOnly>`, so the canvas is only ever created in the browser.

## Try it now

> Yummy Admin Nuxt requires Node >=20.0

### Clone to local

```bash
npx degit https://github.com/doroudi/yummyadmin.nuxt yummy-admin-nuxt
cd yummy-admin-nuxt
pnpm i # If you don't have pnpm installed, run: npm install -g pnpm
```

## Checklist

When you use this template, try to follow the checklist to update your info properly

- [ ] Change the author name in `LICENSE`
- [ ] Change the title in `locales/en.yaml`
- [ ] Change the hostname in `vite.config.ts`
- [ ] Change the favicon in `public`
- [ ] Remove the `.github` folder, which contains the funding info
- [ ] Clean up the READMEs and remove routes

And, enjoy :)

### Support this project

<a href="https://coff.ee/doroudi"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png"></a>

### Development

Just run and visit http://localhost:4000

```bash
pnpm dev
```

### Build

To build the App, run

```bash
pnpm build
```

And you will see the generated file in `dist`, which is ready to be served.

### Deploy on Netlify

Go to [Netlify](https://app.netlify.com/start) and select your clone, `OK` along the way, and your App will be live in a minute.