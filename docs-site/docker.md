# Docker

> WorldMonitor Container Image

## Multi-Arch Image

GHCR (GitHub Container Registry) multi-arch Docker image.

## Architecture

```
nginx (serving built SPA) → proxies /api/* to upstream
```

## Dockerfiles

| File | Purpose |
|------|---------|
| `Dockerfile` | Main app |
| `Dockerfile.relay` | AIS Relay service |
| `Dockerfile.seed-bundle-portwatch-port-activity` | Port activity seed |
| `Dockerfile.seed-bundle-resilience-validation` | Resilience validation seed |
| `Dockerfile.digest-notifications` | Notification digests |

## Build

```bash
docker build -f docker/Dockerfile -t worldmonitor .
```

## Deployment

Railway 部署 via `docker/` directory.
