# GitHub Authentication

ss-cli supports GitHub private repositories for plugin installation and degit.

## Authentication Methods

Token is resolved in this order:

### 1. Global Config (recommended)

```yaml
# ~/.ss/config.yaml
github_token: ghp_xxxxxxxxxxxxxxxxxxxx
```

### 2. GitHub CLI

If you have [GitHub CLI](https://cli.github.com/) installed:

```bash
gh auth login
```

ss-cli automatically uses your `gh` token.

### 3. Environment Variable

```bash
export GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx
```

## Token Permissions

| Use Case | Required Scope |
|----------|----------------|
| Private repositories | `repo` (full control) |
| Public repositories | No token required |
| Avoid rate limits | Any valid token |

## Create Token

1. Go to [GitHub Settings → Developer settings → Personal access tokens](https://github.com/settings/tokens)
2. Generate new token (classic)
3. Select `repo` scope for private repository access
4. Copy token to `~/.ss/config.yaml`

## Verify

```bash
ss plugin install myorg/private-plugin
```

If authentication fails, ss-cli will show an error. For degit, it automatically falls back to git clone using system credentials.
