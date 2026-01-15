---
outline: deep
---

# API Specification

The `.api` file format defines HTTP services using a simple, readable DSL inspired by [go-zero](https://go-zero.dev/).

## Overview

API specification files describe:

- **Types** - Request and response structures
- **Services** - HTTP routes and handlers
- **Middleware** - Request processing pipeline
- **Groups** - Logical grouping of routes

## Quick Example

```api
syntax = "v1"

type (
    CreateTodoReq {
        Title       string `json:"title"`
        Description string `json:"description,optional"`
    }
    
    Todo {
        Id          int64  `json:"id"`
        Title       string `json:"title"`
        Description string `json:"description"`
        Done        bool   `json:"done"`
    }
)

@server (
    prefix: /api/v1
    group: todo
)
service todo-api {
    @handler CreateTodo
    post /todos (CreateTodoReq) returns (Todo)
    
    @handler GetTodo
    get /todos/:id returns (Todo)
    
    @handler ListTodos
    get /todos returns ([]Todo)
}
```

## Documentation

- [Syntax](./syntax) - File structure and basic syntax
- [Types](./types) - Type definitions and field tags
- [Services](./services) - Route definitions and middleware

## Generated Code

When you run `ss api gen`, the following is generated:

| Component | Location | Description |
|-----------|----------|-------------|
| Types | `internal/types/types.go` | Request/response structs |
| Handlers | `internal/handler/` | HTTP handlers |
| Logic | `internal/logic/` | Business logic layer |
| Routes | `internal/handler/routes.go` | Route registration |
| Config | `internal/config/config.go` | Configuration struct |
| Entry | `cmd/main.go` | Server entry point |

## Related Commands

- [ss api new](/commands/api#ss-api-new) - Create new spec file
- [ss api gen](/commands/api#ss-api-gen) - Generate server code
- [ss api logic](/commands/api#ss-api-logic) - Regenerate logic files
- [ss api doc](/commands/api#ss-api-doc) - Generate OpenAPI docs
