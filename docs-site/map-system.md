# Map System

> WorldMonitor 双地图引擎 — deck.gl + globe.gl

## 1. Dual Engine Architecture

| Engine | Renderer | Use Case |
|--------|----------|----------|
| **DeckGLMap** | WebGL flat map | Detailed data visualization, large datasets |
| **GlobeMap** | globe.gl 3D | Global overview, immersive exploration |

## 2. DeckGLMap Layers

| Layer | Purpose |
|-------|---------|
| ScatterplotLayer | Point data (cities, events) |
| GeoJsonLayer | Country borders, regions |
| PathLayer | Trade routes, flight paths |
| IconLayer | Markers with custom icons |
| PolygonLayer | Area highlights |
| ArcLayer | Connections between points |
| HeatmapLayer | Density visualization |
| H3HexagonLayer | Hexagonal binning |

## 3. Map Layer Definitions

Layer 定义在 `src/config/map-layer-definitions.ts`：

```typescript
{
  id: 'airports',
  name: 'Airport Traffic',
  renderer: ['flat', 'globe'],  // supported renderers
  premium: false,
  variants: ['full', 'tech'],
  dataSource: 'aviation',
}
```

## 4. 45 Data Layers

覆盖领域：geopolitics, military, finance, climate, cyber, maritime, aviation

## 5. PMTiles

自托管 basemap tiles via PMTiles protocol，减少对外部 tile 服务的依赖。

## 6. Clustering

Supercluster 用于大量 marker 的客户端聚类，优化渲染性能。
