# degit

Fast git repository scaffolding without history. Inspired by [degit](https://github.com/Rich-Harris/degit).

```bash
ss plugin install ssgohq/ss-plugin-degit
```

## Features

- Fast cloning via tarball (no git history)
- Private repository support
- Subdirectory & branch/tag/commit support
- Caching for offline use
- Automatic fallback to git clone

## Usage

```bash
ss degit user/repo                    # Clone to ./repo
ss degit user/repo my-project         # Clone to ./my-project
ss degit user/repo#dev                # Clone specific branch
ss degit user/repo#v1.0.0             # Clone specific tag
ss degit user/repo#abc1234            # Clone specific commit
ss degit user/repo/src/components     # Clone subdirectory only
```

## Flags

| Flag | Short | Description |
|------|-------|-------------|
| `--force` | `-f` | Allow cloning to non-empty directory |
| `--offline` | `-o` | Use cached files only |
| `--mode` | `-m` | Clone mode: `tar` (default) or `git` |
| `--verbose` | `-v` | Verbose output |

## Interactive Mode

Run without arguments to select from cached repositories:

```bash
ss degit
```

## Private Repositories

Uses same authentication as ss-cli. See [GitHub Authentication](/github-auth).

If tarball download fails, automatically falls back to git clone using system credentials.

## Source

[github.com/ssgohq/ss-plugin-degit](https://github.com/ssgohq/ss-plugin-degit)
