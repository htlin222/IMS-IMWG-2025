# My Slidev Template

A reusable [Slidev](https://sli.dev) presentation template with custom layouts, Chart.js charts, live code runners, and Tailscale Funnel support.

[![Use this template](https://img.shields.io/badge/Use%20this%20template-green?style=for-the-badge)](https://github.com/htlin222/my-slidev-template/generate)

## Gallery

| Cover | Chapter Divider |
|:---:|:---:|
| ![Cover slide](docs/gallery/slide-01.png) | ![Chapter divider](docs/gallery/slide-02.png) |
| **Content + Blockquote** | **Table Layout** |
| ![Content slide](docs/gallery/slide-03.png) | ![Table slide](docs/gallery/slide-04.png) |
| **List with Icons** | **Definition Table** |
| ![List slide](docs/gallery/slide-05.png) | ![Definition slide](docs/gallery/slide-06.png) |

## Quick Start

Click **"Use this template"** on GitHub to create a new repo, then:

```bash
pnpm install
pnpm dev
```

The dev server starts at `http://localhost:3030`.

## Features

### Custom Layouts

| Layout | Description |
|--------|-------------|
| `my-cover` | Title slide with series label, date, author, affiliation, and CC BY-NC badge |
| `chapter` | Auto-generated section divider that lists all `h1` chapters with the current one highlighted |
| `default` | Standard content slide; auto-switches to `chapter` layout when it detects an `h1` heading |

### Navigation & Progress

- **Top nav bar** — auto-generated from `h1` headings, clickable to jump between sections
- **H2 breadcrumb** — shows parent `h2` title above `h3` slides for context
- **Progress bar** — bottom progress track with page number (`3 / 20`)
- Nav bar and progress are hidden on the cover slide; nav bar is also hidden on chapter dividers

### Chart.js Components

Five chart components via `vue-chartjs`, all with teal color palette and responsive sizing:

```html
<ChartBar :labels="['A','B','C']" :datasets="[{label:'X', data:[10,20,30]}]" />
<ChartLine :labels="['Q1','Q2','Q3']" :datasets="[{label:'Revenue', data:[100,150,200]}]" />
<ChartPie :labels="['Yes','No']" :datasets="[{data:[70,30]}]" />
<ChartDoughnut :labels="['A','B']" :datasets="[{data:[60,40]}]" />
<ChartRadar :labels="['Speed','Power','Range']" :datasets="[{label:'Model A', data:[8,6,7]}]" />
```

### Live Code Runners

Run code blocks directly in the presentation (requires the local runner server in `util/server.py`):

- **Python** — ` ```python {runner} `
- **Bash / Shell** — ` ```bash {runner} `
- **R** — ` ```r {runner} `

### Styling

- **Font**: Source Sans Pro (300–800 weights)
- **Theme color**: Teal `#3D6869`
- **Teal headings** on all content slides
- **Bold list items** get teal badge styling with staggered fade-in animation
- **Icon badges** — `.icon-badge` class for inline teal-background icons with pop-in animation
- **Tables** — compact rows, hover highlight, bold first column, thick header border
- **Blockquotes** — callout boxes with teal left shadow, auto-pushed to bottom in default layout, scale-on-hover
- **Citations** — `<cite>` tag for fixed-position bottom-left references
- **Images** — auto `object-fit: contain` to preserve aspect ratio

### Other

- **Lucide icons** — `lucide-vue-next` for inline SVG icons
- **PDF export** — `pnpm export` (uses Playwright Chromium)
- **Fade transition** — 0.5s dissolve between slides
- **Tailscale Funnel** — serve over HTTPS for remote viewing

## Frontmatter

```yaml
---
layout: my-cover
title: Your Presentation Title
seriesName: Series Name
date: "2026-01-01"
author: Your Name
affiliation: Your Institution
email: you@example.com
---
```

## Project Structure

```
├── components/        # Vue components (5 chart types)
├── layouts/           # Custom layouts (my-cover, chapter, default)
├── public/            # Static assets (images, fonts)
├── setup/
│   ├── code-runners.ts  # Python/Bash/R live code runners
│   └── vite-plugins.ts  # Custom Vite plugins
├── styles/
│   └── index.css      # Global styles & layout CSS
├── util/
│   └── server.py      # Local code runner server
├── global-top.vue     # H2 breadcrumb overlay
├── global-bottom.vue  # Nav bar & progress bar
├── slides.md          # Presentation content
└── vite.config.ts     # Vite configuration
```

## Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server at localhost:3030 |
| `pnpm build` | Build static SPA to `dist/` |
| `pnpm export` | Export slides to PDF |

## Tailscale Funnel Setup

To serve over HTTPS for remote access:

1. Set `base` in `vite.config.ts` to match your funnel path
2. Add your Tailscale hostname to `server.allowedHosts`
3. Run: `tailscale funnel --set-path=/<path> 3030`

## License

ISC
