# Official Plugins

## run

Service runner with hot reload and TUI.

```bash
ss plugin install ssgohq/ss-plugin-run
```

### Features

- Run multiple services concurrently
- File watching with hot reload
- Terminal UI for log management
- Build step support
- Service dependencies

### Usage

```bash
ss run                    # Run all services
ss run api worker         # Run specific services
ss run init               # Generate config from project
```

### Flags

| Flag | Description |
|------|-------------|
| `--config`, `-c` | Config file path |
| `--no-watch` | Disable file watching |
| `--no-build` | Skip build step |
| `--no-tui` | Plain output mode |
| `--verbose`, `-v` | Verbose output |

### Config Example

```yaml
services:
  - name: api
    command: go run ./cmd/api
    env:
      PORT: "8080"
    watch:
      patterns:
        - "cmd/api/**/*.go"
        - "internal/**/*.go"

  - name: worker
    command: go run ./cmd/worker
    depends_on:
      - api
```

### Service Config

| Field | Description |
|-------|-------------|
| `name` | Service name |
| `command` | Command to run |
| `env` | Environment variables |
| `watch.patterns` | File patterns to watch |
| `depends_on` | Services to start first |

Source: [github.com/ssgohq/ss-plugin-run](https://github.com/ssgohq/ss-plugin-run)
