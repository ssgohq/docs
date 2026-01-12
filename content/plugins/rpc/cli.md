# CLI Reference

## Commands

### `ss rpc new`

Create a new `.proto` template file.

```bash
ss rpc new <service-name>
```

**Example:**
```bash
ss rpc new user
# Creates: idl/user.proto
```

### `ss rpc gen`

Generate full Kitex server from a `.proto` file.

```bash
ss rpc gen [flags]
```

**Flags:**

| Flag | Short | Description | Default |
|------|-------|-------------|---------|
| `--proto` | `-p` | Path to `.proto` file | Required |
| `--service` | | Service name (e.g., UserService) | Required |
| `--module` | `-m` | Go module name | Required |
| `--dir` | `-o` | Output directory | `.` |
| `--use` | | Import path for shared types | |
| `--gen-path` | | Generated code path | `kitex_gen` |
| `--with-trace` | | Enable OpenTelemetry tracing | `false` |
| `--with-redis` | | Add Redis configuration | `false` |

**Examples:**

```bash
# Basic usage
ss rpc gen -p idl/user.proto --service UserService -m github.com/org/user-rpc

# With custom output directory
ss rpc gen -p idl/user.proto --service UserService -m github.com/org/user-rpc -o ./output

# With shared types from another module
ss rpc gen -p idl/user.proto --service UserService -m github.com/org/user-rpc \
  --use github.com/org/common-pb/kitex_gen/user

# With tracing enabled
ss rpc gen -p idl/user.proto --service UserService -m github.com/org/user-rpc --with-trace
```

### `ss rpc model`

Generate only the shared model (kitex_gen) without server scaffold.

```bash
ss rpc model [flags]
```

**Flags:**

| Flag | Short | Description | Default |
|------|-------|-------------|---------|
| `--proto` | `-p` | Path to `.proto` file | Required |
| `--module` | `-m` | Go module name | Required |
| `--dir` | `-o` | Output directory | Required |
| `--gen-path` | | Generated code path | `kitex_gen` |

**Example:**

```bash
# Generate shared types for use across multiple services
ss rpc model -p idl/user.proto -m github.com/org/common-pb -o ./common-pb
```

## Workflow

### Initial Setup

```bash
# 1. Create project directory
mkdir user-rpc && cd user-rpc

# 2. Initialize Go module
go mod init github.com/myorg/user-rpc

# 3. Create proto file
ss rpc new user
# Edit idl/user.proto

# 4. Generate code
ss rpc gen -p idl/user.proto --service UserService -m github.com/myorg/user-rpc

# 5. Install dependencies
go mod tidy

# 6. Run server
go run cmd/main.go -c etc/config.yaml
```

### Adding New RPC Methods

```bash
# 1. Edit idl/user.proto to add new RPC methods

# 2. Regenerate (logic files are preserved)
ss rpc gen -p idl/user.proto --service UserService -m github.com/myorg/user-rpc

# 3. Implement new logic in internal/logic/*_logic.go
```

### Shared Types Pattern

For microservices sharing types:

```bash
# 1. Create shared proto repository
mkdir common-pb && cd common-pb
go mod init github.com/org/common-pb

# 2. Generate shared types only
ss rpc model -p idl/user.proto -m github.com/org/common-pb -o .

# 3. In each service, reference shared types
ss rpc gen -p idl/user.proto --service UserService \
  -m github.com/org/user-rpc \
  --use github.com/org/common-pb/kitex_gen/user
```

## Generated Files

| File | Description | Regenerated |
|------|-------------|-------------|
| `cmd/main.go` | Application entry point | No (preserved) |
| `internal/config/config.go` | Configuration struct | No (preserved) |
| `internal/server/*_server.go` | Server handlers | Yes |
| `internal/logic/*_logic.go` | Business logic | No (preserved) |
| `internal/svc/service_context.go` | Service context | No (preserved) |
| `kitex_gen/**` | Kitex generated code | Yes |
| `etc/config.yaml` | Configuration | No (preserved) |
| `go.mod` | Go module | Yes |

Logic files use `skipIfExists`, so your implementations are never overwritten.
