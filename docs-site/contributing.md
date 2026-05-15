# Contributing

> WorldMonitor 贡献指南

## Quick Start

```bash
git clone https://github.com/koala73/worldmonitor.git
cd worldmonitor
npm install
npm run dev
```

## Development Commands

```bash
npm run dev              # Full variant dev server
npm run dev:tech         # Tech variant only
npm run typecheck        # tsc --noEmit (strict)
npm run typecheck:api    # API layer type check
npm run test:data        # Unit/integration tests
npm run test:sidecar     # Sidecar + API handler tests
npm run test:e2e         # Playwright E2E tests
make generate            # Regenerate proto stubs
```

## Pre-Push Hook

自动运行以下检查：

1. TypeScript check (src + API)
2. CJS syntax validation
3. Edge function esbuild bundle check
4. Edge function import guardrail
5. Markdown lint
6. MDX lint
7. Version sync check

## Adding Features

### New API Endpoint

1. Define proto message
2. Add RPC annotation
3. Run `make generate`
4. Create handler
5. Wire handler
6. Use `cachedFetchJson()`

### New Panel

1. Create `src/components/MyPanel.ts` extending `Panel`
2. Register in `src/config/panels.ts`
3. Add to variant configs
4. Wire data loading in `src/app/data-loader.ts`

## Critical Rules

- **禁止** `fetch.bind(globalThis)`，使用 `(...args) => globalThis.fetch(...args)`
- Edge Functions 禁止使用 `node:http`, `node:https`, `node:zlib`
- Yahoo Finance 请求必须 staggered (150ms delays)
- 新数据源必须接入 `api/bootstrap.js`
- Redis seed scripts 必须写入 `seed-meta:<key>`
