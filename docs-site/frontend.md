# Frontend

> WorldMonitor 前端 — TypeScript SPA (Vite + Preact)

## 1. Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Preact (lightweight React alternative) |
| Build | Vite |
| Language | TypeScript (strict mode) |
| Maps | deck.gl + maplibre-gl (flat), globe.gl (3D globe) |
| State | Component-local + service layer |
| i18n | Custom locale files (21 languages) |
| Storage | IndexedDB (client-side persistence) |
| Workers | Web Workers (analysis, ML/ONNX, vector DB) |

## 2. Component Model

86 个 Panel 子类，全部继承自 `Panel` 基类：

```typescript
// panels/MyPanel.ts
class MyPanel extends Panel {
  static panelType = 'my-panel';
  async loadData() { /* fetch from /api/* */ }
  renderContent() { /* setContent(html) */ }
}
```

- Panels 通过 `setContent(html)` 渲染（debounced 150ms）
- 使用事件委托在稳定的 `this.content` 元素上处理事件
- 支持 resizable row/col spans，持久化到 localStorage

## 3. Variant System

同一代码库支持 5 个变体，通过 `VITE_VARIANT` 环境变量切换：

| Variant | Domain | URL |
|---------|--------|-----|
| `full` (default) | All features | worldmonitor.app |
| `tech` | Technology | tech.worldmonitor.app |
| `finance` | Financial markets | finance.worldmonitor.app |
| `commodity` | Commodity markets | commodity.worldmonitor.app |
| `happy` | Positive news only | happy.worldmonitor.app |

变体配置在 `src/config/variants/` 目录下。

## 4. Dual Map System

### DeckGLMap (Flat)

- WebGL 渲染 via deck.gl + maplibre-gl
- 支持：ScatterplotLayer, GeoJsonLayer, PathLayer, IconLayer, PolygonLayer, ArcLayer, HeatmapLayer, H3HexagonLayer
- PMTiles protocol 支撑自托管 basemap tiles
- Supercluster 进行 marker 聚类

### GlobeMap (3D)

- globe.gl 3D 交互地球
- 单个 merged `htmlElementsData` 数组 + `_kind` discriminator
- Earth texture, atmosphere shader, idle 时自动旋转

Layer definitions 在 `src/config/map-layer-definitions.ts`，每个 layer 指定 renderer 支持（flat/globe）、premium 状态、变体过滤。

## 5. Key Files

```
src/
├── main.ts                 # Entry: Sentry, Vercel analytics, theme
├── App.ts                  # Main application
├── app/
│   ├── data-loader.ts      # Panel data loading orchestration
│   └── refresh-scheduler.ts # Polling loop management
├── components/
│   ├── Panel.ts            # Base panel class
│   ├── map/                # Map components
│   └── [86 panel classes]  # Domain-specific panels
├── config/
│   ├── panels.ts           # Panel registration
│   ├── variants/           # Variant configurations
│   └── map-layer-definitions.ts
├── services/               # 120+ service files by domain
├── workers/
│   ├── analysis.worker.ts
│   ├── ml.worker.ts        # ONNX embeddings, sentiment
│   └── vector-db.worker.ts
└── locales/               # 21 language files
```
