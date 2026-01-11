# Getting Started

ss-cli is a plugin-based CLI for development workflows.

## Installation

```bash
brew install --cask ssgohq/tap/ss
```

Upgrade:

```bash
brew upgrade --cask ssgohq/tap/ss
```

## Plugin Discovery

Plugins are discovered from:

- `~/.ss/plugins/` - global plugins
- `./plugins/` - project plugins
- `PATH` - `ss-*` binaries

## Configuration

### Project Config (`.ss.yaml`)

```yaml
services:
  - name: api
    command: go run ./cmd/api
    watch:
      patterns:
        - "**/*.go"
```

### Global Flags

| Flag | Short | Description |
|------|-------|-------------|
| `--config` | `-c` | Config file path |
| `--debug` | `-d` | Enable debug mode |
