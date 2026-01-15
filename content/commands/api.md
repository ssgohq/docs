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
```

**Flags:**

| Flag | Short | Default | Description |
|------|-------|---------|-------------|
| `--api` | `-a` | *required* | Path to `.api` file |
| `--dir` | `-o` | `.` | Output directory |
| `--module` | `-m` | *auto-detected* | Go module name |
| `--port` | | `8080` | Server port |
| `--with-logic` | | `true` | Generate logic files |

**Example:**

```bash
ss api gen --api api/todo.api --dir todo-api -m github.com/myorg/todo-api
```

### ss api logic

Generate only logic layer files (useful for regenerating after spec changes).

```bash
ss api logic [flags]
```

**Flags:**

| Flag | Short | Default | Description |
|------|-------|---------|-------------|
| `--api` | `-a` | *required* | Path to `.api` file |
| `--dir` | `-o` | `.` | Output directory |
| `--module` | `-m` | *auto-detected* | Go module name |

**Example:**

```bash
ss api logic --api api/todo.api --dir todo-api
```

### ss api doc

Generate OpenAPI documentation from an `.api` file.

```bash
ss api doc [flags]
```

**Flags:**

| Flag | Short | Default | Description |
|------|-------|---------|-------------|
| `--api` | `-a` | *required* | Path to `.api` file |
| `--dir` | `-o` | `docs` | Output directory |
| `--format` | | `json` | Output format: `json` or `yaml` |

**Example:**

```bash
ss api doc --api api/todo.api --format yaml
# Creates: docs/openapi.yaml
```

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

## Related Documentation

- [API Syntax](/api-spec/syntax) - Learn the `.api` DSL syntax
- [Type Definitions](/api-spec/types) - Define request/response types
- [Service Definitions](/api-spec/services) - Define routes and handlers
