# CLI Reference

## Commands

### `ss api new`

Create a new `.api` template file.

```bash
ss api new <service-name>
```

**Example:**
```bash
ss api new user
# Creates user.api
```

### `ss api gen`

Generate Hertz server code from an `.api` file.

```bash
ss api gen [flags]
```

**Flags:**

| Flag | Short | Description | Default |
|------|-------|-------------|---------|
| `--api` | `-a` | Path to `.api` file | Required |
| `--dir` | `-o` | Output directory | `.` |
| `--module` | `-m` | Go module name | Auto-detect |
| `--port` | | Default server port | `8080` |
| `--with-logic` | | Generate logic files | `true` |

**Examples:**

```bash
# Basic usage
ss api gen --api user.api --dir ./user-api --module github.com/org/user-api

# Short flags
ss api gen -a user.api -o ./user-api -m github.com/org/user-api

# Auto-detect module from existing go.mod
ss api gen --api user.api --dir ./user-api
```

### `ss api logic`

Generate only logic files (useful for adding new routes).

```bash
ss api logic [flags]
```

**Flags:**

| Flag | Short | Description | Default |
|------|-------|-------------|---------|
| `--api` | `-a` | Path to `.api` file | Required |
| `--dir` | `-o` | Output directory | `.` |
| `--module` | `-m` | Go module name | Auto-detect |

**Example:**

```bash
ss api logic --api user.api --dir ./user-api
```

### `ss api doc`

Generate OpenAPI documentation from an `.api` file.

```bash
ss api doc [flags]
```

**Flags:**

| Flag | Short | Description | Default |
|------|-------|-------------|---------|
| `--api` | `-a` | Path to `.api` file | Required |
| `--dir` | `-o` | Output directory | `.` |
| `--format` | | Output format (`json` or `yaml`) | `json` |

**Example:**

```bash
ss api doc --api user.api --format yaml
```

## Workflow

### Initial Setup

```bash
# 1. Create project directory
mkdir my-api && cd my-api

# 2. Initialize Go module
go mod init github.com/myorg/my-api

# 3. Create API spec
ss api new my-service
# Edit my-service.api

# 4. Generate code
ss api gen --api my-service.api

# 5. Install dependencies
go mod tidy

# 6. Run server
go run cmd/main.go -c etc/api.yaml
```

### Adding New Routes

```bash
# 1. Edit .api file to add new routes

# 2. Regenerate (logic files are preserved)
ss api gen --api my-service.api

# Or generate only new logic files
ss api logic --api my-service.api
```

### Configuration

The generated server uses `etc/api.yaml` for configuration:

```yaml
name: my-api
host: 0.0.0.0
port: 8080

log:
  level: info
  format: json

metric:
  enabled: true
  port: 6060
  path: /metrics
  healthPath: /healthz
  readyPath: /readyz

# Optional: JWT authentication
# auth:
#   jwtSecret: your-secret-key
#   jwtExpire: 86400

# Optional: OpenTelemetry tracing
# trace:
#   name: my-api
#   endpoint: localhost:4317
```

## Generated Files

| File | Description | Regenerated |
|------|-------------|-------------|
| `cmd/main.go` | Application entry point | Yes |
| `internal/config/config.go` | Configuration struct | Yes |
| `internal/handler/**/*_handler.go` | HTTP handlers | Yes |
| `internal/handler/routes.go` | Custom routes | No (editable) |
| `internal/handler/routes_gen.go` | Generated routes | Yes |
| `internal/logic/**/*_logic.go` | Business logic | No (preserved) |
| `internal/middleware/middleware.go` | Middleware | Yes |
| `internal/svc/service_context.go` | Service context | Yes |
| `internal/types/types.go` | Request/response types | Yes |
| `etc/api.yaml` | Configuration | Yes |
| `go.mod` | Go module | Yes |
