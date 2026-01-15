---
outline: deep
---

# GitHub Authentication

ssgo supports GitHub private repositories for template downloads and private organization access.

## Token Resolution Order

ssgo looks for authentication in this order:

1. **Environment Variable** - `GITHUB_TOKEN`
2. **GitHub CLI** - If installed and authenticated (`gh auth token`)

## Required Permissions

For private repository access, your token needs:

| Scope | Description |
|-------|-------------|
| `repo` | Full control of private repositories |

## Setting Up Authentication

### Option 1: Environment Variable

```bash
# Add to your shell profile (.bashrc, .zshrc, etc.)
export GITHUB_TOKEN="ghp_your_personal_access_token"
```

### Option 2: GitHub CLI

```bash
# Install GitHub CLI
brew install gh

# Authenticate
gh auth login

# Verify
gh auth token
```

## Creating a Personal Access Token

1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Select the `repo` scope
4. Generate and copy the token
5. Set it as `GITHUB_TOKEN` environment variable

## Fine-grained Tokens

For fine-grained tokens, ensure:

- Repository access: All repositories or specific repos
- Permissions: Contents (Read)

## Troubleshooting

### Token Not Found

```
Error: authentication required for private repository
```

**Solution:** Ensure `GITHUB_TOKEN` is set or `gh auth login` is completed.

### Permission Denied

```
Error: 403 Forbidden
```

**Solution:** Verify your token has the `repo` scope for private repositories.

### Token Expired

Personal access tokens can expire. Generate a new token if needed.
