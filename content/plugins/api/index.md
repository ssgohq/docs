# API Plugin

Generate Hertz HTTP servers from `.api` specification files.

## Overview

The API plugin generates production-ready [Hertz](https://github.com/cloudwego/hertz) HTTP servers with:

- Handler and logic layer separation
- ServiceContext pattern for dependency injection  
- Built-in middleware support (Logging, CORS, JWT)
- OpenTelemetry tracing integration
- Prometheus metrics server
- Graceful shutdown

The `.api` DSL is inspired by [go-zero](https://go-zero.dev/)'s API definition format, adapted for the Hertz framework.

## Installation

```bash
ss plugin install github.com/ssgohq/ss-plugin-api
```

## Quick Start

### 1. Create an API spec file

```bash
ss api new todo
```

This creates `todo.api`:

```api
syntax = "v1"

info (
    title: "Todo API"
    version: "1.0"
)

type (
    Todo {
        Id    int64  `json:"id"`
        Title string `json:"title"`
        Done  bool   `json:"done"`
    }
    
    CreateTodoReq {
        Title string `json:"title" validate:"required"`
    }
    
    GetTodoReq {
        Id int64 `path:"id"`
    }
)

@server (
    prefix: /api/v1
    group: todo
    middleware: Logging
)
service todo-api {
    @handler CreateTodo
    post /todos (CreateTodoReq) returns (Todo)
    
    @handler GetTodo
    get /todos/:id (GetTodoReq) returns (Todo)
}
```

### 2. Generate the server

```bash
ss api gen --api todo.api --dir ./todo-api --module github.com/myorg/todo-api
```

### 3. Run the server

```bash
cd todo-api
go mod tidy
go run cmd/main.go -c etc/config.yaml
```

## Generated Structure

```
todo-api/
├── cmd/
│   └── main.go
├── internal/
│   ├── config/
│   │   └── config.go
│   ├── handler/
│   │   └── todo/
│   │       ├── create_todo_handler.go
│   │       └── get_todo_handler.go
│   ├── logic/
│   │   └── todo/
│   │       ├── create_todo_logic.go
│   │       └── get_todo_logic.go
│   ├── middleware/
│   │   └── middleware.go
│   ├── svc/
│   │   └── service_context.go
│   └── types/
│       └── types.go
├── etc/
│   └── config.yaml
└── go.mod
```

## Next Steps

- [API Syntax](./syntax) - Learn the `.api` DSL syntax
- [Type Definitions](./types) - Define request/response types
- [Service Definitions](./services) - Define routes and handlers
- [CLI Reference](./cli) - Full command reference
