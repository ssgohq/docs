---
outline: deep
---

# API Commands

Generate Hertz HTTP servers from `.api` specification files.

## Overview

The `ss api` command generates a complete Hertz HTTP service including:

- HTTP handlers with request binding
- Route registration
- Request/response type definitions
- Logic layer with ServiceContext pattern
- OpenAPI documentation

## Commands

### ss api new

Create a new `.api` specification file template.

```bash
ss api new <service-name> [flags]
```

**Flags:**

| Flag | Short | Default | Description |
|------|-------|---------|-------------|
| `--dir` | `-o` | `api` | Output directory |

**Example:**

```bash
ss api new todo
# Creates: api/todo.api
```

### ss api gen

Generate Hertz HTTP server code from an `.api` file.

```bash
ss api gen [flags]
ss api gen [file-basename]   # zero-flag mode — reads .ss.yaml api section
```

**Flags:**

| Flag | Short | Default | Description |
|------|-------|---------|-------------|
| `--api` | `-a` | auto* | Path to `.api` file |
| `--dir` | `-o` | `.` | Output directory |
| `--module` | `-m` | *auto-detected* | Go module name |
| `--port` | | `8080` | Server port |
| `--with-logic` | | `true` | Generate logic files |

> **\*auto** — when `--api` is absent, configuration is read from the `api:` section of `.ss.yaml`.

**Examples:**

```bash
# Explicit:
ss api gen --api api/todo.api --dir todo-api -m github.com/myorg/todo-api

# Zero-flag (reads .ss.yaml) — generate all APIs:
ss api gen

# Zero-flag — generate only the named API:
ss api gen todo.api
```

### ss api logic

Generate only logic layer files (useful for regenerating after spec changes).

```bash
ss api logic [flags]
ss api logic [file-basename]   # zero-flag mode — reads .ss.yaml api section
```

**Flags:**

| Flag | Short | Default | Description |
|------|-------|---------|-------------|
| `--api` | `-a` | auto* | Path to `.api` file |
| `--dir` | `-o` | `.` | Output directory |
| `--module` | `-m` | *auto-detected* | Go module name |

> **\*auto** — when `--api` is absent, configuration is read from the `api:` section of `.ss.yaml`.

**Examples:**

```bash
# Explicit:
ss api logic --api api/todo.api --dir todo-api

# Zero-flag (reads .ss.yaml):
ss api logic

# Zero-flag (specific API):
ss api logic todo.api
```

### ss api doc

Generate OpenAPI documentation from an `.api` file.

```bash
ss api doc [flags]
ss api doc [file-basename]   # zero-flag mode — reads .ss.yaml api section
```

**Flags:**

| Flag | Short | Default | Description |
|------|-------|---------|-------------|
| `--api` | `-a` | auto* | Path to `.api` file |
| `--dir` | `-o` | `docs` | Output directory |
| `--format` | | `json` | Output format: `json` or `yaml` |

> **\*auto** — when `--api` is absent, configuration is read from the `api:` section of `.ss.yaml`.

**Examples:**

```bash
# Explicit:
ss api doc --api api/todo.api --format yaml
# Creates: docs/openapi.yaml

# Zero-flag (reads .ss.yaml):
ss api doc

# Zero-flag (specific API):
ss api doc todo.api
```

## Zero-flag mode via `.ss.yaml`

Add an `api:` section to your `.ss.yaml` to enable fully declarative generation:

```yaml
# .ss.yaml
run:
  # ... (existing run config)

api:
  apis:
    - file: api/user.api         # path to .api file
      dir: .                     # output directory (default: ".")
      options:
        port: 8080               # server port (default: 8080)
        with_logic: true         # generate logic files (default: true)
        format: json             # doc format: json|yaml (default: json)

    - file: api/order.api
      dir: order-api
      options:
        port: 9090
```

With this config:

```bash
ss api gen           # generate all API services
ss api gen user.api  # generate only user API
ss api doc           # generate all OpenAPI docs
ss api logic         # regenerate all logic files
```

**Flag priority:** CLI flags > `.ss.yaml` > auto-inference (fully backward compatible).

---

## Generated Structure

```
my-service/
├── cmd/
│   └── main.go              # Server entry point
├── etc/
│   └── api.yaml             # Server configuration
└── internal/
    ├── config/
    │   └── config.go        # Config types
    ├── handler/
    │   ├── routes.go        # Route registration
    │   └── todo/            # Handler group
    │       └── get_todo_handler.go
    ├── logic/
    │   └── todo/            # Business logic
    │       └── get_todo_logic.go
    ├── svc/
    │   └── service_context.go  # Dependency injection
    └── types/
        └── types.go         # Request/response types
```

## Workflow

### Explicit flags

```bash
# 1. Create spec file
ss api new todo

# 2. Edit the spec (api/todo.api)
vim api/todo.api

# 3. Generate code
ss api gen --api api/todo.api --dir todo-api -m github.com/myorg/todo-api

# 4. Implement business logic
vim todo-api/internal/logic/todo/get_todo_logic.go

# 5. Run the server
cd todo-api && go mod tidy && go run cmd/main.go
```

### Zero-flag mode (recommended for projects with `.ss.yaml`)

```bash
# 1. Add api: section to .ss.yaml (see above)

# 2. Generate all services at once
ss api gen

# 3. Implement logic
vim internal/logic/todo/get_todo_logic.go

# 4. Regenerate after spec changes
ss api gen
ss api doc
```

## Related Documentation

- [API Syntax](/api-spec/syntax) - Learn the `.api` DSL syntax
- [Type Definitions](/api-spec/types) - Define request/response types
- [Service Definitions](/api-spec/services) - Define routes and handlers
