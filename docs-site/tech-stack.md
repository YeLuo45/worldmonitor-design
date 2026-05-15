# Tech Stack

> WorldMonitor 技术栈

## Frontend

| Category | Technology |
|----------|------------|
| Framework | Preact |
| Build | Vite |
| Language | TypeScript (strict) |
| Maps | deck.gl, globe.gl, maplibre-gl |
| State | Component-local |
| i18n | Custom (21 languages) |
| Storage | IndexedDB |
| Workers | Web Workers + ONNX |

## Backend

| Category | Technology |
|----------|------------|
| API | Vercel Edge Functions (plain JS) |
| Server | TypeScript (bundled into Edge) |
| Cache | Upstash Redis |
| Database | Convex Cloud |
| Monitoring | Sentry |
| Analytics | Vercel Analytics |

## Infrastructure

| Category | Technology |
|----------|------------|
| Hosting | Vercel |
| Relay | Railway |
| Container | Docker (GHCR) |
| Desktop | Tauri 2.x |
| CI/CD | GitHub Actions |

## Data

| Category | Technology |
|----------|------------|
| Proto | buf + sebuf |
| API Docs | OpenAPI (unified + per-service) |
| Testing | node:test, Playwright |

## Key Libraries

- **ONNX Runtime Web** — ML inference in browser
- **Supercluster** — Marker clustering
- **PMTiles** — Self-hosted map tiles
- **globe.gl** — 3D globe visualization
- **deck.gl** — WebGL data visualization
