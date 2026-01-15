---
outline: deep
---

# Commands

Overview of all ssgo CLI commands.

## Available Commands

| Command | Description |
|---------|-------------|
| `ss api` | Generate Hertz HTTP servers from `.api` files |
| `ss rpc` | Generate Kitex RPC servers from `.proto` files |
| `ss db` | Generate database code (SQLC, Bun, GORM) |
| `ss run` | Run services with hot reload |
| `ss version` | Print version information |

## ss version

Print version information including build details.

```bash
ss version
```

Output:
```
ssgo version v1.0.0
Git Commit: abc1234
Build Date: 2024-01-15
Go Version: go1.21.0
```

## ss completion

Generate shell completion scripts for bash, zsh, fish, or PowerShell.

```bash
# Bash
ss completion bash > /etc/bash_completion.d/ss

# Zsh
ss completion zsh > "${fpath[1]}/_ss"

# Fish
ss completion fish > ~/.config/fish/completions/ss.fish

# PowerShell
ss completion powershell > ss.ps1
```

## Global Flags

| Flag | Short | Description |
|------|-------|-------------|
| `--verbose` | `-v` | Enable verbose output |
| `--debug` | `-d` | Enable debug mode |
| `--help` | `-h` | Show help |

## Command Groups

- [API Commands](./api) - Generate Hertz HTTP servers
- [RPC Commands](./rpc) - Generate Kitex RPC servers
- [Database Commands](./db) - Generate database code
- [Run Command](./run) - Development service runner
