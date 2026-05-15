# Architecture

> WorldMonitor 系统架构 — Last verified: 2026-03-14

## 1. System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        Browser / Desktop                        │
│  ┌──────────┐  ┌──────────┐  ┌────────────┐  ┌──────────────┐  │
│  │ DeckGLMap│  │ GlobeMap │  │  Panels    │  │  Workers     │  │
│  │(deck.gl) │  │(globe.gl)│  │(86 classes)│  │(ML, analysis)│  │
│  └────┬─────┘  └────┬─────┘  └─────┬──────┘  └──────────────┘  │
│       └──────────────┴──────────────┘                           │
│                         │ fetch /api/*                          │
└─────────────────────────┼───────────────────────────────────────┘
                          │
           ┌──────────────┼──────────────┐
           │              │              │
    ┌──────▼──────┐ ┌─────▼─────┐ ┌─────▼──────┐
    │   Vercel    │ │  Railway  │ │   Tauri    │
    │ Edge Funcs  │ │ AIS Relay │ │  Sidecar   │
    │ + Middleware│ │ + Seeds   │ │ (Node.js)  │
    └──────┬──────┘ └─────┬─────┘ └─────┬──────┘
           │              │              │
           └──────────────┼──────────────┘
                          │
                   ┌──────▼──────┐
                   │   Upstash   │
                   │    Redis    │
                   └──────┬──────┘
                          │
              ┌───────────┼───────────┐
              │           │           │
        ┌─────▼───┐ ┌─────▼───┐ ┌────▼────┐
        │ Finnhub │ │  Yahoo  │ │ ACLED   │
        │ OpenSky │ │  GDELT  │ │ UCDP    │
        │ CoinGeck│ │  FRED   │ │ FIRMS   │
        │   ...   │ │   ...   │ │   ...   │
        └─────────┘ └─────────┘ └─────────┘
              30+ upstream data sources
```

## 2. Deployment Topology

| Service | Platform | Role |
|---------|----------|------|
| SPA + Edge Functions | Vercel | Static files, API endpoints, middleware |
| AIS Relay | Railway | WebSocket proxy, seed loops, RSS proxy |
| Redis | Upstash | Cache layer, rate limiting |
| Convex | Convex Cloud | Contact form, waitlist |
| Documentation | Mintlify | Public docs |
| Desktop App | Tauri 2.x | macOS/Windows/Linux |
| Container Image | GHCR | Multi-arch Docker |

## 3. Dependency Direction

```
types → config → services → components → app → App.ts
```

- `types/` — zero internal imports
- `config/` — imports only from `types/`
- `services/` — imports from `types/` and `config/`
- `components/` — imports from all above
- `app/` — orchestrates components and services

## 4. Frontend Architecture

### App.init() — 8 Phases

1. **Storage + i18n** — IndexedDB, language detection, locale loading
2. **ML Worker** — ONNX model prep (embeddings, sentiment, summarization)
3. **Sidecar** — Desktop sidecar readiness (desktop only)
4. **Bootstrap** — Two-tier hydration from `/api/bootstrap`
5. **Layout** — PanelLayoutManager renders map and panels
6. **UI** — SignalModal, IntelligenceGapBadge, BreakingNewsBanner
7. **Data** — Parallel `loadAllData()` + `primeVisiblePanelData()`
8. **Refresh** — Variant-specific polling via `startSmartPollLoop()`

## 5. API Layer Constraints

- `api/*.js` 是 Vercel Edge Functions：**纯自包含 JS**
- **禁止**从 `../src/` 或 `../server/` 导入（不同运行时）
- 仅允许同目录 `_*.js` helpers 和 npm packages
- 由 `tests/edge-functions.test.mjs` 和 pre-push hook 强制执行

## 6. Server Layer

- `server/` 代码在部署时通过 gateway 打包进 Edge Functions
- `server/_shared/` 包含 Redis client、rate limiting、LLM helpers
- 所有 handlers 使用 `cachedFetchJson()` 进行 Redis 缓存

## 7. Proto Contract Flow

```
proto/ definitions → buf generate → src/generated/{client,server}/ → handlers wire up
```

- GET 字段需要 `(sebuf.http.query)` annotation
- `repeated string` 字段需要 `parseStringArray()` 在 handler 中处理
- `int64` 在 TypeScript 中映射为 `string`
