# Data Sources

> WorldMonitor 30+ 外部数据源

## 1. Categories

| Category | Sources | Update Frequency |
|----------|---------|-----------------|
| Geopolitics | GDELT, UCDP, ACLED | Real-time |
| Military | UCDP, SIPRI, GDELT | Daily |
| Finance | Yahoo, Finnhub, CoinGecko, FRED | Real-time |
| Climate | NOAA, EMSC, FIRMS | Real-time |
| Cyber | VirusTotal, Shadowserver | Daily |
| Maritime | AIS (OpenSky) | Real-time |
| Aviation | OpenSky, ADS-B | Real-time |

## 2. Bootstrap Requirement

所有新数据源 **必须** 在 `api/bootstrap.js` 中接入 hydration。

## 3. Redis Seed Scripts

Redis seed scripts **必须** 写入 `seed-meta:<key>` 用于健康监控。

## 4. Data Source Catalog

详见 [docs/data-sources.mdx](https://github.com/koala73/worldmonitor/blob/main/docs/data-sources.mdx)

## 5. Circuit Breakers

每个 data domain 有独立的 circuit breaker：
- `src/utils/circuit-breaker.ts` 客户端
- 用于防止 cascade failures

## 6. Caching Strategy

- **fast** (5m) — frequently changing data
- **medium** (10m) — moderately changing
- **slow** (30m) — slowly changing
- **static** (2h) — reference data
- **daily** (24h) — daily aggregates

Cache key 必须包含 request-varying params。
