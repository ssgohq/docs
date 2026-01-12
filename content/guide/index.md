# Introduction

ss-cli is a plugin-based CLI for development workflows.

## Installation

```bash
brew install --cask ssgohq/tap/ss
```

Upgrade:

```bash
brew upgrade --cask ssgohq/tap/ss
```

## Quick Start

```bash
# Install a plugin
ss plugin install ssgohq/ss-plugin-run

# Run services
ss run

# Get help
ss --help
ss run --help
```

## Plugin Discovery

Plugins are discovered from:

| Location | Scope |
|----------|-------|
| `~/.ss/plugins/` | Global plugins |
| `./plugins/` | Project plugins |
| `PATH` | `ss-*` binaries |

## Configuration

### Project Config (`.ss.yaml`)

```yaml
run:
  services:
    - name: api
      cmd: go run ./cmd/api
      watch:
        include:
          - "**/*.go"
```

### Global Config (`~/.ss/config.yaml`)

```yaml
github_token: ghp_xxxxxxxxxxxxxxxxxxxx
```

### Global Flags

| Flag | Short | Description |
|------|-------|-------------|
| `--config` | `-c` | Config file path |
| `--debug` | `-d` | Enable debug mode |
