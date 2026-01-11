# Commands

## ss version

Print version information.

```bash
ss version
```

## ss init

Initialize project configuration.

```bash
ss init
```

Creates `.ss.yaml` in current directory.

## ss plugin

Manage plugins.

```bash
ss plugin list                           # List installed
ss plugin install ssgohq/ss-plugin-run   # Install from GitHub
ss plugin install ./my-plugin            # Install from local
ss plugin remove <name>                  # Remove plugin
ss plugin update <name>                  # Update plugin
ss plugin update --all                   # Update all
ss plugin info <name>                    # Show info
```

## ss completion

Generate shell completion.

**Bash:**
```bash
source <(ss completion bash)
ss completion bash > $(brew --prefix)/etc/bash_completion.d/ss  # macOS
```

**Zsh:**
```bash
ss completion zsh > "${fpath[1]}/_ss"
```

**Fish:**
```bash
ss completion fish > ~/.config/fish/completions/ss.fish
```
