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

### ss rpc gen

Generate Kitex RPC server from a `.proto` file.

```bash
ss rpc gen [flags]
```

**Flags:**

| Flag | Short | Default | Description |
|------|-------|---------|-------------|
| `--proto` | `-p` | *required* | Path to `.proto` file |
| `--service` | | *required* | Service name (e.g., `UserService`) |
| `--module` | `-m` | *required* | Go module name |
| `--dir` | `-o` | `.` | Output directory |
| `--use` | | | External types module for shared protos |
| `--gen-path` | | `kitex_gen` | Generated kitex code path |
| `--with-trace` | | `false` | Enable OpenTelemetry tracing |
| `--with-redis` | | `false` | Enable Redis integration |

**Example:**

```bash
ss rpc gen \
  -p idl/user.proto \
  --service UserService \
  -m github.com/myorg/user-rpc \
  -o user-rpc \
  --with-trace
```

### ss rpc model

Generate shared protobuf types module only (without server code).

```bash
ss rpc model [flags]
```

**Flags:**

| Flag | Short | Default | Description |
|------|-------|---------|-------------|
| `--proto` | `-p` | *required* | Path to `.proto` file |
| `--module` | `-m` | *required* | Go module name |
| `--dir` | `-o` | *required* | Output directory |
| `--gen-path` | | `kitex_gen` | Generated code path |

**Example:**

```bash
ss rpc model \
  -p idl/user.proto \
  -m github.com/myorg/common-pb \
  -o common-pb
```

## Generated Structure

```
my-rpc/
├── cmd/
│   └── main.go              # Server entry point
├── etc/
│   └── config.yaml          # Server configuration
├── kitex_gen/               # Generated Kitex code
│   └── user/
│       ├── user.pb.go
│       └── userservice/
└── internal/
    ├── config/
    │   └── config.go
    ├── logic/               # Business logic
    │   └── get_user_logic.go
    ├── server/              # Server implementation
    │   └── user_server.go
    └── svc/
        └── service_context.go
```

## Shared Types Pattern

For microservices sharing types, generate a separate module:

```bash
# Generate shared types
ss rpc model -p idl/user.proto -m github.com/myorg/common-pb -o common-pb

# Generate server using shared types
ss rpc gen \
  -p idl/user.proto \
  --service UserService \
  -m github.com/myorg/user-rpc \
  --use github.com/myorg/common-pb \
  -o user-rpc
```

## Related Documentation

- [Proto Format](/rpc-spec/proto) - Protocol Buffers format reference
- [Configuration](/rpc-spec/config) - Server configuration options
