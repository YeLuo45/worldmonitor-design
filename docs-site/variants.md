# Variants

> WorldMonitor 5 变体系统

## Overview

同一代码库，5 个不同域的变体，通过 `VITE_VARIANT` 环境变量切换。

## Variant List

| Variant | Domain | URL | Description |
|---------|--------|-----|-------------|
| `full` | All | worldmonitor.app | 全功能 |
| `tech` | Technology | tech.worldmonitor.app | 科技新闻为主 |
| `finance` | Finance | finance.worldmonitor.app | 金融市场数据 |
| `commodity` | Commodity | commodity.worldmonitor.app | 大宗商品市场 |
| `happy` | Positive | happy.worldmonitor.app | 仅正面新闻 |

## Variant Configuration

变体配置在 `src/config/variants/`：

```typescript
{
  id: 'tech',
  name: 'Technology',
  panels: ['tech-news', 'crypto-prices', ...],
  mapLayers: ['tech-hubs', 'data-centers', ...],
  dataSources: ['hackernews', 'github-trending', ...],
}
```

## Adding a New Variant

1. Create variant config in `src/config/variants/<name>.ts`
2. Add panels specific to variant
3. Add layers specific to variant
4. Deploy with `VITE_VARIANT=<name>`
