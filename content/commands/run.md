---
outline: deep
---

# Run Command

Development service runner with hot reload and terminal UI.

## Overview

The `ss run` command provides:

- **Hot Reload** - Automatic restart on file changes
- **Multiple Services** - Run multiple services concurrently
- **Dependencies** - Start services in dependency order
- **TUI** - Terminal UI with service logs
- **Color Coding** - Distinguish service outputs

## Usage

```bash
# Run all services defined in .ss.yaml
ss run

# Run specific services
ss run api-gateway user-rpc

# Initialize config by scanning project
ss run init
```

## Flags

| Flag | Short | Default | Description |
|------|-------|---------|-------------|
| `--config` | `-c` | `.ss.yaml` | Path to config file |
| `--no-watch` | | `false` | Disable file watching |
| `--no-build` | | `false` | Skip build step |
| `--no-tui` | | `false` | Disable TUI, plain output |

## Commands

### ss run

Run services with hot reload.

```bash
ss run [services...] [flags]
```

**Example:**

```bash
# Run all services
ss run

# Run specific services
ss run api-gateway user-rpc

# Run without TUI (plain output)
ss run --no-tui

# Run without file watching
ss run --no-watch
```

### ss run init

Generate run configuration by scanning the project.

```bash
ss run init
```

This scans for Go services and creates a `.ss.yaml` configuration.

## Configuration

Configure services in `.ss.yaml`:

```yaml
run:
  build_delay: 500ms      # Debounce file changes
  kill_delay: 5s          # Graceful shutdown timeout
  send_interrupt: true    # Send SIGINT before SIGKILL

  services:
    - name: api-gateway
      dir: ./api-gateway
      cmd: go run cmd/main.go
      color: cyan
      env:
        - APP_ENV=development
      depends_on:
        - user-rpc
      watch:
        include:
          - "**/*.go"
          - "etc/*.yaml"
        exclude:
          - "**/vendor/**"
          - "**/*_test.go"

    - name: user-rpc
      dir: ./user-rpc
      cmd: go run cmd/main.go -c etc/config.yaml
      color: green
```

## Service Options

| Option | Type | Description |
|--------|------|-------------|
| `name` | string | Service identifier (required) |
| `dir` | string | Working directory |
| `cmd` | string | Run command (required) |
| `build` | string | Build command before running |
| `color` | string | Log color: cyan, green, yellow, blue, magenta, red |
| `env` | []string | Environment variables |
| `depends_on` | []string | Services to start first |
| `watch.include` | []string | File patterns to watch |
| `watch.exclude` | []string | File patterns to ignore |

## TUI Controls

When running with TUI:

- **Tab** - Switch between services
- **q** - Quit all services
- **r** - Restart current service
- **Scroll** - View logs

## Example

```yaml
# .ss.yaml
run:
  services:
    - name: api-gateway
      dir: ./api-gateway
      cmd: go run cmd/main.go
      color: cyan
      depends_on:
        - user-rpc
        - order-rpc
      watch:
        include: ["**/*.go"]

    - name: user-rpc
      dir: ./user-rpc
      cmd: go run cmd/main.go -c etc/config.yaml
      color: green

    - name: order-rpc
      dir: ./order-rpc
      cmd: go run cmd/main.go -c etc/config.yaml
      color: yellow
```

```bash
# Start all services with dependencies resolved
ss run
# Starts: user-rpc, order-rpc (parallel), then api-gateway
```
