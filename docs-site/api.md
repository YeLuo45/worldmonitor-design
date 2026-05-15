# API Layer

> WorldMonitor Vercel Edge Functions + Server Handlers

## 1. Architecture

```
Browser → Vercel Edge Functions (api/*.js)
                      ↓
               server/ (bundled at deploy)
                      ↓
               Redis (Upstash) → Upstream Data Sources
```

## 2. Edge Function Constraints

- **Self-contained JS** — 无法导入 `../src/` 或 `../server/`
- 仅允许同目录 `_*.js` helpers 和 npm packages
- **禁止** `node:http`, `node:https`, `node:zlib`
- 必须使用 `(...args) => globalThis.fetch(...args)` 代替 `fetch.bind(globalThis)`

## 3. Server Shared Helpers

| Helper | Purpose |
|--------|---------|
| `_rate-limit.js` | Rate limiting |
| `_cors.js` | CORS headers |
| `_api-key.js` | API key validation |
| `_relay.js` | Railway relay proxy |
| `_convex-error.js` | Convex error handling |
| `server/_shared/redis.ts` | Redis client with stampede protection |

## 4. CachedFetchJson

所有 upstream 数据通过 `cachedFetchJson()` 获取：

```javascript
const data = await cachedFetchJson(url, {
  ttl: 'medium',      // cache tier
  key: 'my-data',     // cache key base
  params: request.url // include varying params
});
```

## 5. Adding New Endpoint

1. Define proto message in `proto/worldmonitor/<domain>/`
2. Add RPC with `(sebuf.http.config)` annotation
3. Run `make generate`
4. Create handler in `server/worldmonitor/<domain>/`
5. Wire handler in domain's `handler.ts`
6. Use `cachedFetchJson()` for caching

## 6. Health Endpoints

详见 [docs/health-endpoints.mdx](https://github.com/koala73/worldmonitor/blob/main/docs/health-endpoints.mdx)
