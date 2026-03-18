---
outline: deep
---

# Configuration

ssgo uses `.ss.yaml` (or `.ssgo.yaml`) as the project configuration file.

## Basic Configuration

```yaml
# Project module name
module: github.com/myorg/my-project

# Code style
style: ssgo  # or "go-zero"
```

## Service Runner Configuration

The `run` section configures the development service runner:

```yaml
run:
  build_delay: 500ms      # Debounce for file changes
  kill_delay: 5s          # Graceful shutdown timeout
  send_interrupt: true    # Send SIGINT before SIGKILL

  services:
    - name: api-gateway   # Service identifier
      dir: ./api-gateway  # Working directory
      cmd: go run cmd/main.go  # Run command
      build: go build -o bin/api cmd/main.go  # Optional build
      color: cyan         # Log color
      env:                # Environment variables
        - APP_ENV=development
        - PORT=8080
      depends_on:         # Service dependencies
        - user-rpc
      watch:
        include:          # Glob patterns to watch
          - "**/*.go"
          - "etc/*.yaml"
        exclude:          # Glob patterns to ignore
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

## Full Example

```yaml
# .ss.yaml
module: github.com/myorg/my-project
style: ssgo

run:
  build_delay: 500ms
  kill_delay: 5s
  send_interrupt: true
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
          - "**/*.yaml"
        exclude:
          - "**/vendor/**"
          - "**/*_test.go"

    - name: user-rpc
      dir: ./user-rpc
      cmd: go run cmd/main.go -c etc/config.yaml
      color: green
      watch:
        include:
          - "**/*.go"
          - "**/*.yaml"
```

## RPC Generation Configuration

The `rpc:` section enables zero-flag generation for Kitex RPC services.

```yaml
rpc:
  proto_module:
    dir: shared-proto          # directory containing go.mod + proto/
    gen_path: kitex_gen        # generated code path (default: kitex_gen)

  services:
    - dir: auth-svc            # output directory for the service
      protos:
        - proto/auth/v1/auth.proto   # relative to proto_module.dir
      options:
        with_trace: true       # enable OpenTelemetry tracing
        with_redis: false      # enable Redis integration

    - dir: user-svc
      protos:
        - proto/user/v1/user.proto
      options:
        with_trace: true
```

With this configuration:

```bash
ss rpc model        # generate shared proto models
ss rpc gen          # generate all services
ss rpc gen auth-svc # generate only auth-svc
ss rpc sync         # model + gen in one command
```

CLI flags always override `.ss.yaml` values. See [RPC Commands](../commands/rpc) for full details.

## Environment Variables

ssgo also reads configuration from environment variables:

| Variable | Description |
|----------|-------------|
| `SS_DB_DSN` | Database connection string for `ss db` commands |
| `SS_DEBUG` | Enable debug output |
| `GITHUB_TOKEN` | GitHub token for private repositories |
