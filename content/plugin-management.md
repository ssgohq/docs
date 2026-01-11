# Plugin Management

## Install from GitHub

### Public Repositories

```bash
ss plugin install ssgohq/ss-plugin-run
ss plugin install github.com/ssgohq/ss-plugin-run
```

ss-cli will:
1. Try to download prebuilt release for your platform (`darwin-arm64`, `linux-amd64`, etc.)
2. If no release found, clone and build from source

### Private Repositories

ss-cli supports installing plugins from private GitHub repositories.

**Authentication priority:**

1. Global config (`~/.ss/config.yaml`)
2. GitHub CLI (`gh auth token`)
3. Environment variable (`GITHUB_TOKEN`)

#### Option 1: Global Config (recommended)

```yaml
# ~/.ss/config.yaml
github_token: ghp_xxxxxxxxxxxxxxxxxxxx
```

#### Option 2: GitHub CLI

If you have [GitHub CLI](https://cli.github.com/) installed and authenticated:

```bash
gh auth login
```

ss-cli will automatically use your `gh` token.

#### Option 3: Environment Variable

```bash
export GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx
ss plugin install myorg/private-plugin
```

### Token Permissions

For private repositories, your token needs:
- `repo` scope (full control of private repositories)

For public repositories with releases:
- No authentication required
- Token helps avoid GitHub API rate limits

## Install from Local Path

```bash
ss plugin install ./my-plugin
ss plugin install /path/to/plugin
```

Requirements:
- Directory must contain `plugin.yaml`
- Plugin binary or Go source code

## List Plugins

```bash
ss plugin list
```

Shows installed plugins with version, source, and available updates.

## Update Plugins

```bash
ss plugin update run           # Update specific plugin
ss plugin update --all         # Update all plugins
```

Only GitHub-origin plugins can be auto-updated.

## Remove Plugins

```bash
ss plugin remove run
```

PATH-based plugins cannot be removed via ss-cli.

## Plugin Info

```bash
ss plugin info run
```

Shows detailed plugin information including commands, flags, and source.

## Plugin Sources

| Source | Example | Notes |
|--------|---------|-------|
| GitHub (short) | `user/repo` | Most common |
| GitHub (full) | `github.com/user/repo` | Also works |
| Local | `./path` or `/abs/path` | Must have `plugin.yaml` |
| PATH | `ss-*` binaries | Auto-discovered |

## Plugin Directories

| Path | Scope |
|------|-------|
| `~/.ss/plugins/` | Global plugins |
| `./plugins/` | Project plugins |
| `PATH` | System binaries matching `ss-*` |
