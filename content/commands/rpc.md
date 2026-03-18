---
outline: deep
---

# RPC Commands

Generate Kitex RPC servers from `.proto` files.

## Overview

The `ss rpc` command generates a complete Kitex RPC service including:

- Server implementation with Kitex framework
- ServiceContext pattern for dependencies
- Configuration with Consul support
- Metrics and tracing integration
- Shared protobuf type modules

## Prerequisites

Install protoc and Kitex:

```bash
go install github.com/cloudwego/kitex/tool/cmd/kitex@latest
```

## Commands

### ss rpc new

Create a new `.proto` file template.

```bash
ss rpc new <service-name> [flags]
```

**Flags:**

| Flag | Short | Default | Description |
|------|-------|---------|-------------|
| `--dir` | `-o` | `idl` | Output directory |

**Example:**

```bash
ss rpc new user
# Creates: idl/user.proto
```

---

### ss rpc gen

Generate Kitex RPC server from a `.proto` file.

```bash
ss rpc gen [flags]
ss rpc gen [service-name]   # zero-flag mode — reads .ss.yaml rpc section
```

**Flags:**

| Flag | Short | Default | Description |
|------|-------|---------|-------------|
| `--proto` | `-p` | auto* | Path to `.proto` file |
| `--service` | | auto* | Service name (e.g., `UserService`) |
| `--module` | `-m` | auto* | Go module name |
| `--dir` | `-o` | `.` | Output directory |
| `--use` | | auto* | External types module for shared protos |
| `--gen-path` | | `kitex_gen` | Generated kitex code path |
| `--with-trace` | | `false` | Enable OpenTelemetry tracing |
| `--with-redis` | | `false` | Enable Redis integration |

> **\*auto** — flags marked _auto_ are inferred when omitted:
> - `--service` → extracted from proto file when exactly one service is defined
> - `-m` → read from `go.mod` in the output directory
> - `--use` → derived from the proto's `go_package` option (full import path)
> - When `--proto` is also absent, configuration is read from the `rpc:` section of `.ss.yaml`

**Examples:**

```bash
# Minimal — auto-detect service, module, and --use:
ss rpc gen -p proto/auth.proto -o auth-svc

# Explicit — override auto-detection:
ss rpc gen -p proto/auth.proto \
  --service AuthService \
  -m github.com/myorg/auth-rpc \
  -o auth-svc

# Zero-flag — reads .ss.yaml rpc section, generates all services:
ss rpc gen

# Zero-flag — generate only the named service:
ss rpc gen auth-svc
```

---

### ss rpc model

Generate shared protobuf types module only (without server code).

```bash
ss rpc model [flags]
ss rpc model              # zero-flag mode — reads .ss.yaml rpc section
```

**Flags:**

| Flag | Short | Default | Description |
|------|-------|---------|-------------|
| `--proto` | `-p` | auto* | Path to `.proto` file |
| `--module` | `-m` | auto* | Go module name |
| `--dir` | `-o` | *required* | Output directory |
| `--gen-path` | | `kitex_gen` | Generated code path |

> **\*auto** — `-m` is read from `go.mod` in the output directory when omitted.
> When `--proto` is absent, all protos from the `.ss.yaml` `rpc.proto_module` section are processed.

**Examples:**

```bash
# Explicit:
ss rpc model \
  -p proto/auth.proto \
  -m github.com/myorg/shared-proto \
  -o shared-proto

# Zero-flag (reads .ss.yaml):
ss rpc model
```

---

### ss rpc sync

Generate shared models and RPC services in one command.

**Flow:** `model → go mod tidy → gen → go mod tidy`

```bash
ss rpc sync [service-name]                              # reads .ss.yaml
ss rpc sync -p <proto> --model-dir <dir> -o <svc-dir>  # explicit
```

**Flags:**

| Flag | Short | Default | Description |
|------|-------|---------|-------------|
| `--proto` | `-p` | auto* | Path to `.proto` file |
| `--model-dir` | | | Output dir for shared model (explicit mode) |
| `--dir` | `-o` | `.` | Service output directory |
| `--module` | `-m` | auto* | Go module name |
| `--service` | | auto* | Service name |
| `--use` | | auto* | External types import path |
| `--gen-path` | | `kitex_gen` | Custom kitex_gen path |
| `--with-trace` | | `false` | Enable OpenTelemetry tracing |
| `--with-redis` | | `false` | Enable Redis integration |

**Examples:**

```bash
# Zero-flag (reads .ss.yaml) — sync all services:
ss rpc sync

# Zero-flag — sync only one service:
ss rpc sync auth-svc

# Explicit (no .ss.yaml needed):
ss rpc sync \
  -p proto/auth.proto \
  --model-dir shared-proto \
  -o auth-svc \
  --with-trace
```

---

## Zero-flag mode via `.ss.yaml`

Add an `rpc:` section to your `.ss.yaml` to enable fully declarative generation:

```yaml
# .ss.yaml
run:
  # ... (existing run config)

rpc:
  proto_module:
    dir: shared-proto          # directory containing go.mod + proto/
    gen_path: kitex_gen        # default: kitex_gen

  services:
    - dir: auth-svc
      protos:
        - proto/auth/v1/auth.proto   # relative to proto_module.dir
      options:
        with_trace: true
        with_redis: false

    - dir: user-svc
      protos:
        - proto/user/v1/user.proto
      options:
        with_trace: true
```

With this config:

```bash
ss rpc model         # generate all proto models (shared-proto/)
ss rpc gen           # generate all services
ss rpc gen auth-svc  # generate only auth-svc
ss rpc sync          # model + gen in one shot
```

**Flag priority:** CLI flags > `.ss.yaml` > auto-inference (fully backward compatible).

---

## Auto-Detection Summary

| Flag | When inferred | Source |
|------|--------------|--------|
| `--service` | When omitted and proto has exactly 1 service | Proto file |
| `-m` | When omitted and `go.mod` exists in output dir | `go.mod` |
| `--use` | When omitted and `go_package` is a full import path | Proto `go_package` option |

---

## Generated Structure

```
auth-svc/
├── cmd/
│   └── main.go              # Server entry point
├── etc/
│   └── config.yaml          # Server configuration
├── kitex_gen/               # Generated Kitex code (or --use path)
│   └── auth/
│       ├── auth.pb.go
│       └── authservice/
└── internal/
    ├── config/
    │   └── config.go
    ├── logic/               # Business logic
    │   └── create_auth_logic.go
    ├── server/              # Server implementation
    │   └── auth_server.go
    └── svc/
        └── service_context.go
```

---

## Shared Types Pattern

For microservices sharing types, generate a separate module first:

```bash
# Step 1: Generate shared types
ss rpc model \
  -p proto/auth.proto \
  -m github.com/myorg/shared-proto \
  -o shared-proto

# Step 2: Generate server using shared types (--use auto-derived from go_package)
ss rpc gen \
  -p proto/auth.proto \
  -m github.com/myorg/auth-rpc \
  -o auth-svc

# Or use ss rpc sync to do both steps at once:
ss rpc sync \
  -p proto/auth.proto \
  --model-dir shared-proto \
  -o auth-svc
```

## Related Documentation

- [Proto Format](/rpc-spec/proto) - Protocol Buffers format reference
- [Configuration](/rpc-spec/config) - Server configuration options
