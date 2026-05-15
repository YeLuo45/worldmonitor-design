# Desktop App

> WorldMonitor Tauri 2 Desktop Application

## Architecture

- **Shell**: Tauri 2.x (Rust)
- **Frontend**: Same SPA as web (Vite + Preact)
- **Sidecar**: Node.js sidecar API server (`src-tauri/sidecar/`)

## Desktop-Specific Features

- Sidecar readiness wait in App.init() phase 3
- Runtime fetch patches for sidecar redirection
- Native notifications
- System tray
- Auto-update via Tauri updater

## Build

```bash
npm run build:desktop  # Triggers GitHub Actions
```

Download from: `worldmonitor.app/api/download?platform=<platform>`

## Supported Platforms

| Platform | Architecture |
|----------|-------------|
| Windows | x64 |
| macOS | ARM64, x64 |
| Linux | x64, ARM64 (AppImage) |
