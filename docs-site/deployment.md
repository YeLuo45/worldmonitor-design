# Deployment

> WorldMonitor 部署架构

## 1. Platforms

| Service | Platform | Role |
|---------|----------|------|
| SPA + Edge | Vercel | Auto-deploy on push to main |
| AIS Relay | Railway | WebSocket proxy, seed loops |
| Redis | Upstash | Cache, rate limiting |
| Convex | Convex Cloud | Contact form, waitlist |
| Docs | Mintlify | Vercel proxied at `/docs` |
| Desktop | GitHub Actions | Tauri builds |
| Docker | GHCR | Multi-arch image |

## 2. Railway Services

### AIS Relay

WebSocket proxy for AIS maritime stream, seed loops:
- market data
- aviation
- GPSJAM
- risk scores
- UCDP
- positive events
- RSS proxy
- OREF polling

## 3. Environment Variables

```
VITE_VARIANT=full|tech|finance|commodity|happy
UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...
CONVEX_DEPLOYMENT=...
```

## 4. Variant Deployment

Each variant deploys to its own Vercel project with `VITE_VARIANT` set.

## 5. Desktop Build

Tauri 2.x builds via GitHub Actions:
- macOS (ARM64, x64)
- Windows (x64)
- Linux (x64, ARM64 AppImage)

Download URLs at `worldmonitor.app/api/download?platform=<platform>`
